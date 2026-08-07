import { Navbar, Footer } from '../components/layout';
import { CajasArmadasSection } from '../components/sections/CajasArmadasSection';
import { OtrosProductosSection } from '../components/sections/OtrosProductosSection';
import { CateringSection } from '../components/sections/CateringSection';
import { CustomBoxBuilder } from '../components/sections/CustomBoxBuilder';
import { CartDrawer } from '../components/cart/CartDrawer';
import { CheckoutModal } from '../components/cart/CheckoutModal';
import { useApp } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { Box, ShoppingBag, Cake, Users, Sparkles, MessageCircle } from 'lucide-react';

export function HomePage() {
  const { activeTab, setActiveTab } = useApp();


  return (
    <>
      <Navbar />
      <CartDrawer />
      <CheckoutModal />

      <main id="main-content" className="min-h-screen">

        {/* ── Hero Section ─────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-bruma-brown via-bruma-blue-dark to-bruma-blue py-20 sm:py-28 px-4">
          {/* Patrón de puntos decorativo */}
          <div className="absolute inset-0 pattern-dots opacity-30" />

          {/* Orbes de luz */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-bruma-teal-light/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-bruma-teal/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-bruma-cream-dark text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Pedidos disponibles por WhatsApp
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
              Dulces momentos<br />
              <span className="bg-gradient-to-r from-bruma-teal to-bruma-cream bg-clip-text text-transparent">
                hechos con amor
              </span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Cajas de cookies, rolls, budines y más especialidades. Personalizá tu pedido o elegí
              entre nuestras selecciones curadas para cada ocasión.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                id="hero-cta-boxes"
                onClick={() => setActiveTab('armadas')}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-bruma-blue font-semibold rounded-2xl
                  hover:bg-bruma-cream transition-all duration-300 hover:-translate-y-0.5
                  shadow-lg hover:shadow-[0_12px_36px_rgba(91,130,150,0.4)]"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.8} />
                Ver cajas
              </button>
              <a
                id="hero-cta-whatsapp"
                href="https://wa.me/5491167905119"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white font-semibold rounded-2xl
                  hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.8} />
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── Quick Nav Cards ──────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {([
              { id: 'personalizada', label: 'Caja a medida',    icon: Box,         desc: 'Armá la tuya' },
              { id: 'armadas',       label: 'Cajas armadas',    icon: ShoppingBag, desc: 'Listas para llevar' },
              { id: 'otros',         label: 'Especialidades',   icon: Cake,        desc: 'Para disfrutar' },
              { id: 'catering',      label: 'Eventos',          icon: Users,       desc: 'Catering dulce' },
            ] as const).map(({ id, label, icon: Icon, desc }) => (
              <button
                key={id}
                id={`quick-nav-${id}`}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300
                  hover:-translate-y-1 hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-bruma-teal
                  ${activeTab === id
                    ? 'border-bruma-blue bg-bruma-blue text-white shadow-glow-purple'
                    : 'border-bruma-cream-mid bg-white text-bruma-brown hover:border-bruma-blue/30'
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activeTab === id ? 'bg-white/20' : 'bg-bruma-blue/10'
                }`}>
                  <Icon className={`w-5 h-5 ${activeTab === id ? 'text-white' : 'text-bruma-blue'}`} strokeWidth={1.8} />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm leading-tight">{label}</p>
                  <p className={`text-xs mt-0.5 ${activeTab === id ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Contenido de las secciones ───────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Caja personalizada */}
          {activeTab === 'personalizada' && <CustomBoxBuilder />}

          {/* Cajas ya armadas */}
          {activeTab === 'armadas' && <CajasArmadasSection />}

          {/* Otros productos */}
          {activeTab === 'otros' && <OtrosProductosSection />}

          {/* Catering */}
          {activeTab === 'catering' && <CateringSection />}
        </div>

        {/* ── Floating Cart Button (mobile, cuando hay ítems) ── */}
        <FloatingCartButton />
      </main>

      <Footer />
    </>
  );
}

/** Botón flotante de carrito para mobile cuando hay productos */
function FloatingCartButton() {
  const { cartCount, cartTotal, setIsCartOpen } = useCart();

  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 md:hidden animate-slide-up">
      <button
        id="floating-cart-btn"
        onClick={() => setIsCartOpen(true)}
        className="flex items-center gap-3 pl-4 pr-5 py-3.5 bg-bruma-blue text-white rounded-full shadow-glow-purple
          hover:bg-bruma-blue-dark transition-all duration-300 hover:scale-105"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5" strokeWidth={1.8} />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-bruma-teal text-bruma-brown text-[10px] font-bold rounded-full flex items-center justify-center">
            {cartCount > 9 ? '9+' : cartCount}
          </span>
        </div>
        <span className="font-semibold text-sm">
          Ver carrito · {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(cartTotal)}
        </span>
      </button>
    </div>
  );
}
