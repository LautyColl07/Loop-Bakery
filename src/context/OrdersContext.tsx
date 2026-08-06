import {
  createContext, useContext, useEffect, useState,
  useCallback, ReactNode,
} from 'react';

// ─────────────────────────────────────────────────────────────
// Tipos de pedido
// ─────────────────────────────────────────────────────────────

export interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  items: OrderItem[];
  total: number;
  pickupDate: string;       // ISO date YYYY-MM-DD
  createdAt: string;        // ISO datetime
  completedAt?: string;     // ISO datetime — cuando se marcó como vendido
  status: 'pending' | 'completed';
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function generateOrderId() {
  return `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

/** Genera una fecha ISO retrocediendo `daysAgo` días desde hoy */
function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function dateOnly(iso: string): string {
  return iso.slice(0, 10);
}

// ─────────────────────────────────────────────────────────────
// Datos seed — historial simulado de 4 semanas
// ─────────────────────────────────────────────────────────────

const SEED_NAMES = [
  'María López', 'Juan Pérez', 'Camila Torres', 'Lucía Fernández',
  'Martín García', 'Valentina Díaz', 'Santiago Ruiz', 'Florencia Gómez',
  'Nicolás Martínez', 'Sofía Romero', 'Pablo Herrera', 'Carolina Morales',
];

const SEED_PRODUCTS = [
  { name: 'Caja Mediana Clásica', prices: [5500, 6200] },
  { name: 'Alfajores x6', prices: [3200, 3800] },
  { name: 'Caja Grande Premium', prices: [8900, 9500] },
  { name: 'Porción Cheesecake', prices: [2800, 3100] },
  { name: 'Brownies x4', prices: [2500, 2900] },
  { name: 'Caja Chica Sorpresa', prices: [3500, 4000] },
  { name: 'Torta de cumpleaños', prices: [12000, 15000] },
  { name: 'Muffins x6', prices: [2800, 3200] },
];

function seedOrders(): Order[] {
  const orders: Order[] = [];
  // Generar ~3-6 pedidos completados por cada uno de los últimos 28 días
  for (let day = 0; day < 28; day++) {
    const ordersToday = 2 + Math.floor(Math.random() * 5); // 2-6
    for (let o = 0; o < ordersToday; o++) {
      const client = SEED_NAMES[Math.floor(Math.random() * SEED_NAMES.length)];
      const numItems = 1 + Math.floor(Math.random() * 3);
      const items: OrderItem[] = [];
      let total = 0;
      for (let i = 0; i < numItems; i++) {
        const prod = SEED_PRODUCTS[Math.floor(Math.random() * SEED_PRODUCTS.length)];
        const qty = 1 + Math.floor(Math.random() * 2);
        const price = prod.prices[Math.floor(Math.random() * prod.prices.length)];
        items.push({ productName: prod.name, quantity: qty, unitPrice: price });
        total += price * qty;
      }
      const created = daysAgo(day);
      orders.push({
        id: generateOrderId(),
        clientName: client,
        clientPhone: '5491100000000',
        items,
        total,
        pickupDate: dateOnly(created),
        createdAt: created,
        completedAt: created,
        status: 'completed',
      });
    }
  }

  // Agregar 3-5 pedidos pendientes recientes
  const pendingCount = 3 + Math.floor(Math.random() * 3);
  for (let p = 0; p < pendingCount; p++) {
    const client = SEED_NAMES[Math.floor(Math.random() * SEED_NAMES.length)];
    const numItems = 1 + Math.floor(Math.random() * 3);
    const items: OrderItem[] = [];
    let total = 0;
    for (let i = 0; i < numItems; i++) {
      const prod = SEED_PRODUCTS[Math.floor(Math.random() * SEED_PRODUCTS.length)];
      const qty = 1 + Math.floor(Math.random() * 3);
      const price = prod.prices[Math.floor(Math.random() * prod.prices.length)];
      items.push({ productName: prod.name, quantity: qty, unitPrice: price });
      total += price * qty;
    }
    const futureDay = 1 + Math.floor(Math.random() * 5);
    const pickup = new Date();
    pickup.setDate(pickup.getDate() + futureDay);
    orders.push({
      id: generateOrderId(),
      clientName: client,
      clientPhone: '5491100000000',
      items,
      total,
      pickupDate: pickup.toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
      status: 'pending',
    });
  }

  return orders;
}

// ─────────────────────────────────────────────────────────────
// Persistencia localStorage
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'loop-bakery-orders';

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Order[];
      if (parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  return seedOrders();
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

// ─────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────

interface OrdersContextValue {
  orders: Order[];
  pendingOrders: Order[];
  completedOrders: Order[];
  addOrder: (data: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  completeOrder: (id: string) => void;
  deleteOrder: (id: string) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(loadOrders);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const completedOrders = orders.filter(o => o.status === 'completed');

  const addOrder = useCallback((data: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...data,
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setOrders(prev => [newOrder, ...prev]);
  }, []);

  const completeOrder = useCallback((id: string) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === id
          ? { ...o, status: 'completed' as const, completedAt: new Date().toISOString() }
          : o
      )
    );
  }, []);

  const deleteOrder = useCallback((id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  }, []);

  return (
    <OrdersContext.Provider value={{
      orders, pendingOrders, completedOrders,
      addOrder, completeOrder, deleteOrder,
    }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}
