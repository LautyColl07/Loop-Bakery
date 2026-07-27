import { useState } from 'react';
import {
  Cake, LogOut, LayoutDashboard, Package, Menu, X,
  ShoppingBag, TrendingUp, AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCatalog } from '../../context/CatalogContext';
import { CatalogManager } from '../../components/admin/CatalogManager';
import { formatPrice } from '../../types';

type AdminSection = 'overview' | 'catalog';

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { products } = useCatalog();
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  // ── Métricas de resumen ──────────────────────────────────
  const totalProducts = products.length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 3).length;
  const avgPrice = products.length > 0
    ? Math.round(products.reduce((s, p) => s + p.price, 0) / products.length)
    : 0;

  const NAV_ITEMS: { id: AdminSection; label: string; icon: typeof Package }[] = [
    { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
    { id: 'catalog', label: 'Catálogo', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">

      {/* ── Top Bar ───────────────────────────────────────── */}
      <header className="bg-gradient-to-r from-purple-deep to-primary-700 shadow-lg sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <Cake className="w-4 h-4 text-white" strokeWidth={1.8} />
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-white text-sm leading-none">Loop Bakery</p>
              <p className="text-lila-light text-[10px] tracking-wide">Panel Admin</p>
            </div>
          </div>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                id={`admin-nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-white text-primary-700'
                    : 'text-white/70 hover:text-white hover:bg-white/15'
                }`}
              >
                <item.icon className="w-4 h-4" strokeWidth={1.8} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* User + logout */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? 'Admin'}
                className="w-8 h-8 rounded-full border-2 border-white/30 hidden sm:block"
              />
            ) : null}
            <span className="text-white/80 text-sm hidden sm:block truncate max-w-[160px]">
              {user?.displayName ?? user?.email}
            </span>

            {/* Mobile menu toggle */}
            <button
              id="admin-mobile-menu"
              onClick={() => setMobileMenuOpen(v => !v)}
              className="md:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={2} /> : <Menu className="w-5 h-5" strokeWidth={2} />}
            </button>

            {/* Logout */}
            <button
              id="admin-logout"
              onClick={handleSignOut}
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all text-sm font-medium"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.8} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/15 px-4 py-3 flex gap-2">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className={`flex items-center gap-2 flex-1 justify-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-white text-primary-700'
                    : 'text-white/70 hover:text-white hover:bg-white/15'
                }`}
              >
                <item.icon className="w-4 h-4" strokeWidth={1.8} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Contenido principal ───────────────────────────── */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-8">

        {/* ── Resumen / Overview ────────────────────────── */}
        {activeSection === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="font-display text-3xl font-bold text-purple-deep">
                Bienvenida, {user?.displayName?.split(' ')[0]} 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Este es el panel de administración de Loop Bakery.
              </p>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                icon={Package}
                label="Total productos"
                value={String(totalProducts)}
                color="purple"
              />
              <MetricCard
                icon={TrendingUp}
                label="Precio promedio"
                value={formatPrice(avgPrice)}
                color="blue"
              />
              <MetricCard
                icon={AlertTriangle}
                label="Stock bajo (≤3)"
                value={String(lowStock)}
                color="amber"
                alert={lowStock > 0}
              />
              <MetricCard
                icon={ShoppingBag}
                label="Sin stock"
                value={String(outOfStock)}
                color="red"
                alert={outOfStock > 0}
              />
            </div>

            {/* Acciones rápidas */}
            <div>
              <h2 className="font-display text-lg font-semibold text-purple-deep mb-4">Acciones rápidas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  id="overview-go-catalog"
                  onClick={() => setActiveSection('catalog')}
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-primary-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 text-left"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-primary-700" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-semibold text-purple-deep">Gestionar catálogo</p>
                    <p className="text-muted-foreground text-sm">Ver, agregar y editar productos</p>
                  </div>
                </button>
                <a
                  id="overview-go-site"
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-primary-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-lila-light flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="w-6 h-6 text-primary-700" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-semibold text-purple-deep">Ver sitio de clientes</p>
                    <p className="text-muted-foreground text-sm">Abre la tienda en una nueva pestaña</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Lista rápida de stock bajo */}
            {(lowStock > 0 || outOfStock > 0) && (
              <div>
                <h2 className="font-display text-lg font-semibold text-purple-deep mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" strokeWidth={1.8} />
                  Productos a revisar
                </h2>
                <div className="bg-white rounded-2xl border border-amber-200 shadow-card overflow-hidden">
                  {products
                    .filter(p => p.stock <= 3)
                    .sort((a, b) => a.stock - b.stock)
                    .slice(0, 6)
                    .map(p => (
                      <div key={p.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0">
                        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-cream-200">
                          {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                        </div>
                        <p className="flex-1 font-medium text-purple-deep text-sm truncate">{p.name}</p>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          p.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {p.stock === 0 ? 'Sin stock' : `${p.stock} u.`}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Catálogo ──────────────────────────────────── */}
        {activeSection === 'catalog' && (
          <div className="animate-fade-in">
            <CatalogManager />
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Metric Card ─────────────────────────────────────────────

const COLOR_MAP = {
  purple: { bg: 'bg-primary-100', icon: 'text-primary-700', val: 'text-primary-700' },
  blue:   { bg: 'bg-blue-100',    icon: 'text-blue-600',    val: 'text-blue-700' },
  amber:  { bg: 'bg-amber-100',   icon: 'text-amber-600',   val: 'text-amber-700' },
  red:    { bg: 'bg-red-100',     icon: 'text-red-500',     val: 'text-red-600' },
};

function MetricCard({
  icon: Icon, label, value, color = 'purple', alert = false,
}: {
  icon: typeof Package;
  label: string;
  value: string;
  color?: keyof typeof COLOR_MAP;
  alert?: boolean;
}) {
  const c = COLOR_MAP[color];
  return (
    <div className={`bg-white rounded-2xl border shadow-card p-5 ${alert ? 'border-amber-200' : 'border-primary-100'}`}>
      <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${c.icon}`} strokeWidth={1.8} />
      </div>
      <p className={`font-bold text-2xl ${c.val} leading-none`}>{value}</p>
      <p className="text-muted-foreground text-xs mt-1">{label}</p>
    </div>
  );
}
