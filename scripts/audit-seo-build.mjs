import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const siteOrigin = 'https://mhkstudio.design';

const nonIndexablePaths = new Set([
  '/aviso-legal',
  '/condiciones-generales',
  '/politica-de-cookies',
  '/politica-de-privacidad',
  '/gracias',
  '/en/thank-you',
  '/de/danke',
  '/ru/spasibo',
  '/it/grazie',
  '/fr/merci',
]);

const sitemapPath = join(dist, 'sitemap-0.xml');
assert.ok(existsSync(sitemapPath), 'Run npm run build before npm run audit:seo');

const sitemap = readFileSync(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(urls.length > 0, 'The sitemap must contain indexable URLs');

const htmlPathFor = (url) => {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return join(dist, 'index.html');

  const filePath = join(dist, `${pathname.slice(1)}.html`);
  const directoryPath = join(dist, pathname.slice(1), 'index.html');
  return existsSync(filePath) ? filePath : directoryPath;
};

const seenTitles = new Map();
const seenDescriptions = new Map();

for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, siteOrigin, `Unexpected sitemap host: ${url}`);
  assert.ok(!nonIndexablePaths.has(parsed.pathname), `noindex URL leaked into sitemap: ${url}`);
  assert.ok(!/^\/(en|de|ru|it|fr)\/$/.test(parsed.pathname), `Localized home has trailing slash: ${url}`);

  const htmlPath = htmlPathFor(url);
  assert.ok(existsSync(htmlPath), `Sitemap URL has no generated HTML: ${url}`);
  const html = readFileSync(htmlPath, 'utf8');

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? '';
  const lang = html.match(/<html lang="([^"]+)"/)?.[1] ?? 'unknown';
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const h1Count = [...html.matchAll(/<h1(?:\s|>)/gi)].length;

  assert.equal(canonical, url, `Canonical mismatch for ${url}: ${canonical}`);
  assert.match(robots, /index\s*,\s*follow/, `Sitemap URL is not indexable: ${url}`);
  assert.equal(h1Count, 1, `Indexable page must contain exactly one H1: ${url}`);
  assert.ok(!html.includes('/wp-content/uploads/'), `Legacy WordPress asset remains in ${url}`);

  const alternates = new Map(
    [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
      .map((match) => [match[1], match[2]])
  );
  if (alternates.has('x-default')) {
    assert.equal(alternates.get('x-default'), alternates.get('es'), `x-default differs from Spanish equivalent on ${url}`);
  }

  for (const [kind, value, registry] of [
    ['title', title, seenTitles],
    ['description', description, seenDescriptions],
  ]) {
    assert.ok(value, `Missing ${kind} on ${url}`);
    const key = `${lang}\u0000${value}`;
    assert.ok(!registry.has(key), `Duplicate ${kind} within ${lang}: ${registry.get(key)} and ${url}`);
    registry.set(key, url);
  }
}

for (const path of nonIndexablePaths) {
  const htmlPath = htmlPathFor(`${siteOrigin}${path}`);
  assert.ok(existsSync(htmlPath), `Expected noindex page is missing: ${path}`);
  const html = readFileSync(htmlPath, 'utf8');
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/, `Expected noindex meta on ${path}`);
}

const notFound = readFileSync(join(dist, '404.html'), 'utf8');
assert.match(notFound, /<meta name="robots" content="noindex, nofollow"/, '404 page must remain noindex');

const redirects = readFileSync(join(root, 'public', '_redirects'), 'utf8');
const manifest = JSON.parse(readFileSync(join(root, 'docs', 'wordpress-legacy-routes.json'), 'utf8'));
const rules = redirects
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => {
    const [source, target, status] = line.split(/\s+/);
    return { source, target, status };
  });

const ruleMatches = (rule, path) => {
  if (!rule.source.includes('*')) return rule.source === path;
  const prefix = rule.source.slice(0, rule.source.indexOf('*'));
  return path.startsWith(prefix);
};

for (const legacy of manifest.redirects) {
  const rule = rules.find((candidate) => ruleMatches(candidate, legacy.path));
  assert.ok(rule, `Missing WordPress redirect for ${legacy.path}`);
  assert.equal(rule.target, legacy.target, `Wrong redirect target for ${legacy.path}`);
  assert.equal(rule.status, '301', `WordPress redirect is not permanent for ${legacy.path}`);

  if (legacy.target.startsWith('/images/')) {
    assert.ok(existsSync(join(root, 'public', legacy.target.slice(1))), `Redirect target asset is missing: ${legacy.target}`);
  }
}

// Cloudflare Pages applies roughly the first hundred rules of _redirects and
// drops the rest without warning. On 2026-09-14 a 169-rule file shipped with
// its last 33 rules dead in production, so the retired Italian and French
// landings kept answering 200. Prefer splat rules over one rule per URL and
// keep the file comfortably below the ceiling.
const RULE_BUDGET = 90;
assert.ok(
  rules.length <= RULE_BUDGET,
  `_redirects has ${rules.length} rules; Cloudflare Pages silently ignores rules past ~100. Collapse them into splat rules.`
);

// A redirect takes precedence over a static asset with the same path, so a
// splat rule that is too greedy takes a live page off the site.
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const shadowing = rules.find((rule) => ruleMatches(rule, pathname));
  assert.ok(
    !shadowing,
    `Redirect "${shadowing?.source}" shadows the live page ${pathname}`
  );
}

console.log(`SEO audit passed: ${urls.length} indexable sitemap URLs, ${nonIndexablePaths.size} noindex pages, ${manifest.redirects.length} WordPress redirects and ${rules.length}/${RULE_BUDGET} redirect rules verified.`);
