import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShoppingBag, Coffee, Users, Menu, X, ShoppingCart, LogIn } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';
import { BrumaLogo } from '../BrumaLogo';
import type { TabType, NavItem } from '../../types';

const NAV_ITEMS: NavItem[] = [
  {
    id: 'personalizada',
    label: 'Armá tu caja',
    icon: 'Cookie',
    description: 'Armá tu caja a medida',
  },
  {
    id: 'armadas',
    label: 'Cajas de Cookies',
    icon: 'ShoppingBag',
    description: 'Selecciones curadas',
  },
  {
    id: 'otros',
    label: 'Cookies & Especialidades',
    icon: 'Coffee',
    description: 'Cookies, brownies y más',
  },
  {
    id: 'catering',
    label: 'Cátering & Eventos',
    icon: 'Users',
    description: 'Para eventos y celebraciones',
  },
];

const IconMap: Record<string, React.ElementType> = {
  Cookie,
  ShoppingBag,
  Coffee,
  Users,
};

export function Navbar() {
  const { activeTab, setActiveTab, isMenuOpen, setIsMenuOpen } = useApp();
  const { cartCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTabClick = (id: TabType) => {
    setActiveTab(id);
    setIsMenuOpen(false);
    const main = document.getElementById('main-content');
    if (main) main.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      id="navbar"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-[0_4px_30px_rgba(64,46,35,0.15)]'
          : 'shadow-none'
      }`}
    >
      {/* ── Top bar ─────────────────────────────────── */}
      <div className="bg-gradient-to-r from-bruma-brown via-bruma-blue-dark to-bruma-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* Logo */}
            <a
              href="/"
              id="navbar-logo"
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="Bruma Cafe — Inicio"
            >
              <BrumaLogo size={44} variant="full" />
            </a>

            {/* Acciones desktop */}
            <div className="hidden md:flex items-center gap-3">
              {/* Carrito */}
              <button
                id="navbar-cart-btn"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Carrito — ${cartCount} producto${cartCount !== 1 ? 's' : ''}`}
                className="relative p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bruma-teal"
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-bruma-teal text-bruma-brown text-xs font-bold rounded-full flex items-center justify-center animate-fade-in">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* Admin login */}
              <Link
                id="navbar-admin-btn"
                to="/admin/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bruma-teal"
              >
                <LogIn className="w-4 h-4" strokeWidth={1.8} />
                <span>Acceso admin</span>
              </Link>
            </div>

            {/* Hamburguesa mobile */}
            <div className="flex md:hidden items-center gap-2">
              <button
                id="navbar-cart-btn-mobile"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Carrito — ${cartCount} productos`}
                className="relative p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-bruma-teal text-bruma-brown text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              <button
                id="navbar-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMenuOpen}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bruma-teal"
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
        className="hidden md:block bg-bruma-blue/95 backdrop-blur-sm border-t border-white/10"
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
                        isActive ? 'text-bruma-blue' : 'text-white/70 group-hover:text-white'
                      } ${isActive ? '' : 'group-hover:scale-110'}`}
                      strokeWidth={1.8}
                    />
                    <span className="text-sm">{item.label}</span>

                    {isActive && (
                      <span className="ml-1 w-1.5 h-1.5 rounded-full bg-bruma-teal flex-shrink-0" />
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
        <div className="bg-bruma-brown/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 space-y-1">
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
                    ? 'bg-white text-bruma-blue shadow-md'
                    : 'text-white/80 hover:bg-white/15 hover:text-white'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-bruma-blue' : ''}`}
                  strokeWidth={1.8}
                />
                <div className="min-w-0">
                  <p className="font-medium text-sm leading-tight">{item.label}</p>
                  <p className={`text-xs mt-0.5 ${isActive ? 'text-bruma-blue/70' : 'text-white/50'}`}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Admin link mobile */}
          <div className="pt-2 mt-2 border-t border-white/10">
            <Link
              id="navbar-admin-btn-mobile"
              to="/admin/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/15 transition-all duration-200"
            >
              <LogIn className="w-5 h-5 flex-shrink-0" strokeWidth={1.8} />
              <span className="text-sm font-medium">Acceso administrador</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
