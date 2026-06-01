import { useState, useEffect } from 'react';
import { Box, ShoppingBag, Cake, Users, Menu, X, ShoppingCart, LogIn } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';
import type { TabType, NavItem } from '../../types';

const NAV_ITEMS: NavItem[] = [
  {
    id: 'personalizada',
    label: 'Elegir caja personalizada',
    icon: 'Box',
    description: 'Armá tu caja a medida',
  },
  {
    id: 'armadas',
    label: 'Cajas ya armadas',
    icon: 'ShoppingBag',
    description: 'Selecciones curadas',
  },
  {
    id: 'otros',
    label: 'Otros productos',
    icon: 'Cake',
    description: 'Alfajores, porciones y más',
  },
  {
    id: 'catering',
    label: 'Servicio de fiesta y cáterin',
    icon: 'Users',
    description: 'Para eventos y celebraciones',
  },
];

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Box,
  ShoppingBag,
  Cake,
  Users,
};

interface NavbarProps {
  onAdminClick?: () => void;
}

export function Navbar({ onAdminClick }: NavbarProps) {
  const { activeTab, setActiveTab, isMenuOpen, setIsMenuOpen } = useApp();
  const { cartCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  // Sombra al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTabClick = (id: TabType) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    // Scroll suave al contenido principal
    const main = document.getElementById('main-content');
    if (main) main.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      id="navbar"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-[0_4px_30px_rgba(45,27,46,0.2)]'
          : 'shadow-none'
      }`}
    >
      {/* ── Top bar ─────────────────────────────────── */}
      <div className="bg-gradient-to-r from-purple-deep via-primary-700 to-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* Logo */}
            <a
              href="/"
              id="navbar-logo"
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Loop Bakery — Inicio"
            >
              {/* Ícono circular con gradiente */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-lila-DEFAULT to-white/90 flex items-center justify-center shadow-glow-lila transition-transform duration-300 group-hover:scale-110">
                  <Cake className="w-5 h-5 sm:w-6 sm:h-6 text-primary-800" strokeWidth={1.8} />
                </div>
                {/* Anillo decorativo */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse" />
              </div>

              <div className="leading-none">
                <span className="block font-display font-bold text-white text-xl sm:text-2xl tracking-wide">
                  Loop Bakery
                </span>
                <span className="block text-lila-light text-xs sm:text-sm font-light tracking-widest uppercase">
                  Pastelería Artesanal
                </span>
              </div>
            </a>

            {/* Acciones desktop */}
            <div className="hidden md:flex items-center gap-3">
              {/* Carrito */}
              <button
                id="navbar-cart-btn"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Carrito — ${cartCount} producto${cartCount !== 1 ? 's' : ''}`}
                className="relative p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lila-DEFAULT"
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-lila-DEFAULT text-purple-deep text-xs font-bold rounded-full flex items-center justify-center animate-fade-in">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* Admin login */}
              <button
                id="navbar-admin-btn"
                onClick={onAdminClick}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lila-DEFAULT"
              >
                <LogIn className="w-4 h-4" strokeWidth={1.8} />
                <span>Acceso admin</span>
              </button>
            </div>

            {/* Hamburguesa mobile */}
            <div className="flex md:hidden items-center gap-2">
              {/* Carrito mobile */}
              <button
                id="navbar-cart-btn-mobile"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Carrito — ${cartCount} productos`}
                className="relative p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-lila-DEFAULT text-purple-deep text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              <button
                id="navbar-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMenuOpen}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lila-DEFAULT"
              >
                {isMenuOpen
                  ? <X className="w-5 h-5" strokeWidth={2} />
                  : <Menu className="w-5 h-5" strokeWidth={2} />
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation tabs bar (desktop) ───────────── */}
      <nav
        id="navbar-tabs"
        aria-label="Navegación principal"
        className="hidden md:block bg-primary-700/95 backdrop-blur-sm border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-none" role="list">
            {NAV_ITEMS.map((item) => {
              const Icon = IconMap[item.icon];
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    id={`nav-tab-${item.id}`}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTabClick(item.id)}
                    className={`nav-tab group ${isActive ? 'nav-tab-active' : 'nav-tab-inactive'}`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                        isActive ? 'text-primary-700' : 'text-white/70 group-hover:text-white'
                      } ${isActive ? '' : 'group-hover:scale-110'}`}
                      strokeWidth={1.8}
                    />
                    <span className="text-sm">{item.label}</span>

                    {/* Indicador activo */}
                    {isActive && (
                      <span className="ml-1 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* ── Mobile menu dropdown ─────────────────────── */}
      <div
        id="navbar-mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="bg-purple-dark/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = IconMap[item.icon];
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-mobile-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-primary-700 shadow-md'
                    : 'text-white/80 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-600' : ''}`}
                  strokeWidth={1.8}
                />
                <div className="min-w-0">
                  <p className="font-medium text-sm leading-tight">{item.label}</p>
                  <p className={`text-xs mt-0.5 ${isActive ? 'text-primary-500' : 'text-white/50'}`}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Admin link mobile */}
          <div className="pt-2 mt-2 border-t border-white/10">
            <button
              id="navbar-admin-btn-mobile"
              onClick={onAdminClick}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200"
            >
              <LogIn className="w-5 h-5 flex-shrink-0" strokeWidth={1.8} />
              <span className="text-sm font-medium">Acceso administrador</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
