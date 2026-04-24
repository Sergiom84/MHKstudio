export interface Location {
  slug: string;
  city: string;
  title: string;
  metaDescription: string;
  province: string;
}

export const locations: Location[] = [
  {
    slug: 'disenadora-de-interiores-en-mojacar',
    city: 'Mojácar',
    title: 'Diseñadora de interiores en Mojácar',
    metaDescription: 'Estudio de diseño de interiores en Mojácar. Decoración, proyectos de interiorismo, cocinas y baños a medida y home staging profesional. MHK Studio.',
    province: 'Almería',
  },
  {
    slug: 'disenadora-de-interiores-almeria',
    city: 'Almería',
    title: 'Diseñadora de interiores en Almería',
    metaDescription: 'Servicio de diseño de interiores en Almería. Decoración personalizada, interiorismo, cocinas y baños a medida y home staging. MHK Studio.',
    province: 'Almería',
  },
  {
    slug: 'disenadora-de-interiores-lorca',
    city: 'Lorca',
    title: 'Diseñadora de interiores en Lorca',
    metaDescription: 'Diseño de interiores y decoración en Lorca. Proyectos personalizados de interiorismo, cocinas, baños y home staging. MHK Studio.',
    province: 'Murcia',
  },
  {
    slug: 'disenadora-de-interiores-aguilas',
    city: 'Águilas',
    title: 'Diseñadora de interiores en Águilas',
    metaDescription: 'Diseño de interiores en Águilas (Murcia). Decoración, interiorismo, cocinas y baños a medida y home staging profesional. MHK Studio.',
    province: 'Murcia',
  },
  {
    slug: 'disenadora-de-interiores-vera',
    city: 'Vera',
    title: 'Diseñadora de interiores en Vera',
    metaDescription: 'Estudio de diseño de interiores en Vera (Almería). Decoración, interiorismo, cocinas, baños y home staging. MHK Studio.',
    province: 'Almería',
  },
  {
    slug: 'disenadora-de-interiores-carboneras',
    city: 'Carboneras',
    title: 'Diseñadora de interiores en Carboneras',
    metaDescription: 'Diseño de interiores y decoración en Carboneras (Almería). Proyectos de interiorismo, cocinas, baños y home staging. MHK Studio.',
    province: 'Almería',
  },
  {
    slug: 'disenadora-de-interiores-garrucha',
    city: 'Garrucha',
    title: 'Diseñadora de interiores en Garrucha',
    metaDescription: 'Diseño de interiores en Garrucha (Almería). Decoración personalizada, interiorismo, cocinas y baños a medida. MHK Studio.',
    province: 'Almería',
  },
  {
    slug: 'disenadora-de-interiores-san-juan-de-los-terreros',
    city: 'San Juan de los Terreros',
    title: 'Diseñadora de interiores en San Juan de los Terreros',
    metaDescription: 'Diseño de interiores en San Juan de los Terreros (Almería). Decoración, interiorismo y home staging. MHK Studio.',
    province: 'Almería',
  },
  {
    slug: 'disenadora-de-interiores-roquetas-de-mar',
    city: 'Roquetas de Mar',
    title: 'Diseñadora de interiores en Roquetas de Mar',
    metaDescription: 'Diseño de interiores y decoración en Roquetas de Mar (Almería). Proyectos de interiorismo, cocinas, baños y home staging. MHK Studio.',
    province: 'Almería',
  },
  {
    slug: 'disenadora-de-interiores-agua-amarga',
    city: 'Agua Amarga',
    title: 'Diseñadora de interiores en Agua Amarga',
    metaDescription: 'Diseño de interiores en Agua Amarga (Almería). Decoración personalizada, cocinas, baños y home staging profesional. MHK Studio.',
    province: 'Almería',
  },
  {
    slug: 'disenadora-de-interiores-cabo-de-gata',
    city: 'Cabo de Gata',
    title: 'Diseñadora de interiores en Cabo de Gata',
    metaDescription: 'Diseño de interiores en Cabo de Gata (Almería). Decoración, interiorismo, cocinas y baños a medida y home staging. MHK Studio.',
    province: 'Almería',
  },
];

