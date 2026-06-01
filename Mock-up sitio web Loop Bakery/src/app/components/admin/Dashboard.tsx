import { TrendingUp, ShoppingCart, Package, DollarSign, Clock } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      label: 'Ventas del Mes',
      value: '$285,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-primary'
    },
    {
      label: 'Pedidos Pendientes',
      value: '8',
      change: '2 para hoy',
      trend: 'neutral',
      icon: Clock,
      color: 'text-accent'
    },
    {
      label: 'Productos Activos',
      value: '24',
      change: '6 con descuento',
      trend: 'neutral',
      icon: Package,
      color: 'text-primary'
    },
    {
      label: 'Total Pedidos',
      value: '156',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-accent'
    },
  ];

  const recentOrders = [
    { id: 1, customer: 'María González', items: 'Caja Premium + 2 Alfajores', total: 16700, status: 'pendiente', date: '31/05/2026' },
    { id: 2, customer: 'Juan Pérez', items: 'Caja Artesanal', total: 5525, status: 'completado', date: '30/05/2026' },
    { id: 3, customer: 'Ana Martínez', items: 'Catering 20 personas', total: 65000, status: 'pendiente', date: '31/05/2026' },
    { id: 4, customer: 'Carlos López', items: 'Caja Personalizada (6)', total: 5000, status: 'completado', date: '29/05/2026' },
  ];

  const lowStockProducts = [
    { name: 'Alfajor Triple', current: 5, minimum: 10 },
    { name: 'Cupcake Vainilla', current: 8, minimum: 15 },
    { name: 'Tarteleta Frutas', current: 3, minimum: 10 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Panel de Control</h1>
        <p className="text-muted-foreground">Resumen general de Loop Bakery</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-card border-2 border-accent rounded-xl p-6 hover:border-primary transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-accent/30 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {stat.trend === 'up' && (
                  <div className="flex items-center gap-1 text-primary text-sm">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </div>
                )}
              </div>
              <p className="text-3xl mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              {stat.trend === 'neutral' && (
                <p className="text-sm text-muted-foreground mt-2">{stat.change}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-card border-2 border-accent rounded-xl p-6">
          <h3 className="mb-4">Pedidos Recientes</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="border-2 border-accent rounded-lg p-4 hover:border-primary transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="mb-1">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.items}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.status === 'completado'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{order.date}</span>
                  <span className="text-primary">${order.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-card border-2 border-accent rounded-xl p-6">
          <h3 className="mb-4">Alertas de Stock Bajo</h3>
          <div className="space-y-4">
            {lowStockProducts.map((product, index) => (
              <div key={index} className="border-2 border-destructive/30 bg-destructive/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p>{product.name}</p>
                  <span className="text-destructive text-sm">¡Bajo stock!</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-destructive h-full transition-all"
                      style={{ width: `${(product.current / product.minimum) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {product.current} / {product.minimum}
                  </span>
                </div>
              </div>
            ))}
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Actualizar Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
