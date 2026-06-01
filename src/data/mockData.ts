import type { Product, CateringOption } from '../types';

// ─────────────────────────────────────────────────────────────
// MOCK DATA — Cajas ya armadas
// ─────────────────────────────────────────────────────────────
export const PREBUILT_BOXES: Product[] = [
  {
    id: 1,
    name: 'Caja Dulce Tentación',
    description: '6 cupcakes artesanales con buttercream de vainilla y decoración floral comestible.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1713759980319-8199058cef6b?w=600&q=80',
    discount: 10,
    category: 'armadas',
    tags: ['Más vendida', 'Cupcakes'],
  },
  {
    id: 2,
    name: 'Caja Premium Especial',
    description: 'Torta de 3 pisos con flores comestibles + 4 tarteletas de frutos rojos.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1630534591989-7858079986a6?w=600&q=80',
    discount: 0,
    category: 'armadas',
    tags: ['Premium', 'Para regalo'],
  },
  {
    id: 3,
    name: 'Caja Artesanal Frutal',
    description: 'Mix de tarteletas de frutas de estación con merengue tostado y crema pastelera.',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1764155535434-6cb2fa141e5e?w=600&q=80',
    discount: 15,
    category: 'armadas',
    tags: ['Oferta', 'Tarteletas'],
  },
  {
    id: 4,
    name: 'Caja Brownie Lovers',
    description: '8 brownies de chocolate semi-amargo con chips y nuez pecán.',
    price: 7200,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    discount: 0,
    category: 'armadas',
    tags: ['Chocolate', 'Brownies'],
  },
  {
    id: 5,
    name: 'Caja Macarons Parisinos',
    description: '12 macarons de colores con rellenos de vainilla, frutilla y pistacho.',
    price: 11000,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&q=80',
    discount: 0,
    category: 'armadas',
    tags: ['Importados', 'Macarons'],
  },
  {
    id: 6,
    name: 'Caja Mini Delicias',
    description: 'Selección de 15 petit fours: financiers, cookies, trufas y mini eclairs.',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80',
    discount: 5,
    category: 'armadas',
    tags: ['Variedad', 'Petit fours'],
  },
];

// ─────────────────────────────────────────────────────────────
// MOCK DATA — Otros productos
// ─────────────────────────────────────────────────────────────
export const INDIVIDUAL_PRODUCTS: Product[] = [
  {
    id: 101,
    name: 'Alfajor Triple Cordobés',
    description: 'Tres capas de masa de maicena con dulce de leche artesanal, bañado en chocolate.',
    price: 950,
    image: 'https://images.unsplash.com/photo-1717198100629-b1a59284ced9?w=600&q=80',
    discount: 0,
    category: 'otros',
    tags: ['Alfajores'],
  },
  {
    id: 102,
    name: 'Porción Red Velvet',
    description: 'Porción de torta red velvet esponjosa con frosting de cream cheese.',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1643102012833-cc5f59e206f7?w=600&q=80',
    discount: 0,
    category: 'otros',
    tags: ['Torta'],
  },
  {
    id: 103,
    name: 'Cupcake Buttercream',
    description: 'Cupcake de vainilla con buttercream decorado a mano, disponible en varios colores.',
    price: 900,
    image: 'https://images.unsplash.com/photo-1710940945472-c601481a2c03?w=600&q=80',
    discount: 10,
    category: 'otros',
    tags: ['Cupcakes'],
  },
  {
    id: 104,
    name: 'Croissant de Manteca',
    description: 'Medialunas de manteca con hojaldre crujiente, elaboradas con masa fermentada 48 hs.',
    price: 750,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
    discount: 0,
    category: 'otros',
    tags: ['Panadería'],
  },
  {
    id: 105,
    name: 'Trufa de Chocolate Belga',
    description: 'Trufas artesanales bañadas en cacao puro, con centro cremoso de ganache.',
    price: 600,
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&q=80',
    discount: 0,
    category: 'otros',
    tags: ['Chocolate'],
  },
  {
    id: 106,
    name: 'Cheesecake de Frutilla',
    description: 'Porción de cheesecake horneado sobre base de galleta, con coulis de frutilla fresca.',
    price: 1600,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
    discount: 20,
    category: 'otros',
    tags: ['Torta', 'Oferta'],
  },
];

// ─────────────────────────────────────────────────────────────
// MOCK DATA — Catering & Fiesta
// ─────────────────────────────────────────────────────────────
export const CATERING_OPTIONS: CateringOption[] = [
  {
    id: 201,
    people: '10 – 15 personas',
    description: 'Mesa dulce con variedad de postres artesanales + torta temática de 2 pisos.',
    price: 45000,
  },
  {
    id: 202,
    people: '20 – 30 personas',
    description: 'Catering completo con postres variados, candy bar básico + torta de 2 pisos personalizada.',
    price: 78000,
  },
  {
    id: 203,
    people: '40 – 60 personas',
    description: 'Servicio premium con candy bar completo, mesa de dulces + torta de 3 pisos con diseño exclusivo.',
    price: 130000,
  },
  {
    id: 204,
    people: '60+ personas',
    description: 'Experiencia full-service: planificación, montaje, candy bar premium, postres ilimitados y torta show.',
    price: 210000,
  },
];
