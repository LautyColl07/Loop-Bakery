import { useState } from 'react';
import { Package, AlertTriangle, CheckCircle, Plus, Minus } from 'lucide-react';

interface StockItem {
  id: number;
  name: string;
  category: string;
  current: number;
  minimum: number;
  maximum: number;
  unit: string;
  image: string;
}

export function StockManagement() {
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: 1,
      name: 'Cupcake Vainilla',
      category: 'Postres',
      current: 8,
      minimum: 15,
      maximum: 50,
      unit: 'unidades',
      image: 'https://images.unsplash.com/photo-1710940945472-c601481a2c03?w=100'
    },
    {
      id: 2,
      name: 'Cupcake Chocolate',
      category: 'Postres',
      current: 22,
      minimum: 15,
      maximum: 50,
      unit: 'unidades',
      image: 'https://images.unsplash.com/photo-1713759980319-8199058cef6b?w=100'
    },
    {
      id: 3,
      name: 'Alfajor Triple',
      category: 'Postres',
      current: 5,
      minimum: 10,
      maximum: 40,
      unit: 'unidades',
      image: 'https://images.unsplash.com/photo-1717198100629-b1a59284ced9?w=100'
    },
    {
      id: 4,
      name: 'Tarteleta Frutas',
      category: 'Postres',
      current: 3,
      minimum: 10,
      maximum: 30,
      unit: 'unidades',
      image: 'https://images.unsplash.com/photo-1764155535434-6cb2fa141e5e?w=100'
    },
    {
      id: 5,
      name: 'Torta Premium (3 pisos)',
      category: 'Tortas',
      current: 2,
      minimum: 2,
      maximum: 5,
      unit: 'unidades',
      image: 'https://images.unsplash.com/photo-1630534591989-7858079986a6?w=100'
    },
    {
      id: 6,
      name: 'Mini Tortas',
      category: 'Tortas',
      current: 18,
      minimum: 12,
      maximum: 30,
      unit: 'unidades',
      image: 'https://images.unsplash.com/photo-1643102012833-cc5f59e206f7?w=100'
    },
  ]);

  const updateStock = (id: number, change: number) => {
    setStockItems(stockItems.map(item => {
      if (item.id === id) {
        const newCurrent = Math.max(0, Math.min(item.maximum, item.current + change));
        return { ...item, current: newCurrent };
      }
      return item;
    }));
  };

  const getStockStatus = (item: StockItem) => {
    if (item.current < item.minimum) {
      return { status: 'low', color: 'text-destructive', bg: 'bg-destructive/10', label: 'Stock Bajo' };
    }
    if (item.current >= item.maximum * 0.8) {
      return { status: 'full', color: 'text-primary', bg: 'bg-primary/10', label: 'Stock Completo' };
    }
    return { status: 'normal', color: 'text-accent', bg: 'bg-accent/10', label: 'Stock Normal' };
  };

  const lowStockCount = stockItems.filter(item => item.current < item.minimum).length;
  const totalValue = stockItems.reduce((sum, item) => sum + item.current, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Panel de Gestión de Stock</h1>
        <p className="text-muted-foreground">Administra el inventario de productos</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border-2 border-accent rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-lg bg-primary/20">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground">Total de Productos</p>
          </div>
          <p className="text-3xl">{stockItems.length}</p>
        </div>

        <div className="bg-card border-2 border-accent rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-lg bg-destructive/20">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <p className="text-muted-foreground">Alertas de Stock Bajo</p>
          </div>
          <p className="text-3xl">{lowStockCount}</p>
        </div>

        <div className="bg-card border-2 border-accent rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-lg bg-accent/30">
              <CheckCircle className="w-6 h-6 text-accent" />
            </div>
            <p className="text-muted-foreground">Unidades Totales</p>
          </div>
          <p className="text-3xl">{totalValue}</p>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-card border-2 border-accent rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4">Producto</th>
                <th className="text-left p-4">Categoría</th>
                <th className="text-left p-4">Stock Actual</th>
                <th className="text-left p-4">Mínimo / Máximo</th>
                <th className="text-left p-4">Estado</th>
                <th className="text-left p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item) => {
                const status = getStockStatus(item);
                const stockPercentage = (item.current / item.maximum) * 100;

                return (
                  <tr key={item.id} className="border-t border-accent hover:bg-accent/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {item.category}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-lg">
                          {item.current} {item.unit}
                        </span>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              status.status === 'low' ? 'bg-destructive' :
                              status.status === 'full' ? 'bg-primary' : 'bg-accent'
                            }`}
                            style={{ width: `${stockPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {item.minimum} / {item.maximum} {item.unit}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateStock(item.id, -1)}
                          disabled={item.current === 0}
                          className="p-2 rounded-lg bg-muted hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateStock(item.id, 1)}
                          disabled={item.current >= item.maximum}
                          className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Section */}
      {lowStockCount > 0 && (
        <div className="mt-8 bg-destructive/10 border-2 border-destructive/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-destructive mb-2">¡Atención! Stock Bajo Detectado</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {lowStockCount} producto{lowStockCount > 1 ? 's están' : ' está'} por debajo del stock mínimo.
                Se recomienda reponer el inventario lo antes posible.
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Generar Orden de Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
