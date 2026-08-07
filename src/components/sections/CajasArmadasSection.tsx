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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bruma-blue/10 text-bruma-blue text-sm font-medium mb-4">
          <ShoppingBag className="w-4 h-4" strokeWidth={1.8} />
          Selecciones curadas
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-bold text-bruma-brown mb-3">
          Cajas de Cookies
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
      <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-bruma-blue/5 to-bruma-teal-light/50 border border-bruma-blue/20 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-14 h-14 rounded-2xl bg-bruma-blue flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-7 h-7 text-white" strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-display font-semibold text-bruma-brown text-lg">
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