export const services = [
  {
    title: 'Decoración de interiores',
    description: 'Creamos ambientes armoniosos eligiendo cuidadosamente la paleta de colores, el mobiliario, los textiles y los elementos decorativos. Ideal para quienes desean renovar su hogar sin necesidad de obras.',
    image: '/images/Decoracion-1.webp',
    alt: 'Decoración de interiores',
  },
  {
    title: 'Proyectos de interiorismo',
    description: 'Servicio integral de interiorismo personalizado para reformas integrales o viviendas nuevas. Desde la primera visita técnica hasta la entrega del proyecto final, te acompañamos en cada paso.',
    image: '/images/Interiorismo.webp',
    alt: 'Proyectos de interiorismo',
  },
  {
    title: 'Diseño de cocinas & baños a medida',
    description: 'Diseñamos cocinas y baños que combinan estilo, funcionalidad y confort. Cada proyecto parte de un análisis detallado de tus hábitos y necesidades para lograr espacios eficientes y visualmente atractivos.',
    image: '/images/Cocina.webp',
    alt: 'Diseño de cocinas y baños',
  },
  {
    title: 'Home Staging profesional',
    description: 'Preparamos tu propiedad para destacar en el mercado inmobiliario. Mejoramos la apariencia de la vivienda para captar más visitas, acortar los tiempos de venta y obtener un mejor precio.',
    image: '/images/Home-staging.webp',
    alt: 'Home Staging profesional',
  },
  {
    title: 'Asesoría online de decoración e interiorismo',
    description: 'Accede a nuestro conocimiento desde cualquier lugar. Sesión personalizada por videollamada en la que analizamos tus espacios, resolvemos dudas y damos recomendaciones claras y accionables.',
    image: '/images/Asesoramiento.webp',
    alt: 'Asesoría online de decoración',
  },
];

export const brandLogos = [
  { name: 'Vincent', src: '/images/logo-vincent-1.webp' },
  { name: 'Veravent', src: '/images/logo-veravent-1.webp' },
  { name: 'Unika', src: '/images/logo-unika-1.webp' },
  { name: 'Sovet', src: '/images/logo-sovet-1.webp' },
  { name: 'Smeg', src: '/images/logo-smeg-1.webp' },
  { name: 'Siemens', src: '/images/logo-siemens-1.webp' },
  { name: 'Pladostelma', src: '/images/logo-pladostelma-1.webp' },
  { name: 'Ondarreta', src: '/images/logo-ondarreta-1.webp' },
  { name: 'Novy', src: '/images/logo-novy-1.webp' },
  { name: 'Frecan', src: '/images/logo-frecan-1.webp' },
  { name: 'Fiam', src: '/images/logo-fiam-1.webp' },
  { name: 'Cosentino', src: '/images/logo-cosentino-1.webp' },
  { name: 'Blanco', src: '/images/logo-blanco-1.webp' },
  { name: 'Andreu World', src: '/images/logo-andreu-1.webp' },
  { name: 'Codis', src: '/images/logo-codis-1.webp' },
  { name: 'Moradillo', src: '/images/logo-moradillo-1.webp' },
];

export interface EditorialSlide {
  src: string;
  avifSrc: string;
  alt: string;
  caption: string;
  category: string;
}

export const editorialSlides: EditorialSlide[] = [
  {
    src: '/images/editorial/agua-editorial.webp',
    avifSrc: '/images/editorial/agua-editorial.avif',
    alt: 'Reflejos de agua clara como inspiración natural para interiores mediterráneos',
    caption: 'Luz, frescura y calma para espacios que respiran.',
    category: 'Agua',
  },
  {
    src: '/images/editorial/olivo-editorial.webp',
    avifSrc: '/images/editorial/olivo-editorial.avif',
    alt: 'Ramas de olivo proyectando sombras sobre una pared neutra',
    caption: 'Texturas orgánicas, sombra suave y materiales honestos.',
    category: 'Olivo',
  },
  {
    src: '/images/editorial/espigas-editorial.webp',
    avifSrc: '/images/editorial/espigas-editorial.avif',
    alt: 'Espigas naturales en tonos cálidos y neutros',
    caption: 'Una paleta serena inspirada en la tierra y la luz.',
    category: 'Espigas',
  },
];

export const siteConfig = {
  name: 'MHK Studio',
  tagline: 'designing for living',
  description: 'Estudio de diseño de interiores en Mojácar. Decoración de interiores, proyectos llave en mano, cocinas y baños a medida y home staging profesional.',
  url: 'https://mhkstudio.design',
  phone: '+34 608 18 79 21',
  phoneHref: 'tel:+34608187921',
  email: 'info@mhkstudio.design',
  address: '04638 – Mojácar (Almería) España',
  facebook: 'https://www.facebook.com/profile.php?id=61573166356178',
  instagram: 'https://www.instagram.com/mhkstudio.design',
  whatsapp: 'https://wa.me/34608187921',
  pinterest: 'https://www.pinterest.es/mhkstudio',
};
