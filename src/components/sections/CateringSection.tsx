import { useState } from 'react';
import {
  Users, Check, MessageCircle, ChevronDown, ChevronUp,
  Music, Camera, Cake, Sparkles, Clock, Star
} from 'lucide-react';
import { CATERING_OPTIONS } from '../../data/mockData';
import { formatPrice } from '../../types';

const INCLUDED_FEATURES = [
  { icon: Cake,     label: 'Torta personalizada de nivel según el plan' },
  { icon: Sparkles, label: 'Decoración y armado de mesa dulce' },
  { icon: Clock,    label: 'Coordinación y entrega con horario pactado' },
  { icon: Star,     label: 'Degustación previa incluida' },
];

const ADD_ONS = [
  { icon: Music,   label: 'Ambientación musical' },
  { icon: Camera,  label: 'Sesión de fotos del evento' },
  { icon: Users,   label: 'Personal de servicio' },
];

export function CateringSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      q: '¿Con cuánta anticipación debo hacer el pedido?',
      a: 'Recomendamos reservar con al menos 7 días de anticipación para eventos medianos. Para eventos de más de 40 personas, solicitamos 15 días de anticipación para garantizar la calidad.',
    },
    {
      id: 2,
      q: '¿Hacen entregas a domicilio?',
      a: 'Sí, realizamos entregas dentro de CABA y GBA. El costo de envío se cotiza según la zona y se coordina directamente por WhatsApp.',
    },
    {
      id: 3,
      q: '¿Puedo personalizar el menú de catering?',
      a: 'Por supuesto. Todos nuestros paquetes son adaptables. Podés elegir sabores, decoración temática y agregar productos adicionales.',
    },
  ];

  return (
    <section id="section-catering" className="animate-fade-in space-y-16">

      {/* ── Header ────────────────────────────────── */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
          <Users className="w-4 h-4" strokeWidth={1.8} />
          Eventos y celebraciones
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-purple-deep mb-3">
          Servicio de fiesta y cáterin
        </h2>
        <div className="divider-lila mb-4" />
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Convertimos tu evento en una experiencia dulce e inolvidable. Desde cumpleaños íntimos
          hasta grandes celebraciones, tenemos el plan perfecto para vos.
        </p>
      </div>

      {/* ── Lo que incluye ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INCLUDED_FEATURES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-start gap-3 p-4 rounded-2xl bg-primary-50 border border-primary-100"
          >
            <div className="w-9 h-9 rounded-xl bg-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="w-4 h-4 text-white" strokeWidth={1.8} />
            </div>
            <p className="text-sm text-purple-deep font-medium leading-snug">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Cards de paquetes ─────────────────────── */}
      <div>
        <h3 className="font-display text-2xl font-semibold text-purple-deep text-center mb-8">
          Elegí tu paquete
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {CATERING_OPTIONS.map((option, index) => {
            const isPopular = index === 1; // El segundo es el más popular
            return (
              <article
                key={option.id}
                id={`catering-card-${option.id}`}
                className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
                  isPopular
                    ? 'border-primary-700 shadow-glow-purple bg-gradient-to-b from-primary-700 to-primary-800'
                    : 'border-primary-100 bg-white shadow-card'
                }`}
              >
                {/* Ribbon "Más popular" */}
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 text-center py-1.5 bg-lila-DEFAULT text-purple-deep text-xs font-bold tracking-wider uppercase">
                    ⭐ Más popular
                  </div>
                )}

                <div className={`flex flex-col flex-1 p-6 ${isPopular ? 'pt-10' : ''}`}>
                  {/* Ícono */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    isPopular ? 'bg-white/20' : 'bg-primary-100'
                  }`}>
                    <Users className={`w-6 h-6 ${isPopular ? 'text-white' : 'text-primary-700'}`} strokeWidth={1.8} />
                  </div>

                  {/* Personas */}
                  <p className={`text-sm font-medium mb-1 ${isPopular ? 'text-lila-light' : 'text-muted-foreground'}`}>
                    Para
                  </p>
                  <h4 className={`font-display font-bold text-2xl mb-3 leading-tight ${
                    isPopular ? 'text-white' : 'text-purple-deep'
                  }`}>
                    {option.people}
                  </h4>

                  {/* Descripción */}
                  <p className={`text-sm leading-relaxed flex-1 mb-6 ${
                    isPopular ? 'text-white/80' : 'text-muted-foreground'
                  }`}>
                    {option.description}
                  </p>

                  {/* Precio */}
                  <div className={`text-3xl font-bold mb-6 ${isPopular ? 'text-white' : 'text-primary-700'}`}>
                    {formatPrice(option.price)}
                  </div>

                  {/* Incluidos */}
                  <ul className="space-y-2 mb-6">
                    {['Mesa dulce artesanal', 'Torta incluida', 'Diseño personalizado'].map(feat => (
                      <li key={feat} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isPopular ? 'bg-lila-DEFAULT' : 'bg-primary-100'
                        }`}>
                          <Check className={`w-2.5 h-2.5 ${isPopular ? 'text-purple-deep' : 'text-primary-700'}`} strokeWidth={3} />
                        </div>
                        <span className={`text-xs ${isPopular ? 'text-white/80' : 'text-muted-foreground'}`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    id={`catering-cta-${option.id}`}
                    href={`https://wa.me/5491167905119?text=Hola!%20Me%20interesa%20el%20servicio%20de%20catering%20para%20${encodeURIComponent(option.people)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                      isPopular
                        ? 'bg-white text-primary-700 hover:bg-cream-100 shadow-lg'
                        : 'btn-primary'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.8} />
                    Solicitar presupuesto
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── Add-ons ───────────────────────────────── */}
      <div className="bg-cream-200 rounded-3xl p-8 border border-primary-100">
        <h3 className="font-display text-xl font-semibold text-purple-deep mb-2 text-center">
          Servicios adicionales
        </h3>
        <p className="text-muted-foreground text-sm text-center mb-6">
          Complementá tu paquete con estos extras disponibles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ADD_ONS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-primary-100 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-lila-light flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary-700" strokeWidth={1.8} />
              </div>
              <span className="text-sm font-medium text-purple-deep">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────── */}
      <div>
        <h3 className="font-display text-2xl font-semibold text-purple-deep text-center mb-8">
          Preguntas frecuentes
        </h3>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map(faq => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-primary-100 overflow-hidden shadow-sm"
            >
              <button
                id={`faq-btn-${faq.id}`}
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-inset"
                aria-expanded={openFaq === faq.id}
              >
                <span className="font-medium text-purple-deep text-sm pr-4">{faq.q}</span>
                {openFaq === faq.id
                  ? <ChevronUp className="w-4 h-4 text-primary-700 flex-shrink-0" strokeWidth={2} />
                  : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={2} />
                }
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === faq.id ? 'max-h-40' : 'max-h-0'}`}>
                <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
