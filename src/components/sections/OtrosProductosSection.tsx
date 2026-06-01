import { Cake, MessageCircle } from 'lucide-react';
import { ProductCard } from '../products/ProductCard';
import { INDIVIDUAL_PRODUCTS } from '../../data/mockData';

export function OtrosProductosSection() {
  return (
    <section id="section-otros" className="animate-fade-in">
      {/* ── Header ────────────────────────────────── */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
          <Cake className="w-4 h-4" strokeWidth={1.8} />
          Productos individuales
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-bold text-purple-deep mb-3">
          Otros productos
        </h2>
        <div className="divider-lila mb-4" />
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Alfajores, porciones de torta, cupcakes y más delicias para disfrutar en cualquier momento.
        </p>
      </div>

      {/* ── Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDIVIDUAL_PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* ── CTA WhatsApp ──────────────────────────── */}
      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          ¿Querés pedir en cantidad o consultar disponibilidad?
        </p>
        <a
          id="otros-whatsapp-cta"
          href="https://wa.me/5491167905119?text=Hola%20Loop%20Bakery!%20Quiero%20consultar%20sobre%20sus%20productos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white font-semibold rounded-2xl hover:bg-[#1ebe5d] transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-[0_8px_24px_rgba(37,211,102,0.35)]"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={1.8} />
          Consultar por WhatsApp
        </a>
      </div>
    </section>
  );
}
