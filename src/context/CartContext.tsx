import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type {
  CartItem, CustomBoxCartItem, AnyCartItem,
  Product, CustomBox,
} from '../types';
import { getFinalPrice } from '../types';

// ─────────────────────────────────────────────────────────────
// Cart Context — Loop Bakery
// ─────────────────────────────────────────────────────────────

interface CartContextValue {
  // ── Estado ─────────────────────────────────────────────────
  cart: CartItem[];
  customBoxes: CustomBoxCartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // ── Productos normales ──────────────────────────────────────
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  isInCart: (productId: number) => boolean;
  getQuantity: (productId: number) => number;

  // ── Cajas personalizadas ────────────────────────────────────
  addCustomBox: (box: CustomBox) => void;
  removeCustomBox: (boxId: string) => void;

  // ── General ────────────────────────────────────────────────
  clearCart: () => void;

  /** Todos los ítems como lista plana para el checkout */
  allItems: AnyCartItem[];
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customBoxes, setCustomBoxes] = useState<CustomBoxCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // ── Productos normales ──────────────────────────────────────

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const decreaseQuantity = useCallback((productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity === 1) return prev.filter(item => item.product.id !== productId);
      return prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const isInCart = useCallback(
    (productId: number) => cart.some(item => item.product.id === productId),
    [cart]
  );

  const getQuantity = useCallback(
    (productId: number) => cart.find(item => item.product.id === productId)?.quantity ?? 0,
    [cart]
  );

  // ── Cajas personalizadas ────────────────────────────────────

  const addCustomBox = useCallback((box: CustomBox) => {
    setCustomBoxes(prev => [...prev, { type: 'customBox', box, quantity: 1 }]);
  }, []);

  const removeCustomBox = useCallback((boxId: string) => {
    setCustomBoxes(prev => prev.filter(item => item.box.id !== boxId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setCustomBoxes([]);
  }, []);

  // ── Cálculos ────────────────────────────────────────────────

  const normalTotal = cart.reduce(
    (sum, item) => sum + getFinalPrice(item.product) * item.quantity, 0
  );
  const boxTotal = customBoxes.reduce((sum, item) => sum + item.box.totalPrice, 0);
  const cartTotal = normalTotal + boxTotal;

  const normalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = normalCount + customBoxes.length;

  const allItems: AnyCartItem[] = [...cart, ...customBoxes];

  return (
    <CartContext.Provider
      value={{
        cart,
        customBoxes,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        isInCart,
        getQuantity,
        addCustomBox,
        removeCustomBox,
        clearCart,
        allItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
