import { locations } from '../data/locations';

export const defaultLang = 'es';

export const languages = [
  { code: 'es', label: 'Español', flag: 'es', locale: 'es_ES', hreflang: 'es' },
  { code: 'en', label: 'English', flag: 'en', locale: 'en_GB', hreflang: 'en' },
  { code: 'de', label: 'Deutsch', flag: 'de', locale: 'de_DE', hreflang: 'de' },
  { code: 'ru', label: 'Русский', flag: 'ru', locale: 'ru_RU', hreflang: 'ru' },
  { code: 'it', label: 'Italiano', flag: 'it', locale: 'it_IT', hreflang: 'it' },
  { code: 'fr', label: 'Français', flag: 'fr', locale: 'fr_FR', hreflang: 'fr' },
] as const;

export type Lang = (typeof languages)[number]['code'];
export type RouteKey = 'home' | 'services' | 'about' | 'contact' | 'thanks';

export const nonDefaultLanguages = languages
  .map((language) => language.code)
  .filter((code): code is Exclude<Lang, 'es'> => code !== defaultLang);

export const routePaths: Record<RouteKey, Record<Lang, string>> = {
  home: {
    es: '/',
    en: '/en',
    de: '/de',
    ru: '/ru',
    it: '/it',
    fr: '/fr',
  },
  services: {
    es: '/servicios',
    en: '/en/services',
    de: '/de/dienstleistungen',
    ru: '/ru/uslugi',
    it: '/it/servizi',
    fr: '/fr/services',
  },
  about: {
    es: '/sobre-nosotros',
    en: '/en/about-us',
    de: '/de/ueber-uns',
    ru: '/ru/o-nas',
    it: '/it/chi-siamo',
    fr: '/fr/a-propos',
  },
  contact: {
    es: '/contacto',
    en: '/en/contact',
    de: '/de/kontakt',
    ru: '/ru/kontakty',
    it: '/it/contatto',
    fr: '/fr/contact',
  },
  thanks: {
    es: '/gracias',
    en: '/en/thank-you',
    de: '/de/danke',
    ru: '/ru/spasibo',
    it: '/it/grazie',
    fr: '/fr/merci',
  },
};

export const isLang = (value: string | undefined): value is Lang =>
  Boolean(value && languages.some((language) => language.code === value));

export const normalizePath = (path: string) => {
  if (!path || path === '/') return '/';

  const withoutHtml = path
    .replace(/\/index\.html$/, '')
    .replace(/\.html$/, '');

  const normalized = withoutHtml.endsWith('/') ? withoutHtml.slice(0, -1) : withoutHtml;
  return normalized || '/';
};

export const absoluteUrl = (baseUrl: string, path: string) => {
  const normalizedPath = path === '/' ? '' : path;
  return `${baseUrl}${normalizedPath}`;
};

export const getRoutePath = (routeKey: RouteKey, lang: Lang, hash = '') =>
  `${routePaths[routeKey][lang]}${hash}`;

// City landing pages exist in Spanish only. Publishing one per city and per
// language produced 66 near-identical copies of the home page (the same body
// copy with the city name swapped), which is what buried the real pages in
// Google. The translated sites keep their four canonical pages; the city
// pages stay Spanish, where the local search intent actually lives.
export const locationLang: Lang = defaultLang;

export const getLocationPath = (spanishSlug: string) => `/${spanishSlug}`;

export const getLangFromPath = (pathname: string): Lang => {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return isLang(firstSegment) ? firstSegment : defaultLang;
};

export const resolveLocalizedPath = (pathname: string) => {
  const normalizedPath = normalizePath(pathname);

  for (const routeKey of Object.keys(routePaths) as RouteKey[]) {
    for (const language of languages) {
      if (normalizePath(routePaths[routeKey][language.code]) === normalizedPath) {
        return { lang: language.code, routeKey };
      }
    }
  }

  for (const location of locations) {
    if (normalizePath(getLocationPath(location.slug)) === normalizedPath) {
      return { lang: locationLang, routeKey: 'location' as const, locationSlug: location.slug };
    }
  }

  return { lang: getLangFromPath(pathname), routeKey: undefined };
};

export const getLocalizedPath = (pathname: string, targetLang: Lang) => {
  const resolved = resolveLocalizedPath(pathname);

  if (resolved.routeKey === 'location' && resolved.locationSlug) {
    return targetLang === locationLang
      ? getLocationPath(resolved.locationSlug)
      : getRoutePath('home', targetLang);
  }

  if (resolved.routeKey && resolved.routeKey !== 'location') {
    return getRoutePath(resolved.routeKey, targetLang);
  }

  return getRoutePath('home', targetLang);
};

/**
 * hreflang alternates for a page, or null when the page has no translations.
 * City landings are Spanish-only, so pointing hreflang at the localized homes
 * would claim a translation that does not exist.
 */
export const getAlternatePaths = (pathname: string): Record<Lang, string> | null => {
  const resolved = resolveLocalizedPath(pathname);

  if (!resolved.routeKey || resolved.routeKey === 'location') return null;

  return Object.fromEntries(
    languages.map((language) => [language.code, getLocalizedPath(pathname, language.code)])
  ) as Record<Lang, string>;
};
