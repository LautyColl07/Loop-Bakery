import { useState, useEffect, useRef } from 'react';
import {
  X, User, Phone, Calendar, MessageCircle,
  ShoppingBag, Package, ChevronRight, AlertCircle,
  MapPin, Clock, Check,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getFinalPrice, formatPrice } from '../../types';
import type { CheckoutForm } from '../../types';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/** Días disponibles para retiro: mañana y los siguientes 13 días (excluye hoy) */
function getAvailableDays(): { value: string; label: string }[] {
  const days = [];
  const DAYS_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const MONTHS_ES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];

  for (let i = 1; i <= 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const value = d.toISOString().split('T')[0]; // YYYY-MM-DD
    const label = `${DAYS_ES[d.getDay()]} ${d.getDate()} de ${MONTHS_ES[d.getMonth()]}`;
    days.push({ value, label });
  }
  return days;
}

/** Compila todo el pedido en texto formateado para WhatsApp */
function buildWhatsAppText(
  form: CheckoutForm,
  cart: ReturnType<typeof useCart>['cart'],
  customBoxes: ReturnType<typeof useCart>['customBoxes'],
  cartTotal: number,
  dayLabel: string
): string {
  const lines: string[] = [
    '🎂 *Nuevo pedido — Loop Bakery*',
    '',
    '👤 *Datos del cliente:*',
    `  Nombre: ${form.nombre} ${form.apellido}`,
    `  Teléfono: ${form.telefono}`,
    '',
    '📦 *Detalle del pedido:*',
  ];

  // Productos normales
  if (cart.length > 0) {
    cart.forEach(item => {
      const price = getFinalPrice(item.product);
      lines.push(`  • ${item.quantity}× ${item.product.name} — ${formatPrice(price * item.quantity)}`);
    });
  }

  // Cajas personalizadas
  customBoxes.forEach(cb => {
    lines.push(`  📦 ${cb.box.size.label} personalizada — ${formatPrice(cb.box.totalPrice)}`);
    cb.box.items.forEach(item => {
      lines.push(`    └ ${item.quantity}× ${item.product.name}`);
    });
  });

  lines.push('');
  lines.push(`💰 *Total estimado: ${formatPrice(cartTotal)}*`);
  lines.push('');
  lines.push('🏪 *Modalidad: Take Away*');
  lines.push(`📅 *Día de retiro solicitado: ${dayLabel}*`);

  if (form.notas.trim()) {
    lines.push('');
    lines.push(`📝 *Notas:* ${form.notas}`);
  }

  lines.push('');
  lines.push('_Por favor confirmame disponibilidad y precio final. ¡Gracias!_ 🙏');

  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────
// Validación del formulario
// ─────────────────────────────────────────────────────────────
interface FormErrors {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  diaRetiro?: string;
}

function validate(form: CheckoutForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.nombre.trim()) errors.nombre = 'El nombre es obligatorio';
  if (!form.apellido.trim()) errors.apellido = 'El apellido es obligatorio';
  if (!form.telefono.trim()) errors.telefono = 'El teléfono es obligatorio';
  else if (!/^[\d\s\-+()]{6,20}$/.test(form.telefono))
    errors.telefono = 'Ingresá un teléfono válido';
  if (!form.diaRetiro) errors.diaRetiro = 'Elegí un día de retiro';
  return errors;
}

