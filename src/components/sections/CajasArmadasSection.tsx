import { ShoppingBag, Sparkles } from 'lucide-react';
import { ProductCard } from '../products/ProductCard';
import { PREBUILT_BOXES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export function CajasArmadasSection() {
  const { setActiveTab } = useApp();
  return (
    <section id="section-armadas" className="animate-fade-in">
      {/* ── Header de sección ─────────────────────── */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
          <ShoppingBag className="w-4 h-4" strokeWidth={1.8} />
          Selecciones curadas
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-bold text-purple-deep mb-3">
          Cajas ya armadas
        </h2>
        <div className="divider-lila mb-4" />
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Nuestros pasteleros seleccionaron las mejores combinaciones para cada ocasión.
          Listas para regalar o disfrutar.
        </p>
      </div>

      {/* ── Grid de productos ─────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PREBUILT_BOXES.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* ── Banner inferior ───────────────────────── */}
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-primary-50 to-lila-light border border-primary-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-14 h-14 rounded-2xl bg-primary-700 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-7 h-7 text-white" strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-display font-semibold text-purple-deep text-lg">
            ¿No encontrás lo que buscás?
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Armá tu propia caja seleccionando los productos que más te gusten.
          </p>
        </div>
        <button
          id="banner-custom-box-btn"
          onClick={() => setActiveTab('personalizada')}
          className="btn-primary ml-auto whitespace-nowrap"
        >
          Personalizar caja
        </button>
      </div>
    </section>
  );
}
