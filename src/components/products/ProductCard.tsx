import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Check, Tag, Star } from 'lucide-react';
import type { Product } from '../../types';
import { getFinalPrice, formatPrice } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, decreaseQuantity, isInCart, getQuantity } = useCart();
  const [imageError, setImageError] = useState(false);
  const [addedPulse, setAddedPulse] = useState(false);

  const inCart = isInCart(product.id);
  const quantity = getQuantity(product.id);
  const finalPrice = getFinalPrice(product);
  const hasDiscount = (product.discount ?? 0) > 0;

  const handleAdd = () => {
    addToCart(product);
    // Micro-animación de confirmación
    setAddedPulse(true);
    setTimeout(() => setAddedPulse(false), 600);
  };

  return (
    <article
      id={`product-card-${product.id}`}
      className="card flex flex-col overflow-hidden group"
    >
      {/* ── Imagen ─────────────────────────────────── */}
      <div className="relative overflow-hidden h-52 bg-cream-200 flex-shrink-0">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-lila-light to-cream-200">
            <span className="text-5xl">🎂</span>
          </div>
        )}

        {/* Overlay sutil al hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge de descuento */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-primary-700 text-white text-xs font-bold rounded-full shadow-md">
            <Tag className="w-3 h-3" strokeWidth={2.5} />
            {product.discount}% OFF
          </div>
        )}

        {/* Tags de categoría */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            {product.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-primary-700 text-[10px] font-semibold rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Badge "Más vendida" con estrella */}
        {product.tags?.includes('Más vendida') && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full shadow-md">
            <Star className="w-3 h-3 fill-amber-900" strokeWidth={0} />
            Más vendida
          </div>
        )}
      </div>

      {/* ── Contenido ──────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Nombre */}
        <h3 className="font-display font-semibold text-purple-deep text-lg leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Descripción */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Precio */}
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-2xl text-primary-700">
            {formatPrice(finalPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* ── Controles de carrito ─────────────────── */}
        {!inCart ? (
          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAdd}
            className={`btn-primary flex items-center justify-center gap-2 w-full py-3 text-sm transition-all duration-300 ${
              addedPulse ? 'scale-95 bg-primary-800' : ''
            }`}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {addedPulse ? (
              <>
                <Check className="w-4 h-4" strokeWidth={2.5} />
                ¡Agregado!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" strokeWidth={1.8} />
                Agregar al carrito
              </>
            )}
          </button>
        ) : (
          /* Contador inline cuando ya está en carrito */
          <div className="flex items-center justify-between bg-primary-50 border border-primary-200 rounded-2xl p-1.5">
            <button
              id={`decrease-${product.id}`}
              onClick={() => decreaseQuantity(product.id)}
              aria-label="Quitar una unidad"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white shadow-sm text-primary-700 hover:bg-primary-700 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>

            <span className="font-bold text-primary-700 text-base min-w-[2rem] text-center">
              {quantity}
            </span>

            <button
              id={`increase-${product.id}`}
              onClick={handleAdd}
              aria-label="Agregar otra unidad"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary-700 text-white hover:bg-primary-800 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
