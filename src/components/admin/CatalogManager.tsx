import { useState } from 'react';
import {
  Plus, Search, Edit2, Trash2, Package, AlertTriangle,
  Image as ImageIcon, ChevronUp, ChevronDown, X,
} from 'lucide-react';
import { useCatalog, type AdminProduct } from '../../context/CatalogContext';
import { ProductFormModal } from './ProductFormModal';
import { formatPrice, getFinalPrice } from '../../types';

const CATEGORY_LABELS: Record<string, string> = {
  armadas: 'Caja armada',
  otros: 'Individual',
  personalizada: 'Personalizable',
  catering: 'Cáterin',
};

const CATEGORY_COLORS: Record<string, string> = {
  armadas: 'bg-purple-100 text-purple-700',
  otros: 'bg-blue-100 text-blue-700',
  personalizada: 'bg-amber-100 text-amber-700',
  catering: 'bg-pink-100 text-pink-700',
};

type SortField = 'name' | 'price' | 'stock' | 'category';
type SortDir = 'asc' | 'desc';

export function CatalogManager() {
  const { products, addProduct, updateProduct, deleteProduct } = useCatalog();

  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [filterCat, setFilterCat] = useState<string>('all');

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // ── Filtrado + ordenamiento ────────────────────────────────

  const filtered = products
    .filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchCat = filterCat === 'all' || p.category === filterCat;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortField === 'price') cmp = a.price - b.price;
      else if (sortField === 'stock') cmp = a.stock - b.stock;
      else if (sortField === 'category') cmp = a.category.localeCompare(b.category);
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  // ── Handlers ──────────────────────────────────────────────

  const openAdd = () => { setEditingProduct(null); setFormOpen(true); };
  const openEdit = (p: AdminProduct) => { setEditingProduct(p); setFormOpen(true); };
  const closeForm = () => { setFormOpen(false); setEditingProduct(null); };

  const handleSave = (data: Omit<AdminProduct, 'id'> | AdminProduct) => {
    if ('id' in data) updateProduct(data.id, data);
    else addProduct(data);
    closeForm();
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="w-3 h-3 text-muted-foreground/40" strokeWidth={2} />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-primary-700" strokeWidth={2.5} />
      : <ChevronDown className="w-3 h-3 text-primary-700" strokeWidth={2.5} />;
  };

  return (
    <div className="space-y-6">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-purple-deep">Gestión de catálogo</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {products.length} productos en total · {filtered.length} mostrando
          </p>
        </div>
        <button
          id="catalog-add-btn"
          onClick={openAdd}
          className="flex items-center gap-2 btn-primary text-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Agregar producto
        </button>
      </div>

      {/* ── Filtros ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.8} />
          <input
            id="catalog-search"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre o descripción..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-primary-100 hover:border-primary-300 focus:border-primary-400 focus:outline-none text-sm bg-white transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-purple-deep transition-colors">
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          )}
        </div>
        <select
          id="catalog-filter"
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          className="px-4 py-2.5 rounded-xl border-2 border-primary-100 hover:border-primary-300 focus:border-primary-400 focus:outline-none text-sm bg-white appearance-none cursor-pointer"
        >
          <option value="all">Todas las categorías</option>
          <option value="armadas">Cajas armadas</option>
          <option value="otros">Individuales</option>
          <option value="personalizada">Personalizables</option>
        </select>
      </div>

      {/* ── Tabla ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-primary-100 shadow-card overflow-hidden">

        {/* Header de la tabla */}
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr_auto] gap-3 px-4 py-3 bg-primary-50 border-b border-primary-100 text-xs font-semibold text-muted-foreground">
          <button onClick={() => toggleSort('name')} className="flex items-center gap-1 text-left hover:text-purple-deep transition-colors">
            Producto <SortIcon field="name" />
          </button>
          <button onClick={() => toggleSort('category')} className="flex items-center gap-1 hover:text-purple-deep transition-colors">
            Categoría <SortIcon field="category" />
          </button>
          <button onClick={() => toggleSort('price')} className="flex items-center gap-1 hover:text-purple-deep transition-colors">
            Precio <SortIcon field="price" />
          </button>
          <button onClick={() => toggleSort('stock')} className="flex items-center gap-1 hover:text-purple-deep transition-colors">
            Stock <SortIcon field="stock" />
          </button>
          <span>Acciones</span>
        </div>

        {/* Filas */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-300" strokeWidth={1.5} />
            </div>
            <p className="font-medium text-muted-foreground">No se encontraron productos</p>
            {search && <button onClick={() => setSearch('')} className="text-primary-700 text-sm underline">Limpiar búsqueda</button>}
          </div>
        ) : (
          <ul className="divide-y divide-primary-50">
            {filtered.map(product => {
              const finalPrice = getFinalPrice(product);
              const isDeleting = deleteConfirm === product.id;

              return (
                <li
                  key={product.id}
                  id={`catalog-row-${product.id}`}
                  className={`grid grid-cols-[3fr_1fr_1fr_1fr_auto] gap-3 px-4 py-3 items-center transition-colors duration-150 ${
                    isDeleting ? 'bg-red-50' : 'hover:bg-cream-100'
                  }`}
                >
                  {/* Producto */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-cream-200">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-primary-300" strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-purple-deep text-sm leading-tight truncate">{product.name}</p>
                      <p className="text-muted-foreground text-xs mt-0.5 truncate">{product.description}</p>
                    </div>
                  </div>

                  {/* Categoría */}
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full w-fit ${CATEGORY_COLORS[product.category] ?? 'bg-gray-100 text-gray-600'}`}>
                    {CATEGORY_LABELS[product.category] ?? product.category}
                  </span>

                  {/* Precio */}
                  <div>
                    <p className="font-bold text-primary-700 text-sm">{formatPrice(finalPrice)}</p>
                    {(product.discount ?? 0) > 0 && (
                      <p className="text-xs text-muted-foreground line-through">{formatPrice(product.price)}</p>
                    )}
                  </div>

                  {/* Stock */}
                  <span className={`text-sm font-semibold ${product.stock === 0 ? 'text-red-500' : product.stock <= 3 ? 'text-amber-500' : 'text-green-600'}`}>
                    {product.stock} u.
                  </span>

                  {/* Acciones */}
                  <div className="flex items-center gap-1">
                    {!isDeleting ? (
                      <>
                        <button
                          id={`catalog-edit-${product.id}`}
                          onClick={() => openEdit(product)}
                          aria-label={`Editar ${product.name}`}
                          className="p-2 rounded-lg text-muted-foreground hover:text-primary-700 hover:bg-primary-50 transition-all"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" strokeWidth={1.8} />
                        </button>
                        <button
                          id={`catalog-delete-${product.id}`}
                          onClick={() => setDeleteConfirm(product.id)}
                          aria-label={`Eliminar ${product.name}`}
                          className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.8} />
                        </button>
                      </>
                    ) : (
                      /* Confirmación de eliminación inline */
                      <div className="flex items-center gap-1.5 animate-fade-in">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" strokeWidth={1.8} />
                        <button
                          id={`catalog-confirm-delete-${product.id}`}
                          onClick={() => handleDelete(product.id)}
                          className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-100 hover:bg-red-200 px-2.5 py-1.5 rounded-lg transition-all"
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-xs text-muted-foreground hover:text-purple-deep px-2.5 py-1.5 rounded-lg hover:bg-primary-50 transition-all"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Modal del formulario */}
      {formOpen && (
        <ProductFormModal
          product={editingProduct}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}
    </div>
  );
}
