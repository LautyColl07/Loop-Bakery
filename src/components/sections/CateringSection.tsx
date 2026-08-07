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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bruma-blue/10 text-bruma-blue text-sm font-medium mb-4">
          <Users className="w-4 h-4" strokeWidth={1.8} />
          Eventos y celebraciones
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-bruma-brown mb-3">
          Cátering & Eventos
        </h2>
        <div className="divider-lila mb-4" />
        <p className="text-bruma-brown-light text-lg max-w-2xl mx-auto">
          Convertimos tu evento en una experiencia dulce e inolvidable. Desde cumpleaños íntimos
          hasta grandes celebraciones, tenemos el plan perfecto para vos.
        </p>
      </div>

      {/* ── Lo que incluye ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INCLUDED_FEATURES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-start gap-3 p-4 rounded-2xl bg-bruma-blue/5 border border-bruma-blue/20"
          >
            <div className="w-9 h-9 rounded-xl bg-bruma-blue flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="w-4 h-4 text-white" strokeWidth={1.8} />
            </div>
            <p className="text-sm text-bruma-brown font-medium leading-snug">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Cards de paquetes ─────────────────────── */}
      <div>
        <h3 className="font-display text-2xl font-semibold text-bruma-brown text-center mb-8">
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
                    ? 'border-bruma-blue shadow-glow-purple bg-gradient-to-b from-bruma-blue to-bruma-blue-dark'
                    : 'border-bruma-blue/20 bg-white shadow-card'
                }`}
              >
                {/* Ribbon "Más popular" */}
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 text-center py-1.5 bg-bruma-teal text-bruma-brown text-xs font-bold tracking-wider uppercase">
                    ⭐ Más popular
                  </div>
                )}

                <div className={`flex flex-col flex-1 p-6 ${isPopular ? 'pt-10' : ''}`}>
                  {/* Ícono */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    isPopular ? 'bg-white/20' : 'bg-bruma-blue/10'
                  }`}>
                    <Users className={`w-6 h-6 ${isPopular ? 'text-white' : 'text-bruma-blue'}`} strokeWidth={1.8} />
                  </div>

                  {/* Personas */}
                  <p className={`text-sm font-medium mb-1 ${isPopular ? 'text-bruma-teal-light' : 'text-bruma-brown-light'}`}>
                    Para
                  </p>
                  <h4 className={`font-display font-bold text-2xl mb-3 leading-tight ${
                    isPopular ? 'text-white' : 'text-bruma-brown'
                  }`}>
                    {option.people}
                  </h4>

                  {/* Descripción */}
                  <p className={`text-sm leading-relaxed flex-1 mb-6 ${
                    isPopular ? 'text-white/80' : 'text-bruma-brown-light'
                  }`}>
                    {option.description}
                  </p>

                  {/* Precio */}
                  <div className={`text-3xl font-bold mb-6 ${isPopular ? 'text-white' : 'text-bruma-blue'}`}>
                    {formatPrice(option.price)}
                  </div>

                  {/* Incluidos */}
                  <ul className="space-y-2 mb-6">
                    {['Mesa dulce artesanal', 'Torta incluida', 'Diseño personalizado'].map(feat => (
                      <li key={feat} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isPopular ? 'bg-bruma-teal' : 'bg-bruma-blue/10'
                        }`}>
                          <Check className={`w-2.5 h-2.5 ${isPopular ? 'text-bruma-brown' : 'text-bruma-blue'}`} strokeWidth={3} />
                        </div>
                        <span className={`text-xs ${isPopular ? 'text-white/80' : 'text-bruma-brown-light'}`}>
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
                        ? 'bg-white text-bruma-blue hover:bg-bruma-cream shadow-lg'
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
      <div className="bg-bruma-cream-dark rounded-3xl p-8 border border-bruma-cream-mid">
        <h3 className="font-display text-xl font-semibold text-bruma-brown mb-2 text-center">
          Servicios adicionales
        </h3>
        <p className="text-bruma-brown-light text-sm text-center mb-6">
          Complementá tu paquete con estos extras disponibles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ADD_ONS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-bruma-cream-mid shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-bruma-teal-light/50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-bruma-blue" strokeWidth={1.8} />
              </div>
              <span className="text-sm font-medium text-bruma-brown">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────── */}
      <div>
        <h3 className="font-display text-2xl font-semibold text-bruma-brown text-center mb-8">
          Preguntas frecuentes
        </h3>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map(faq => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-bruma-cream-mid overflow-hidden shadow-sm"
            >
              <button
                id={`faq-btn-${faq.id}`}
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none focus:ring-2 focus:ring-bruma-teal focus:ring-inset"
                aria-expanded={openFaq === faq.id}
              >
                <span className="font-medium text-bruma-brown text-sm pr-4">{faq.q}</span>
                {openFaq === faq.id
                  ? <ChevronUp className="w-4 h-4 text-bruma-blue flex-shrink-0" strokeWidth={2} />
                  : <ChevronDown className="w-4 h-4 text-bruma-brown-light flex-shrink-0" strokeWidth={2} />
                }
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === faq.id ? 'max-h-40' : 'max-h-0'}`}>
                <p className="px-5 pb-4 text-sm text-bruma-brown-light leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
