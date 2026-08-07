import { useState } from 'react';
import {
  ClipboardList, Check, Trash2, Plus, X, User, Phone,
  Calendar, Package, ChevronDown, ChevronUp, ShoppingBag,
} from 'lucide-react';
import { useOrders, type OrderItem } from '../../context/OrdersContext';
import { useCatalog } from '../../context/CatalogContext';
import { formatPrice, getFinalPrice } from '../../types';

export function PendingOrders() {
  const { pendingOrders, completedOrders, addOrder, completeOrder, deleteOrder } = useOrders();
  const { products } = useCatalog();
  const [showForm, setShowForm] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  // ── Formulario para agregar pedido ────────────────────
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formPickup, setFormPickup] = useState('');
  const [formItems, setFormItems] = useState<OrderItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const addItemToForm = () => {
    const product = products.find(p => String(p.id) === selectedProductId);
    if (!product) return;
    const existing = formItems.find(i => i.productName === product.name);
    if (existing) {
      setFormItems(prev =>
        prev.map(i =>
          i.productName === product.name
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setFormItems(prev => [
        ...prev,
        { productName: product.name, quantity: 1, unitPrice: getFinalPrice(product) },
      ]);
    }
    setSelectedProductId('');
  };

  const removeItemFromForm = (name: string) => {
    setFormItems(prev => prev.filter(i => i.productName !== name));
  };

  const formTotal = formItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0);

  const handleSubmit = () => {
    if (!formName.trim() || formItems.length === 0) return;
    addOrder({
      clientName: formName.trim(),
      clientPhone: formPhone.trim(),
      items: formItems,
      total: formTotal,
      pickupDate: formPickup || new Date().toISOString().slice(0, 10),
    });
    // Reset
    setFormName('');
    setFormPhone('');
    setFormPickup('');
    setFormItems([]);
    setShowForm(false);
  };

  const recentCompleted = completedOrders
    .sort((a, b) => new Date(b.completedAt || b.createdAt).getTime() - new Date(a.completedAt || a.createdAt).getTime())
    .slice(0, 10);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Header ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-bruma-brown flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-bruma-blue" strokeWidth={1.8} />
            Pedidos
          </h2>
          <p className="text-bruma-brown-light text-sm mt-1">
            Gestioná los pedidos recibidos por WhatsApp
          </p>
        </div>
        <button
          id="add-order-btn"
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
            bg-bruma-blue text-white hover:bg-bruma-blue-dark
            shadow-card hover:shadow-card-hover hover:-translate-y-0.5
            transition-all duration-300"
        >
          {showForm ? <X className="w-4 h-4" strokeWidth={2} /> : <Plus className="w-4 h-4" strokeWidth={2} />}
          {showForm ? 'Cancelar' : 'Agregar pedido'}
        </button>
      </div>

      {/* ── Formulario nuevo pedido ──────────────── */}
      {showForm && (
        <div className="bg-white rounded-2xl border-2 border-bruma-blue/20 shadow-card p-6 space-y-5 animate-fade-in">
          <h3 className="font-display font-semibold text-bruma-brown text-lg">Nuevo pedido</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Nombre */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-bruma-brown mb-1.5">
                <User className="w-3.5 h-3.5" strokeWidth={1.8} /> Nombre del cliente
              </label>
              <input
                id="order-name"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="Ej: María López"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-bruma-cream-mid text-sm
                  focus:outline-none focus:border-bruma-teal focus:ring-2 focus:ring-bruma-teal/20
                  transition-all duration-200"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-bruma-brown mb-1.5">
                <Phone className="w-3.5 h-3.5" strokeWidth={1.8} /> Teléfono
              </label>
              <input
                id="order-phone"
                value={formPhone}
                onChange={e => setFormPhone(e.target.value)}
                placeholder="Ej: 11 6790-5119"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-bruma-cream-mid text-sm
                  focus:outline-none focus:border-bruma-teal focus:ring-2 focus:ring-bruma-teal/20
                  transition-all duration-200"
              />
            </div>

            {/* Fecha retiro */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-bruma-brown mb-1.5">
                <Calendar className="w-3.5 h-3.5" strokeWidth={1.8} /> Día de retiro
              </label>
              <input
                id="order-pickup"
                type="date"
                value={formPickup}
                onChange={e => setFormPickup(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-bruma-cream-mid text-sm
                  focus:outline-none focus:border-bruma-teal focus:ring-2 focus:ring-bruma-teal/20
                  transition-all duration-200"
              />
            </div>
          </div>

          {/* Selector de productos */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-bruma-brown mb-1.5">
              <Package className="w-3.5 h-3.5" strokeWidth={1.8} /> Agregar productos
            </label>
            <div className="flex gap-2">
              <select
                id="order-product-select"
                value={selectedProductId}
                onChange={e => setSelectedProductId(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border-2 border-bruma-cream-mid text-sm bg-white
                  focus:outline-none focus:border-bruma-teal focus:ring-2 focus:ring-bruma-teal/20
                  transition-all duration-200"
              >
                <option value="">Seleccionar producto...</option>
                {products.map(p => (
                  <option key={p.id} value={String(p.id)}>
                    {p.name} — {formatPrice(getFinalPrice(p))}
                  </option>
                ))}
              </select>
              <button
                onClick={addItemToForm}
                disabled={!selectedProductId}
                className="px-4 py-2.5 rounded-xl bg-bruma-blue text-white text-sm font-medium
                  hover:bg-bruma-blue-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Items del pedido */}
          {formItems.length > 0 && (
            <div className="space-y-2">
              {formItems.map(item => (
                <div
                  key={item.productName}
                  className="flex items-center justify-between px-4 py-2.5 bg-bruma-cream rounded-xl border border-bruma-cream-mid"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-sm font-medium text-bruma-brown truncate">{item.productName}</span>
                    <span className="text-xs text-bruma-brown-light flex-shrink-0">
                      ×{item.quantity} — {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItemFromForm(item.productName)}
                    className="p-1 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2 border-t border-bruma-cream-mid">
                <span className="font-semibold text-bruma-brown text-sm">Total</span>
                <span className="font-bold text-bruma-blue">{formatPrice(formTotal)}</span>
              </div>
            </div>
          )}

          {/* Botón confirmar */}
          <button
            id="confirm-order-btn"
            onClick={handleSubmit}
            disabled={!formName.trim() || formItems.length === 0}
            className="w-full py-3 rounded-xl bg-bruma-blue text-white font-semibold text-sm
              hover:bg-bruma-blue-dark shadow-card hover:shadow-card-hover
              transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Registrar pedido
          </button>
        </div>
      )}

      {/* ── Lista de pedidos pendientes ──────────── */}
      {pendingOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-bruma-cream-mid shadow-card p-12 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-bruma-teal/50 mb-4" strokeWidth={1.2} />
          <p className="font-display font-semibold text-bruma-brown text-lg mb-1">
            No hay pedidos pendientes
          </p>
          <p className="text-bruma-brown-light text-sm">
            Cuando recibas un pedido por WhatsApp, registralo con el botón de arriba.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-bruma-brown text-sm uppercase tracking-wide">
            Pendientes ({pendingOrders.length})
          </h3>
          {pendingOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-amber-200 shadow-card p-5 hover:shadow-card-hover transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                {/* Info */}
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase">
                      Pendiente
                    </span>
                    <span className="text-xs text-bruma-brown-light">
                      Retira: {formatDate(order.pickupDate)}
                    </span>
                  </div>
                  <p className="font-semibold text-bruma-brown">{order.clientName}</p>
                  {order.clientPhone && (
                    <p className="text-xs text-bruma-brown-light flex items-center gap-1">
                      <Phone className="w-3 h-3" strokeWidth={1.5} /> {order.clientPhone}
                    </p>
                  )}

                  {/* Items */}
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {order.items.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-bruma-cream border border-bruma-cream-mid rounded-full text-xs text-bruma-blue font-medium"
                      >
                        {item.quantity}× {item.productName}
                      </span>
                    ))}
                  </div>

                  <p className="text-bruma-blue font-bold text-lg">{formatPrice(order.total)}</p>
                </div>

                {/* Acciones */}
                <div className="flex sm:flex-col gap-2 flex-shrink-0">
                  <button
                    id={`complete-${order.id}`}
                    onClick={() => completeOrder(order.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium
                      hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <Check className="w-4 h-4" strokeWidth={2} />
                    Completado
                  </button>
                  <button
                    id={`delete-${order.id}`}
                    onClick={() => deleteOrder(order.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 text-sm font-medium
                      hover:bg-red-50 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.8} />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Historial reciente ──────────────────── */}
      <div>
        <button
          onClick={() => setShowCompleted(v => !v)}
          className="flex items-center gap-2 text-sm font-semibold text-bruma-brown hover:text-bruma-blue transition-colors mb-3"
        >
          {showCompleted ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          Últimos completados ({recentCompleted.length})
        </button>

        {showCompleted && (
          <div className="bg-white rounded-2xl border border-bruma-cream-mid shadow-card overflow-hidden animate-fade-in">
            {recentCompleted.length === 0 ? (
              <p className="p-6 text-sm text-bruma-brown-light text-center">No hay pedidos completados aún</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentCompleted.map(order => (
                  <div key={order.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-bruma-brown truncate">{order.clientName}</p>
                      <p className="text-xs text-bruma-brown-light truncate">
                        {order.items.map(i => `${i.quantity}× ${i.productName}`).join(', ')}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-bruma-blue">{formatPrice(order.total)}</p>
                      <p className="text-[10px] text-bruma-brown-light">
                        {order.completedAt ? formatDate(order.completedAt) : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
