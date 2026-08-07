import { useState, useEffect } from 'react';
import {
  X, Save, ImageIcon, AlertCircle, Package,
  Tag, DollarSign, FileText, BarChart2,
} from 'lucide-react';
import type { TabType } from '../../types';
import type { AdminProduct } from '../../context/CatalogContext';
import { formatPrice } from '../../types';

// ─────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  discount: string;
  image: string;
  category: TabType;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  stock?: string;
  discount?: string;
  image?: string;
}

const EMPTY_FORM: FormData = {
  name: '',
  description: '',
  price: '',
  stock: '',
  discount: '0',
  image: '',
  category: 'otros',
};

const CATEGORY_OPTIONS: { value: TabType; label: string }[] = [
  { value: 'armadas', label: 'Caja ya armada' },
  { value: 'otros', label: 'Producto individual' },
  { value: 'personalizada', label: 'Para caja personalizada' },
];

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'El nombre es obligatorio';
  if (!form.description.trim()) errors.description = 'La descripción es obligatoria';
  const price = Number(form.price);
  if (!form.price || isNaN(price) || price <= 0) errors.price = 'Ingresá un precio válido (mayor a 0)';
  const stock = Number(form.stock);
  if (form.stock === '' || isNaN(stock) || stock < 0) errors.stock = 'Ingresá un stock válido (≥ 0)';
  const disc = Number(form.discount);
  if (isNaN(disc) || disc < 0 || disc > 100) errors.discount = 'El descuento debe ser entre 0 y 100';
  return errors;
}

// ─────────────────────────────────────────────────────────────

interface Props {
  product?: AdminProduct | null;
  onSave: (data: Omit<AdminProduct, 'id'> | AdminProduct) => void;
  onClose: () => void;
}

