const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => htmlEntities[char]);

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const homeSpanishHighlightTerms = [
  'combina estética',
  'coherencia visual',
  'servicio integral',
  'paleta de colores',
  'pequeños gestos',
  'orden visual',
  'y las emociones',
  'los materiales',
  'MHK Studio',
  'sensibilidad',
  'sostenibles',
  'equilibrada',
  'agradables',
  'iluminación',
  'bienestar',
  'atractiva',
  'objetivos',
  'calidez',
  'natural',
  'estética',
  'mejorar',
  'renovar',
  'tu hogar',
  'colores',
  'sentir',
  'estilo',
  'ideas',
] as const;

export const createTextHighlighter = (
  terms: readonly string[],
  className = 'mhk-copy-highlight',
) => {
  const uniqueTerms = Array.from(new Set(terms.map((term) => term.trim()).filter(Boolean)))
    .sort((a, b) => b.length - a.length);

  if (uniqueTerms.length === 0) {
    return escapeHtml;
  }

  const termPattern = uniqueTerms.map(escapeRegExp).join('|');
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])(${termPattern})(?![\\p{L}\\p{N}])`, 'giu');

  return (text: string) =>
    escapeHtml(text).replace(pattern, `<span class="${className}">$1</span>`);
};
