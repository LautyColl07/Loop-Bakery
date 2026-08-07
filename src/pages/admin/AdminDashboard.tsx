import { useState } from 'react';
import {
  Cake, LogOut, LayoutDashboard, Package, Menu, X,
  ShoppingBag, TrendingUp, AlertTriangle, Warehouse,
  BarChart3, ClipboardList,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCatalog } from '../../context/CatalogContext';
import { useOrders } from '../../context/OrdersContext';
import { CatalogManager } from '../../components/admin/CatalogManager';
import { StockManager } from '../../components/admin/StockManager';
import { SalesCharts } from '../../components/admin/SalesCharts';
import { PendingOrders } from '../../components/admin/PendingOrders';
import { formatPrice } from '../../types';

type AdminSection = 'overview' | 'catalog' | 'stock' | 'stats' | 'orders';

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { products } = useCatalog();
  const { pendingOrders, completedOrders } = useOrders();
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

  // Ingresos esta semana
  const now = new Date();
  const weekStart = new Date(now);
  const day = weekStart.getDay();
  weekStart.setDate(weekStart.getDate() - day + (day === 0 ? -6 : 1));
  weekStart.setHours(0, 0, 0, 0);

  const weekOrders = completedOrders.filter(o => {
    const d = new Date(o.completedAt || o.createdAt);
    return d >= weekStart;
  });
  const weekRevenue = weekOrders.reduce((s, o) => s + o.total, 0);

  const NAV_ITEMS: { id: AdminSection; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
    { id: 'orders', label: 'Pedidos', icon: ClipboardList, badge: pendingOrders.length },
    { id: 'catalog', label: 'Catálogo', icon: Package },
    { id: 'stock', label: 'Stock', icon: Warehouse },
    { id: 'stats', label: 'Estadísticas', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-bruma-cream flex flex-col">

      {/* ── Top Bar ───────────────────────────────────────── */}
      <header className="bg-gradient-to-r from-bruma-brown to-bruma-blue shadow-lg sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <Cake className="w-4 h-4 text-white" strokeWidth={1.8} />
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-white text-sm leading-none">Bruma Cafe</p>
              <p className="text-bruma-cream text-[10px] tracking-wide">Panel Admin</p>
            </div>
          </div>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                id={`admin-nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-white text-bruma-blue'
                    : 'text-white/70 hover:text-white hover:bg-white/15'
                }`}
              >
                <item.icon className="w-4 h-4" strokeWidth={1.8} />
                {item.label}
                {/* Badge de pendientes */}
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 text-bruma-brown text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>

          {/* User + logout */}
          <div className="flex items-center gap-3">
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
              className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-all"
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
          <div className="lg:hidden border-t border-white/15 px-4 py-3 grid grid-cols-3 gap-2">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className={`relative flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-white text-bruma-blue'
                    : 'text-white/70 hover:text-white hover:bg-white/15'
                }`}
              >
                <item.icon className="w-4 h-4" strokeWidth={1.8} />
                {item.label}
                {item.badge && item.badge > 0 ? (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 text-bruma-brown text-[8px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
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
              <h1 className="font-display text-3xl font-bold text-bruma-brown">
                Bienvenida, {user?.displayName?.split(' ')[0]} 👋
              </h1>
              <p className="text-bruma-brown-light mt-1">
                Este es el panel de administración de Bruma Cafe.
              </p>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <MetricCard
                icon={Package}
                label="Total productos"
                value={String(totalProducts)}
                color="purple"
              />
              <MetricCard
                icon={TrendingUp}
                label="Ingresos semana"
                value={formatPrice(weekRevenue)}
                color="blue"
              />
              <MetricCard
                icon={ClipboardList}
                label="Pedidos pendientes"
                value={String(pendingOrders.length)}
                color="amber"
                alert={pendingOrders.length > 0}
              />
              <MetricCard
                icon={ShoppingBag}
                label="Ventas semana"
                value={String(weekOrders.length)}
                color="purple"
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
              <h2 className="font-display text-lg font-semibold text-bruma-brown mb-4">Acciones rápidas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'orders' as AdminSection, icon: ClipboardList, title: 'Ver pedidos', desc: 'Gestionar pedidos pendientes', bg: 'bg-amber-50', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
                  { id: 'catalog' as AdminSection, icon: Package, title: 'Gestionar catálogo', desc: 'Ver, agregar y editar', bg: 'bg-white', iconBg: 'bg-bruma-blue/10', iconColor: 'text-bruma-blue' },
                  { id: 'stock' as AdminSection, icon: Warehouse, title: 'Control de stock', desc: 'Actualizar cantidades', bg: 'bg-white', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
                  { id: 'stats' as AdminSection, icon: BarChart3, title: 'Estadísticas', desc: 'Ver gráficos de ventas', bg: 'bg-white', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
                ].map(action => (
                  <button
                    key={action.id}
                    id={`overview-go-${action.id}`}
                    onClick={() => setActiveSection(action.id)}
                    className={`flex items-center gap-4 p-5 ${action.bg} rounded-2xl border border-bruma-cream-mid shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 text-left`}
                  >
                    <div className={`w-12 h-12 rounded-2xl ${action.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <action.icon className={`w-6 h-6 ${action.iconColor}`} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="font-semibold text-bruma-brown">{action.title}</p>
                      <p className="text-bruma-brown-light text-sm">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Link al sitio */}
            <a
              id="overview-go-site"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-bruma-cream-mid shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium text-bruma-brown"
            >
              <ShoppingBag className="w-5 h-5 text-bruma-blue" strokeWidth={1.8} />
              Ver sitio de clientes ↗
            </a>

            {/* Lista rápida de stock bajo */}
            {(lowStock > 0 || outOfStock > 0) && (
              <div>
                <h2 className="font-display text-lg font-semibold text-bruma-brown mb-4 flex items-center gap-2">
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
                        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-bruma-cream-dark">
                          {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                        </div>
                        <p className="flex-1 font-medium text-bruma-brown text-sm truncate">{p.name}</p>
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

        {/* ── Pedidos ─────────────────────────────────── */}
        {activeSection === 'orders' && (
          <div className="animate-fade-in">
            <PendingOrders />
          </div>
        )}

        {/* ── Catálogo ──────────────────────────────────── */}
        {activeSection === 'catalog' && (
          <div className="animate-fade-in">
            <CatalogManager />
          </div>
        )}

        {/* ── Stock ─────────────────────────────────────── */}
        {activeSection === 'stock' && (
          <div className="animate-fade-in">
            <StockManager />
          </div>
        )}

        {/* ── Estadísticas ──────────────────────────────── */}
        {activeSection === 'stats' && (
          <div className="animate-fade-in">
            <SalesCharts />
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Metric Card ─────────────────────────────────────────────

const COLOR_MAP = {
  purple: { bg: 'bg-bruma-blue/10', icon: 'text-bruma-blue', val: 'text-bruma-blue' },
  blue:   { bg: 'bg-blue-100',    icon: 'text-blue-600',    val: 'text-blue-700' },
  amber:  { bg: 'bg-amber-100',   icon: 'text-amber-600',   val: 'text-amber-700' },
  red:    { bg: 'bg-red-100',     icon: 'text-red-500',     val: 'text-red-600' },
};

function MetricCard({
  icon: Icon, label, value, color = 'purple', alert = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color?: keyof typeof COLOR_MAP;
  alert?: boolean;
}) {
  const c = COLOR_MAP[color];
  return (
    <div className={`bg-white rounded-2xl border shadow-card p-5 ${alert ? 'border-amber-200' : 'border-bruma-cream-mid'}`}>
      <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${c.icon}`} strokeWidth={1.8} />
      </div>
      <p className={`font-bold text-2xl ${c.val} leading-none`}>{value}</p>
      <p className="text-bruma-brown-light text-xs mt-1">{label}</p>
    </div>
  );
}
