import {
  createContext, useContext, useEffect, useState,
  useCallback, ReactNode,
} from 'react';
import type { Product } from '../types';
import { PREBUILT_BOXES, INDIVIDUAL_PRODUCTS } from '../data/mockData';

// ─────────────────────────────────────────────────────────────
// Tipos del catálogo admin
// ─────────────────────────────────────────────────────────────

export interface AdminProduct extends Product {
  stock: number;
}

const STORAGE_KEY = 'loop-bakery-catalog';

function seedInitialProducts(): AdminProduct[] {
  const all: AdminProduct[] = [
    ...PREBUILT_BOXES.map(p => ({ ...p, stock: 10 })),
    ...INDIVIDUAL_PRODUCTS.map(p => ({ ...p, stock: 20 })),
  ];
  return all;
}

function loadFromStorage(): AdminProduct[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AdminProduct[];
  } catch { /* ignore */ }
  return seedInitialProducts();
}

function saveToStorage(products: AdminProduct[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// ─────────────────────────────────────────────────────────────

interface CatalogContextValue {
  products: AdminProduct[];
  addProduct: (data: Omit<AdminProduct, 'id'>) => void;
  updateProduct: (id: number | string, data: Partial<AdminProduct>) => void;
  deleteProduct: (id: number | string) => void;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<AdminProduct[]>(loadFromStorage);

  // Persiste en localStorage cada vez que cambia
  useEffect(() => {
    saveToStorage(products);
  }, [products]);

  const addProduct = useCallback((data: Omit<AdminProduct, 'id'>) => {
    const newProduct: AdminProduct = {
      ...data,
      id: Date.now(), // ID numérico único basado en timestamp
    };
    setProducts(prev => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((id: number | string, data: Partial<AdminProduct>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id || p.id === Number(id)) ? { ...p, ...data } : p)
    );
  }, []);

  const deleteProduct = useCallback((id: number | string) => {
    setProducts(prev =>
      prev.filter(p => p.id !== id && p.id !== Number(id))
    );
  }, []);

  return (
    <CatalogContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