// ─────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────
export function CheckoutModal() {
  const {
    cart, customBoxes, cartTotal, allItems,
    isCheckoutOpen, setIsCheckoutOpen,
    setIsCartOpen, clearCart,
  } = useCart();

  const AVAILABLE_DAYS = getAvailableDays();

  const [form, setForm] = useState<CheckoutForm>({
    nombre: '',
    apellido: '',
    telefono: '',
    diaRetiro: '',
    notas: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCheckoutOpen) setIsCheckoutOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isCheckoutOpen, setIsCheckoutOpen]);

  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = isCheckoutOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCheckoutOpen]);

  useEffect(() => {
    if (isCheckoutOpen) modalRef.current?.focus();
  }, [isCheckoutOpen]);

  const handleChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const dayLabel = AVAILABLE_DAYS.find(d => d.value === form.diaRetiro)?.label ?? form.diaRetiro;
    const text = buildWhatsAppText(form, cart, customBoxes, cartTotal, dayLabel);
    const url = `https://wa.me/5491167905119?text=${encodeURIComponent(text)}`;

    setSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');

    // Limpiar y cerrar tras un instante
    setTimeout(() => {
      clearCart();
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
      setSubmitted(false);
      setForm({ nombre: '', apellido: '', telefono: '', diaRetiro: '', notas: '' });
    }, 1500);
  };

  if (!isCheckoutOpen) return null;

  const totalItems = allItems.length;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-purple-deep/60 backdrop-blur-sm z-[60] animate-fade-in"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Finalizar pedido"
        className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 focus:outline-none"
      >
        <div className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">

          {/* ── Header ──────────────────────────── */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-deep to-primary-700 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="font-display font-bold text-white text-base leading-none">
                  Confirmar pedido
                </h2>
                <p className="text-lila-light text-xs mt-0.5">{totalItems} ítem{totalItems !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              aria-label="Cerrar"
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          {/* ── Contenido scrolleable ────────────── */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">

              {/* ── Resumen del pedido ───────────── */}
              <div>
                <h3 className="font-display font-semibold text-purple-deep text-base mb-3 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-primary-700" strokeWidth={1.8} />
                  Tu pedido
                </h3>

                <div className="space-y-2 bg-cream-100 rounded-2xl p-4 border border-primary-100">
                  {/* Productos normales */}
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center text-sm">
                      <span className="text-purple-deep">
                        <span className="font-semibold text-primary-700">{item.quantity}×</span>{' '}
                        {item.product.name}
                      </span>
                      <span className="font-medium text-purple-deep">
                        {formatPrice(getFinalPrice(item.product) * item.quantity)}
                      </span>
                    </div>
                  ))}

                  {/* Cajas personalizadas */}
                  {customBoxes.map(cb => (
                    <div key={cb.box.id} className="border-t border-primary-100 pt-2 mt-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-purple-deep flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-primary-700" strokeWidth={1.8} />
                          <span className="font-semibold">{cb.box.size.label} personalizada</span>
                        </span>
                        <span className="font-medium text-purple-deep">{formatPrice(cb.box.totalPrice)}</span>
                      </div>
                      <div className="mt-1 pl-5 space-y-0.5">
                        {cb.box.items.map(item => (
                          <p key={item.product.id} className="text-xs text-muted-foreground">
                            └ {item.quantity}× {item.product.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="border-t border-primary-200 pt-3 mt-2 flex justify-between items-center">
                    <span className="font-bold text-purple-deep text-sm">Total estimado</span>
                    <span className="font-bold text-primary-700 text-xl">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>

              {/* ── Aviso Take Away ──────────────── */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                <div>
                  <p className="font-semibold text-amber-800 text-sm">Modalidad Take Away — Retiro en local</p>
                  <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                    No realizamos envíos a domicilio. El pedido debe retirarse en el local en el día y
                    horario acordado. Confirmamos disponibilidad por WhatsApp.
                  </p>
                </div>
              </div>

              {/* ── Formulario ───────────────────── */}
              <div>
                <h3 className="font-display font-semibold text-purple-deep text-base mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary-700" strokeWidth={1.8} />
                  Tus datos
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div className="space-y-1.5">
                    <label htmlFor="checkout-nombre" className="text-sm font-medium text-purple-deep">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-nombre"
                      type="text"
                      value={form.nombre}
                      onChange={e => handleChange('nombre', e.target.value)}
                      placeholder="Ej: María"
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 ${
                        errors.nombre ? 'border-red-300 bg-red-50' : 'border-primary-100 hover:border-primary-300'
                      }`}
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" strokeWidth={2} />
                        {errors.nombre}
                      </p>
                    )}
                  </div>

                  {/* Apellido */}
                  <div className="space-y-1.5">
                    <label htmlFor="checkout-apellido" className="text-sm font-medium text-purple-deep">
                      Apellido <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-apellido"
                      type="text"
                      value={form.apellido}
                      onChange={e => handleChange('apellido', e.target.value)}
                      placeholder="Ej: García"
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 ${
                        errors.apellido ? 'border-red-300 bg-red-50' : 'border-primary-100 hover:border-primary-300'
                      }`}
                    />
                    {errors.apellido && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" strokeWidth={2} />
                        {errors.apellido}
                      </p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="checkout-telefono" className="text-sm font-medium text-purple-deep">
                      Número de teléfono <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.8} />
                      <input
                        id="checkout-telefono"
                        type="tel"
                        value={form.telefono}
                        onChange={e => handleChange('telefono', e.target.value)}
                        placeholder="Ej: +54 11 1234-5678"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 ${
                          errors.telefono ? 'border-red-300 bg-red-50' : 'border-primary-100 hover:border-primary-300'
                        }`}
                      />
                    </div>
                    {errors.telefono && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" strokeWidth={2} />
                        {errors.telefono}
                      </p>
                    )}
                  </div>

                  {/* Día de retiro */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="checkout-dia" className="text-sm font-medium text-purple-deep flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary-700" strokeWidth={1.8} />
                      Día de retiro <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="checkout-dia"
                      value={form.diaRetiro}
                      onChange={e => handleChange('diaRetiro', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 appearance-none cursor-pointer ${
                        errors.diaRetiro ? 'border-red-300 bg-red-50' : 'border-primary-100 hover:border-primary-300'
                      }`}
                    >
                      <option value="">— Seleccioná un día —</option>
                      {AVAILABLE_DAYS.map(day => (
                        <option key={day.value} value={day.value}>{day.label}</option>
                      ))}
                    </select>
                    {errors.diaRetiro && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" strokeWidth={2} />
                        {errors.diaRetiro}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3 h-3" strokeWidth={2} />
                      El horario exacto se coordina por WhatsApp al confirmar
                    </p>
                  </div>

                  {/* Notas opcionales */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="checkout-notas" className="text-sm font-medium text-purple-deep">
                      Notas adicionales <span className="text-muted-foreground font-normal">(opcional)</span>
                    </label>
                    <textarea
                      id="checkout-notas"
                      value={form.notas}
                      onChange={e => handleChange('notas', e.target.value)}
                      placeholder="Ej: Sin maní, para cumpleaños, dedicatoria especial..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 border-primary-100 hover:border-primary-300 text-sm bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 resize-none"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── Footer — CTA ─────────────────────── */}
          <div className="px-6 py-4 border-t border-primary-100 bg-cream-100 flex-shrink-0 space-y-3">
            <button
              id="checkout-confirm-btn"
              onClick={handleSubmit}
              disabled={submitted}
              className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
                submitted
                  ? 'bg-green-500 text-white'
                  : 'bg-[#25D366] text-white hover:bg-[#1ebe5d] hover:-translate-y-0.5 shadow-lg hover:shadow-[0_8px_32px_rgba(37,211,102,0.4)]'
              }`}
            >
              {submitted ? (
                <>
                  <Check className="w-5 h-5" strokeWidth={2.5} />
                  ¡Redirigiendo a WhatsApp!
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" strokeWidth={1.8} />
                  Confirmar pedido por WhatsApp
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </>
              )}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Al confirmar, se abrirá WhatsApp con el detalle de tu pedido. No se procesa ningún pago online.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
