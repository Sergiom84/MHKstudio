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
    en: '/en/',
    de: '/de/',
    ru: '/ru/',
    it: '/it/',
    fr: '/fr/',
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

const slugifyCity = (city: string) =>
  city
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const getLocationSlug = (spanishSlug: string, lang: Lang) => {
  const location = locations.find((item) => item.slug === spanishSlug);
  if (!location) return spanishSlug;
  if (lang === 'es') return location.slug;

  const citySlug = slugifyCity(location.city);

  const prefixes: Record<Exclude<Lang, 'es'>, string> = {
    en: 'interior-designer-in',
    de: 'innenarchitektur',
    ru: 'dizainer-intererov',
    it: 'interior-designer',
    fr: 'decoratrice-interieur',
  };

  return `${prefixes[lang]}-${citySlug}`;
};

export const getLocationPath = (spanishSlug: string, lang: Lang) => {
  const slug = getLocationSlug(spanishSlug, lang);
  return lang === 'es' ? `/${slug}` : `/${lang}/${slug}`;
};

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
    for (const language of languages) {
      if (normalizePath(getLocationPath(location.slug, language.code)) === normalizedPath) {
        return { lang: language.code, routeKey: 'location' as const, locationSlug: location.slug };
      }
    }
  }

  return { lang: getLangFromPath(pathname), routeKey: undefined };
};

export const getLocalizedPath = (pathname: string, targetLang: Lang) => {
  const resolved = resolveLocalizedPath(pathname);

  if (resolved.routeKey === 'location' && resolved.locationSlug) {
    return getLocationPath(resolved.locationSlug, targetLang);
  }

  if (resolved.routeKey && resolved.routeKey !== 'location') {
    return getRoutePath(resolved.routeKey, targetLang);
  }

  return getRoutePath('home', targetLang);
};

export const getAlternatePaths = (pathname: string) =>
  Object.fromEntries(
    languages.map((language) => [language.code, getLocalizedPath(pathname, language.code)])
  ) as Record<Lang, string>;
