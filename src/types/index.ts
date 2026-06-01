// ─────────────────────────────────────────────────────────────
// Tipos globales de Loop Bakery
// ─────────────────────────────────────────────────────────────

export type TabType = 'personalizada' | 'armadas' | 'otros' | 'catering';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  discount?: number;
  category: TabType;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// ─── Caja personalizada ───────────────────────────────────────

export type BoxSizeId = 'chica' | 'mediana' | 'grande';

export interface BoxSize {
  id: BoxSizeId;
  label: string;
  capacity: number;   // cantidad máxima de unidades dentro de la caja
  price: number;      // precio base de la caja (se suma al contenido)
  description: string;
  emoji: string;
}

export interface CustomBoxItem {
  product: Product;
  quantity: number;
}

export interface CustomBox {
  id: string;         // uuid generado al crear la caja
  size: BoxSize;
  items: CustomBoxItem[];
  totalSlots: number; // capacity de la caja
  usedSlots: number;  // suma de quantities
  totalPrice: number; // precio base + suma de productos
}

export interface CustomBoxCartItem {
  type: 'customBox';
  box: CustomBox;
  quantity: number;   // siempre 1 por caja
}

// ─── Carrito unificado ────────────────────────────────────────

export type AnyCartItem = CartItem | CustomBoxCartItem;

// ─── Checkout ─────────────────────────────────────────────────

export interface CheckoutForm {
  nombre: string;
  apellido: string;
  telefono: string;
  diaRetiro: string;  // ISO date string YYYY-MM-DD
  notas: string;
}

// ─── Otros modelos ────────────────────────────────────────────

export interface CateringOption {
  id: number;
  people: string;
  description: string;
  price: number;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface NavItem {
  id: TabType;
  label: string;
  icon: string;
  description: string;
}

// ─── Helpers ──────────────────────────────────────────────────

/** Retorna el precio final aplicando descuento si corresponde */
export function getFinalPrice(product: Product): number {
  if (!product.discount) return product.price;
  return Math.round(product.price * (1 - product.discount / 100));
}

/** Formatea un número como precio en pesos argentinos */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Genera un ID único simple */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Tipos de tamaño de caja disponibles */
export const BOX_SIZES: BoxSize[] = [
  {
    id: 'chica',
    label: 'Caja Chica',
    capacity: 4,
    price: 500,
    description: '4 unidades a tu elección',
    emoji: '🎁',
  },
  {
    id: 'mediana',
    label: 'Caja Mediana',
    capacity: 8,
    price: 800,
    description: '8 unidades a tu elección',
    emoji: '🎀',
  },
  {
    id: 'grande',
    label: 'Caja Grande',
    capacity: 12,
    price: 1200,
    description: '12 unidades a tu elección',
    emoji: '🎊',
  },
];
