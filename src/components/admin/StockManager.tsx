import { useState, useMemo } from 'react';
import {
  Search, Plus, Minus, Warehouse, Package,
} from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { formatPrice } from '../../types';

export function StockManager() {
  const { products, updateProduct } = useCatalog();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return products;
    return products.filter(p => p.name.toLowerCase().includes(q));
  }, [products, search]);

  const handleStockChange = (id: number | string, delta: number) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const newStock = Math.max(0, product.stock + delta);
    updateProduct(id, { stock: newStock });
  };

  const handleStockInput = (id: number | string, value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0) return;
    updateProduct(id, { stock: num });
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0)
      return { label: 'Sin stock', classes: 'bg-red-100 text-red-700 border-red-200' };
    if (stock <= 3)
      return { label: 'Bajo', classes: 'bg-amber-100 text-amber-700 border-amber-200' };
    if (stock <= 9)
      return { label: 'Normal', classes: 'bg-blue-100 text-blue-700 border-blue-200' };
    return { label: 'Óptimo', classes: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  };

  const totalUnits = products.reduce((s, p) => s + p.stock, 0);
  const outOfStock = products.filter(p => p.stock === 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 3).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-purple-deep flex items-center gap-2">
            <Warehouse className="w-6 h-6 text-primary-700" strokeWidth={1.8} />
            Gestión de Stock
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Actualizá rápidamente las cantidades disponibles
          </p>
        </div>

        {/* Mini métricas */}
        <div className="flex items-center gap-3 text-xs font-medium">
          <span className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full">
            {totalUnits} unidades totales
          </span>
          {outOfStock > 0 && (
            <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full">
              {outOfStock} sin stock
            </span>
          )}
          {lowStock > 0 && (
            <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full">
              {lowStock} stock bajo
            </span>
          )}
        </div>
      </div>

      {/* ── Buscador ───────────────────────────────── */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.8} />
        <input
          id="stock-search"
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-primary-100 bg-white text-sm
            placeholder:text-muted-foreground
            focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200
            transition-all duration-200"
        />
      </div>

      {/* ── Tabla de stock ──────────────────────────── */}
      <div className="bg-white rounded-2xl border border-primary-100 shadow-card overflow-hidden">
        {/* Header de tabla */}
        <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center px-5 py-3 bg-cream-100 border-b border-primary-100 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          <span className="w-10">IMG</span>
          <span>Producto</span>
          <span className="text-center w-20">Estado</span>
          <span className="text-center w-28">Precio</span>
          <span className="text-center w-40">Stock</span>
        </div>

        {/* Filas */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Package className="w-12 h-12 mb-3 opacity-30" strokeWidth={1.2} />
            <p className="text-sm font-medium">No se encontraron productos</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map(product => {
              const badge = getStockBadge(product.stock);
              return (
                <div
                  key={product.id}
                  className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto_auto_auto] gap-3 sm:gap-4 items-center px-5 py-4 hover:bg-cream-100/50 transition-colors duration-150"
                >
                  {/* Imagen */}
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-cream-200">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-4 h-4 text-primary-300" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  {/* Nombre */}
                  <div className="min-w-0">
                    <p className="font-medium text-purple-deep text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                  </div>

                  {/* Badge estado */}
                  <div className="w-20 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.classes}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Precio */}
                  <div className="w-28 text-center">
                    <span className="text-sm font-semibold text-primary-700">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  {/* Controles de stock */}
                  <div className="w-40 flex items-center justify-center gap-2">
                    <button
                      id={`stock-minus-${product.id}`}
                      onClick={() => handleStockChange(product.id, -1)}
                      disabled={product.stock === 0}
                      className="w-8 h-8 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center
                        text-red-600 hover:bg-red-100 transition-colors duration-150
                        disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label={`Restar stock de ${product.name}`}
                    >
                      <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>

                    <input
                      id={`stock-input-${product.id}`}
                      type="number"
                      min="0"
                      value={product.stock}
                      onChange={e => handleStockInput(product.id, e.target.value)}
                      className="w-14 h-8 text-center text-sm font-bold text-purple-deep bg-cream-100 rounded-xl border border-primary-100
                        focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200
                        [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />

                    <button
                      id={`stock-plus-${product.id}`}
                      onClick={() => handleStockChange(product.id, 1)}
                      className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center
                        text-emerald-600 hover:bg-emerald-100 transition-colors duration-150"
                      aria-label={`Sumar stock de ${product.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>

                    {/* Quick buttons */}
                    <div className="hidden lg:flex gap-1 ml-1">
                      <button
                        onClick={() => handleStockChange(product.id, 5)}
                        className="px-2 h-7 rounded-lg bg-primary-50 border border-primary-100 text-[10px] font-bold text-primary-600
                          hover:bg-primary-100 transition-colors"
                        title="+5"
                      >
                        +5
                      </button>
                      <button
                        onClick={() => handleStockChange(product.id, 10)}
                        className="px-2 h-7 rounded-lg bg-primary-50 border border-primary-100 text-[10px] font-bold text-primary-600
                          hover:bg-primary-100 transition-colors"
                        title="+10"
                      >
                        +10
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