export function ProductFormModal({ product, onSave, onClose }: Props) {
  const isEditing = !!product;

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewError, setPreviewError] = useState(false);

  // Pre-llena el form si estamos editando
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: String(product.price),
        stock: String(product.stock),
        discount: String(product.discount ?? 0),
        image: product.image ?? '',
        category: product.category,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
    setPreviewError(false);
  }, [product]);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = (field: keyof FormData, value: string) => {
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

    const finalPrice = Number(form.price);
    const finalDiscount = Number(form.discount);

    const productData: Omit<AdminProduct, 'id'> = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: finalPrice,
      stock: Number(form.stock),
      discount: finalDiscount || undefined,
      image: form.image.trim() || `https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80`,
      category: form.category,
      tags: [],
    };

    if (isEditing && product) {
      onSave({ ...productData, id: product.id });
    } else {
      onSave(productData);
    }
  };

  // Precio con descuento calculado en tiempo real
  const previewPrice = Number(form.price) || 0;
  const previewDiscount = Number(form.discount) || 0;
  const finalPrice = previewDiscount > 0
    ? Math.round(previewPrice * (1 - previewDiscount / 100))
    : previewPrice;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-bruma-brown/50 backdrop-blur-sm z-[60]"
        aria-hidden="true"
      />

      {/* Panel lateral */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={isEditing ? 'Editar producto' : 'Agregar producto'}
        className="fixed top-0 right-0 h-full w-full max-w-lg bg-white z-[70] shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-bruma-brown to-bruma-blue flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Package className="w-4 h-4 text-white" strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-base leading-none">
                {isEditing ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              {isEditing && (
                <p className="text-bruma-cream text-xs mt-0.5">ID #{product?.id}</p>
              )}
            </div>
          </div>
          <button
            id="product-form-close"
            onClick={onClose}
            aria-label="Cerrar"
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Preview de imagen */}
          <div className="flex gap-4 items-start">
            <div className="w-24 h-24 rounded-2xl border-2 border-bruma-cream-mid overflow-hidden flex-shrink-0 bg-bruma-cream-dark flex items-center justify-center">
              {form.image && !previewError ? (
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-1 text-bruma-teal">
                  <ImageIcon className="w-8 h-8" strokeWidth={1.5} />
                  <span className="text-xs">Sin imagen</span>
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1.5">
              <label htmlFor="pf-image" className="text-sm font-medium text-bruma-brown flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-bruma-blue" strokeWidth={2} />
                URL de imagen
              </label>
              <input
                id="pf-image"
                type="url"
                value={form.image}
                onChange={e => { set('image', e.target.value); setPreviewError(false); }}
                placeholder="https://..."
                className={`w-full px-3 py-2.5 rounded-xl border-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-bruma-teal ${
                  errors.image ? 'border-red-300 bg-red-50' : 'border-bruma-cream-mid hover:border-bruma-teal'
                }`}
              />
              <p className="text-xs text-muted-foreground">
                Pegá una URL de Unsplash o similar. Si se deja vacía se usa una imagen default.
              </p>
              {errors.image && <FieldError msg={errors.image} />}
            </div>
          </div>

          {/* Nombre */}
          <Field
            id="pf-name" label="Nombre del producto" required
            icon={<Tag className="w-3.5 h-3.5 text-bruma-blue" strokeWidth={2} />}
            error={errors.name}
          >
            <input
              id="pf-name"
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Ej: Cupcake de Vainilla"
              className={inputClass(!!errors.name)}
            />
          </Field>

          {/* Descripción */}
          <Field
            id="pf-desc" label="Descripción" required
            icon={<FileText className="w-3.5 h-3.5 text-bruma-blue" strokeWidth={2} />}
            error={errors.description}
          >
            <textarea
              id="pf-desc"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Descripción del producto para los clientes..."
              rows={3}
              className={`${inputClass(!!errors.description)} resize-none`}
            />
          </Field>

          {/* Categoría */}
          <Field
            id="pf-cat" label="Categoría"
            icon={<Package className="w-3.5 h-3.5 text-bruma-blue" strokeWidth={2} />}
          >
            <select
              id="pf-cat"
              value={form.category}
              onChange={e => set('category', e.target.value as TabType)}
              className={`${inputClass(false)} appearance-none cursor-pointer`}
            >
              {CATEGORY_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          {/* Precio + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <Field
              id="pf-price" label="Precio (ARS)" required
              icon={<DollarSign className="w-3.5 h-3.5 text-bruma-blue" strokeWidth={2} />}
              error={errors.price}
            >
              <input
                id="pf-price"
                type="number"
                min="0"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="0"
                className={inputClass(!!errors.price)}
              />
            </Field>
            <Field
              id="pf-stock" label="Stock (unidades)" required
              icon={<BarChart2 className="w-3.5 h-3.5 text-bruma-blue" strokeWidth={2} />}
              error={errors.stock}
            >
              <input
                id="pf-stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={e => set('stock', e.target.value)}
                placeholder="0"
                className={inputClass(!!errors.stock)}
              />
            </Field>
          </div>

          {/* Descuento */}
          <Field
            id="pf-discount" label="Descuento (%)"
            icon={<Tag className="w-3.5 h-3.5 text-bruma-blue" strokeWidth={2} />}
            error={errors.discount}
            hint="Dejá en 0 si no hay descuento"
          >
            <input
              id="pf-discount"
              type="number"
              min="0"
              max="100"
              value={form.discount}
              onChange={e => set('discount', e.target.value)}
              placeholder="0"
              className={inputClass(!!errors.discount)}
            />
          </Field>

          {/* Preview de precio final */}
          {previewPrice > 0 && (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-bruma-blue/5 border border-bruma-cream-mid">
              <div>
                <p className="text-xs text-bruma-brown-light mb-0.5">Precio que verá el cliente</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-bruma-blue text-xl">{formatPrice(finalPrice)}</span>
                  {previewDiscount > 0 && (
                    <span className="text-sm text-bruma-brown-light line-through">{formatPrice(previewPrice)}</span>
                  )}
                  {previewDiscount > 0 && (
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      -{previewDiscount}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer con acciones */}
        <div className="px-6 py-4 border-t border-bruma-cream-mid bg-bruma-cream flex-shrink-0 flex gap-3">
          <button
            id="product-form-cancel"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-bruma-blue/20 text-bruma-blue font-semibold text-sm hover:bg-bruma-blue/5 transition-all"
          >
            Cancelar
          </button>
          <button
            id="product-form-save"
            onClick={handleSubmit}
            className="flex-1 flex items-center justify-center gap-2 py-3 btn-primary rounded-xl text-sm"
          >
            <Save className="w-4 h-4" strokeWidth={1.8} />
            {isEditing ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Sub-componentes de formulario ────────────────────────────

function inputClass(hasError: boolean) {
  return `w-full px-3 py-2.5 rounded-xl border-2 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-bruma-teal focus:border-bruma-teal ${
    hasError ? 'border-red-300 bg-red-50' : 'border-bruma-cream-mid hover:border-bruma-teal'
  }`;
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
      <AlertCircle className="w-3 h-3" strokeWidth={2} />
      {msg}
    </p>
  );
}

function Field({
  id, label, required, icon, hint, error, children,
}: {
  id: string;
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-bruma-brown flex items-center gap-1.5">
        {icon}
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-bruma-brown-light">{hint}</p>}
      {error && <FieldError msg={error} />}
    </div>
  );
}
