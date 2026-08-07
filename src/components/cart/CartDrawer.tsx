import { useEffect, useRef } from 'react';
import {
  X, ShoppingCart, Plus, Minus, Trash2, ShoppingBag,
  Package, ArrowRight,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getFinalPrice, formatPrice } from '../../types';

export function CartDrawer() {
  const {
    cart, customBoxes, cartCount, cartTotal,
    isCartOpen, setIsCartOpen,
    isCheckoutOpen, setIsCheckoutOpen,
    addToCart, decreaseQuantity, removeFromCart, removeCustomBox, clearCart,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);
  const hasItems = cart.length > 0 || customBoxes.length > 0;

  // Cerrar con Escape (solo si el checkout no está abierto)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen && !isCheckoutOpen) setIsCartOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isCartOpen, isCheckoutOpen, setIsCartOpen]);

  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  // Foco al abrir
  useEffect(() => {
    if (isCartOpen) drawerRef.current?.focus();
  }, [isCartOpen]);

  return (
    <>
      {/* ── Overlay ──────────────────────────────── */}
      <div
        id="cart-overlay"
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 bg-bruma-brown/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* ── Drawer panel ─────────────────────────── */}
      <aside
        id="cart-drawer"
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out focus:outline-none
          ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* ── Header ──────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-bruma-cream-mid bg-gradient-to-r from-bruma-brown to-bruma-blue">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-white" strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="font-display font-semibold text-white text-base leading-none">
                Tu carrito
              </h2>
              <p className="text-bruma-cream text-xs mt-0.5">
                {cartCount} {cartCount === 1 ? 'ítem' : 'ítems'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasItems && (
              <button
                id="cart-clear-btn"
                onClick={clearCart}
                aria-label="Vaciar carrito"
                className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200"
                title="Vaciar carrito"
              >
                <Trash2 className="w-4 h-4" strokeWidth={1.8} />
              </button>
            )}
            <button
              id="cart-close-btn"
              onClick={() => setIsCartOpen(false)}
              aria-label="Cerrar carrito"
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all duration-200"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* ── Contenido ───────────────────────────── */}
        {!hasItems ? (
          /* Estado vacío */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-bruma-blue/5 flex items-center justify-center">
              <ShoppingBag className="w-9 h-9 text-bruma-blue/50" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-display font-semibold text-bruma-brown text-lg">Tu carrito está vacío</p>
              <p className="text-bruma-brown-light text-sm mt-1">
                Explorá nuestros productos y agregá tus favoritos.
              </p>
            </div>
            <button
              id="cart-continue-shopping"
              onClick={() => setIsCartOpen(false)}
              className="btn-primary mt-2"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            {/* Lista de ítems */}
            <ul className="flex-1 overflow-y-auto px-5 py-4 space-y-3">

              {/* Productos normales */}
              {cart.map(({ product, quantity }) => {
                const final = getFinalPrice(product);
                return (
                  <li
                    key={product.id}
                    id={`cart-item-${product.id}`}
                    className="flex gap-3 p-3 rounded-2xl bg-bruma-cream border border-bruma-blue/10 animate-fade-in"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-bruma-cream-dark">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>

                    <div className="flex flex-col flex-1 min-w-0 gap-1">
                      <p className="font-medium text-bruma-brown text-sm leading-snug line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-bruma-blue font-bold text-sm">
                        {formatPrice(final)}
                        {(product.discount ?? 0) > 0 && (
                          <span className="ml-1.5 text-xs text-bruma-brown-muted font-normal line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center rounded-xl border border-bruma-blue/20 bg-white overflow-hidden">
                          <button id={`cart-decrease-${product.id}`} onClick={() => decreaseQuantity(product.id)} aria-label="Quitar" className="px-2.5 py-1.5 text-bruma-blue hover:bg-bruma-blue/5 transition-colors">
                            <Minus className="w-3 h-3" strokeWidth={2.5} />
                          </button>
                          <span className="px-2 text-sm font-bold text-bruma-brown min-w-[1.5rem] text-center">{quantity}</span>
                          <button id={`cart-increase-${product.id}`} onClick={() => addToCart(product)} aria-label="Agregar" className="px-2.5 py-1.5 text-bruma-blue hover:bg-bruma-blue/5 transition-colors">
                            <Plus className="w-3 h-3" strokeWidth={2.5} />
                          </button>
                        </div>
                        <button id={`cart-remove-${product.id}`} onClick={() => removeFromCart(product.id)} aria-label={`Eliminar ${product.name}`} className="p-1.5 rounded-lg text-bruma-brown-light hover:text-red-500 hover:bg-red-50 transition-all">
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-bruma-brown text-sm">{formatPrice(final * quantity)}</p>
                    </div>
                  </li>
                );
              })}

              {/* Cajas personalizadas */}
              {customBoxes.map(({ box }) => (
                <li
                  key={box.id}
                  id={`cart-box-${box.id}`}
                  className="p-3 rounded-2xl bg-bruma-blue/5 border-2 border-bruma-blue/20 animate-fade-in"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-bruma-blue flex items-center justify-center flex-shrink-0">
                        <Package className="w-4 h-4 text-white" strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="font-semibold text-bruma-brown text-sm">{box.size.label} personalizada</p>
                        <p className="text-bruma-brown-light text-xs">{box.usedSlots}/{box.size.capacity} productos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-bruma-blue text-sm">{formatPrice(box.totalPrice)}</span>
                      <button
                        id={`cart-remove-box-${box.id}`}
                        onClick={() => removeCustomBox(box.id)}
                        aria-label="Eliminar caja"
                        className="p-1.5 rounded-lg text-bruma-brown-light hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 pl-10">
                    {box.items.map(item => (
                      <span key={item.product.id} className="text-xs px-2 py-0.5 bg-white border border-bruma-blue/20 rounded-full text-bruma-blue">
                        {item.quantity}× {item.product.name}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            {/* ── Footer ──────────────────────────── */}
            <div className="border-t border-bruma-cream-mid px-5 py-4 space-y-3 bg-bruma-cream">
              <div className="flex items-center justify-between">
                <span className="text-bruma-brown-light font-medium text-sm">Total estimado</span>
                <span className="font-bold text-2xl text-bruma-blue">{formatPrice(cartTotal)}</span>
              </div>

              {/* Botón principal — abre el checkout */}
              <button
                id="cart-checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="flex items-center justify-center gap-2.5 w-full py-4 btn-primary text-base rounded-2xl shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
                Finalizar pedido
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>

              <p className="text-center text-xs text-bruma-brown-light">
                Confirmás tu pedido por WhatsApp. Sin pagos online.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
