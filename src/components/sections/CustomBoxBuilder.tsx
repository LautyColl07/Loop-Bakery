import { useState, useMemo } from 'react';
import {
  Package, ChevronRight, ChevronLeft, Plus, Minus, Check,
  ShoppingCart, Info, Box,
} from 'lucide-react';
import { INDIVIDUAL_PRODUCTS } from '../../data/mockData';
import type { BoxSize, CustomBoxItem } from '../../types';
import { BOX_SIZES, getFinalPrice, formatPrice, generateId } from '../../types';
import { useCart } from '../../context/CartContext';



// Usamos sólo los "otros" para llenar cajas (sin duplicar)
const BOX_FILLABLE = [...new Map(
  [...INDIVIDUAL_PRODUCTS].map(p => [p.id, p])
).values()];

// ─────────────────────────────────────────────────────────────
// Paso 1 — Selector de tamaño
// ─────────────────────────────────────────────────────────────
function SizeStep({
  selected,
  onSelect,
}: {
  selected: BoxSize | null;
  onSelect: (size: BoxSize) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-display text-2xl font-bold text-bruma-brown mb-2">
          ¿De qué tamaño querés tu caja?
        </h3>
        <p className="text-muted-foreground text-sm">
          Después podrás elegir qué productos incluir
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {BOX_SIZES.map((size) => {
          const isSelected = selected?.id === size.id;
          return (
            <button
              key={size.id}
              id={`box-size-${size.id}`}
              onClick={() => onSelect(size)}
              className={`relative flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-bruma-teal text-left
                ${isSelected
                  ? 'border-bruma-blue bg-bruma-blue shadow-glow-purple scale-[1.02]'
                  : 'border-bruma-cream-mid bg-white hover:border-bruma-teal hover:shadow-card-hover hover:-translate-y-1'
                }`}
            >
              {/* Emoji */}
              <span className="text-4xl">{size.emoji}</span>

              {/* Label */}
              <div className="text-center">
                <p className={`font-display font-bold text-lg ${isSelected ? 'text-white' : 'text-bruma-brown'}`}>
                  {size.label}
                </p>
                <p className={`text-sm mt-1 ${isSelected ? 'text-white/70' : 'text-bruma-brown-light'}`}>
                  {size.description}
                </p>
              </div>

              {/* Precio base */}
              <div className={`w-full text-center py-2 rounded-xl ${isSelected ? 'bg-white/15' : 'bg-bruma-blue/5'}`}>
                <p className={`text-xs ${isSelected ? 'text-white/60' : 'text-bruma-brown-light'}`}>
                  Precio base caja
                </p>
                <p className={`font-bold text-base ${isSelected ? 'text-white' : 'text-bruma-blue'}`}>
                  {formatPrice(size.price)}
                </p>
              </div>

              {/* Checkmark */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-bruma-blue" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Nota informativa */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-bruma-teal-light/30 border border-bruma-teal/30">
        <Info className="w-4 h-4 text-bruma-blue flex-shrink-0 mt-0.5" strokeWidth={1.8} />
        <p className="text-sm text-bruma-blue-dark leading-relaxed">
          El precio de la caja incluye el costo del packaging. Al contenido se le suma el precio
          de cada producto elegido.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Paso 2 — Selector de productos
// ─────────────────────────────────────────────────────────────
function FillStep({
  size,
  items,
  onAdd,
  onDecrease,
  getQty,
  usedSlots,
}: {
  size: BoxSize;
  items: CustomBoxItem[];
  onAdd: (product: (typeof BOX_FILLABLE)[0]) => void;
  onDecrease: (productId: number) => void;
  getQty: (id: number) => number;
  usedSlots: number;
}) {
  const remaining = size.capacity - usedSlots;
  const pct = Math.round((usedSlots / size.capacity) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="font-display text-2xl font-bold text-bruma-brown mb-1">
          Completá tu {size.label}
        </h3>
        <p className="text-bruma-brown-light text-sm">
          Podés agregar hasta <strong>{size.capacity} unidades</strong> de lo que quieras
        </p>
      </div>

      {/* Barra de progreso */}
      <div className="bg-bruma-cream-dark rounded-2xl p-4 border border-bruma-cream-mid">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-bruma-brown flex items-center gap-1.5">
            <Box className="w-4 h-4 text-bruma-blue" strokeWidth={1.8} />
            {size.label}
          </span>
          <span className={`text-sm font-bold ${usedSlots >= size.capacity ? 'text-bruma-blue' : 'text-bruma-brown-light'}`}>
            {usedSlots}/{size.capacity} lugares
          </span>
        </div>

        {/* Barra */}
        <div className="h-3 bg-bruma-cream-mid rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              usedSlots >= size.capacity
                ? 'bg-gradient-to-r from-bruma-blue to-bruma-teal'
                : 'bg-gradient-to-r from-bruma-blue to-bruma-teal-light'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Chips de resumen */}
        {items.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {items.map(item => (
              <span
                key={item.product.id}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-bruma-blue/20 rounded-full text-xs text-bruma-blue font-medium"
              >
                {item.quantity}× {item.product.name}
              </span>
            ))}
          </div>
        )}

        {usedSlots >= size.capacity && (
          <p className="text-xs text-bruma-blue font-semibold mt-2 text-center">
            ¡Caja completa! Podés confirmarla 🎉
          </p>
        )}
        {remaining > 0 && (
          <p className="text-xs text-bruma-brown-light mt-2 text-center">
            Te quedan <strong>{remaining}</strong> {remaining === 1 ? 'lugar' : 'lugares'}
          </p>
        )}
      </div>

      {/* Catálogo de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
        {BOX_FILLABLE.map((product) => {
          const qty = getQty(product.id);
          const canAdd = remaining > 0;
          const finalPrice = getFinalPrice(product);

          return (
            <div
              key={product.id}
              className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-200 ${
                qty > 0
                  ? 'border-bruma-teal bg-bruma-blue/5'
                  : 'border-bruma-cream-mid bg-white hover:border-bruma-teal/50'
              }`}
            >
              {/* Imagen */}
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-bruma-cream-dark">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-bruma-brown text-sm leading-tight line-clamp-1">
                  {product.name}
                </p>
                <p className="text-bruma-blue font-bold text-sm mt-0.5">
                  {formatPrice(finalPrice)}
                  <span className="text-bruma-brown-muted font-normal text-xs ml-1">c/u</span>
                </p>
              </div>

              {/* Controles */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {qty > 0 ? (
                  <>
                    <button
                      onClick={() => onDecrease(product.id)}
                      className="w-7 h-7 rounded-lg bg-white border border-bruma-blue/20 flex items-center justify-center text-bruma-blue hover:bg-bruma-blue/10 transition-colors"
                    >
                      <Minus className="w-3 h-3" strokeWidth={2.5} />
                    </button>
                    <span className="w-6 text-center font-bold text-bruma-brown text-sm">{qty}</span>
                  </>
                ) : null}
                <button
                  onClick={() => canAdd && onAdd(product)}
                  disabled={!canAdd}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    canAdd
                      ? 'bg-bruma-blue text-white hover:bg-bruma-blue-dark shadow-sm'
                      : 'bg-bruma-cream-mid text-bruma-brown-muted cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-3 h-3" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Componente principal — CustomBoxBuilder
// ─────────────────────────────────────────────────────────────
export function CustomBoxBuilder() {
  const { addCustomBox, setIsCartOpen } = useCart();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedSize, setSelectedSize] = useState<BoxSize | null>(null);
  const [boxItems, setBoxItems] = useState<CustomBoxItem[]>([]);

  const usedSlots = boxItems.reduce((sum, i) => sum + i.quantity, 0);

  const getQty = (productId: number) =>
    boxItems.find(i => i.product.id === productId)?.quantity ?? 0;

  const handleAdd = (product: (typeof BOX_FILLABLE)[0]) => {
    setBoxItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleDecrease = (productId: number) => {
    setBoxItems(prev => {
      const existing = prev.find(i => i.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity === 1) return prev.filter(i => i.product.id !== productId);
      return prev.map(i =>
        i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const contentTotal = useMemo(
    () => boxItems.reduce((sum, i) => sum + getFinalPrice(i.product) * i.quantity, 0),
    [boxItems]
  );

  const boxTotal = selectedSize ? selectedSize.price + contentTotal : contentTotal;

  const handleConfirmBox = () => {
    if (!selectedSize || boxItems.length === 0) return;
    const box = {
      id: generateId(),
      size: selectedSize,
      items: boxItems,
      totalSlots: selectedSize.capacity,
      usedSlots,
      totalPrice: boxTotal,
    };
    addCustomBox(box);
    // Reset y abrir carrito
    setStep(1);
    setSelectedSize(null);
    setBoxItems([]);
    setIsCartOpen(true);
  };

  return (
    <section id="section-personalizada" className="animate-fade-in">
      {/* ── Header ───────────────────────────────── */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bruma-blue/10 text-bruma-blue text-sm font-medium mb-4">
          <Package className="w-4 h-4" strokeWidth={1.8} />
          Armá tu caja a medida
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-bruma-brown mb-3">
          Caja Personalizada
        </h2>
        <div className="divider-lila mb-4" />
        <p className="text-bruma-brown-light text-lg max-w-xl mx-auto">
          Elegí el tamaño de la caja y luego seleccioná los productos que querés incluir.
          Podés armar varias cajas distintas.
        </p>
      </div>

      {/* ── Wizard container ─────────────────────── */}
      <div className="max-w-3xl mx-auto">

        {/* Progress stepper */}
        <div className="flex items-center gap-3 mb-8">
          {[
            { num: 1, label: 'Tamaño' },
            { num: 2, label: 'Productos' },
          ].map(({ num, label }, idx) => (
            <div key={num} className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step > num
                    ? 'bg-bruma-blue text-white'
                    : step === num
                    ? 'bg-bruma-blue text-white shadow-glow-purple'
                    : 'bg-bruma-cream-mid text-bruma-brown-muted'
                }`}>
                  {step > num ? <Check className="w-4 h-4" strokeWidth={3} /> : num}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${
                  step === num ? 'text-bruma-blue' : 'text-bruma-brown-light'
                }`}>{label}</span>
              </div>
              {idx < 1 && (
                <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${
                  step > 1 ? 'bg-bruma-blue' : 'bg-bruma-cream-mid'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Card del wizard */}
        <div className="bg-white rounded-3xl border border-bruma-cream-mid shadow-card p-6 sm:p-8">

          {/* Paso 1 */}
          {step === 1 && (
            <SizeStep selected={selectedSize} onSelect={setSelectedSize} />
          )}

          {/* Paso 2 */}
          {step === 2 && selectedSize && (
            <FillStep
              size={selectedSize}
              items={boxItems}
              onAdd={handleAdd}
              onDecrease={handleDecrease}
              getQty={getQty}
              usedSlots={usedSlots}
            />
          )}

          {/* Resumen de precio */}
          {step === 2 && selectedSize && (
            <div className="mt-6 pt-4 border-t border-bruma-cream-mid space-y-1.5">
              <div className="flex justify-between text-sm text-bruma-brown-light">
                <span>Precio base caja ({selectedSize.label})</span>
                <span>{formatPrice(selectedSize.price)}</span>
              </div>
              <div className="flex justify-between text-sm text-bruma-brown-light">
                <span>Contenido ({usedSlots} productos)</span>
                <span>{formatPrice(contentTotal)}</span>
              </div>
              <div className="flex justify-between font-bold text-bruma-brown text-lg pt-1 border-t border-bruma-cream-mid">
                <span>Total esta caja</span>
                <span className="text-bruma-blue">{formatPrice(boxTotal)}</span>
              </div>
            </div>
          )}

          {/* Navegación */}
          <div className="flex items-center justify-between mt-8 gap-3">
            {step === 2 && (
              <button
                id="box-back-btn"
                onClick={() => { setStep(1); setBoxItems([]); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-bruma-blue/20 text-bruma-blue font-medium text-sm hover:bg-bruma-blue/5 transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                Volver
              </button>
            )}

            {step === 1 && (
              <button
                id="box-next-btn"
                onClick={() => selectedSize && setStep(2)}
                disabled={!selectedSize}
                className={`ml-auto flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  selectedSize
                    ? 'btn-primary'
                    : 'bg-bruma-cream-mid text-bruma-brown-muted cursor-not-allowed'
                }`}
              >
                Elegir productos
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </button>
            )}

            {step === 2 && (
              <button
                id="box-confirm-btn"
                onClick={handleConfirmBox}
                disabled={boxItems.length === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  boxItems.length > 0
                    ? 'btn-primary'
                    : 'bg-bruma-cream-mid text-bruma-brown-muted cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" strokeWidth={1.8} />
                Agregar caja al carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
