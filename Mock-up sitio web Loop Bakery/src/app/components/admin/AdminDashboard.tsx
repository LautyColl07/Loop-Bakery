import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router';
import { LayoutDashboard, Package, ShoppingCart, BarChart3, Menu, X, ArrowLeft } from 'lucide-react';
import { Dashboard } from './Dashboard';
import { CatalogManagement } from './CatalogManagement';
import { SalesStats } from './SalesStats';
import { StockManagement } from './StockManagement';

export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Panel de Control', icon: LayoutDashboard, exact: true },
    { path: '/admin/catalog', label: 'Catálogo', icon: Package },
    { path: '/admin/sales', label: 'Ventas', icon: ShoppingCart },
    { path: '/admin/stock', label: 'Stock', icon: BarChart3 },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          {sidebarOpen && <h2 className="text-sidebar-foreground">Loop Bakery Admin</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:bg-sidebar-accent p-2 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Volver al Sitio</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/catalog" element={<CatalogManagement />} />
          <Route path="/sales" element={<SalesStats />} />
          <Route path="/stock" element={<StockManagement />} />
        </Routes>
      </main>
    </div>
  );
}
