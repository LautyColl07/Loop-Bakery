import { useState, useEffect } from 'react';
import { X, Upload, DollarSign, Package, Tag, Image as ImageIcon } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  active: boolean;
  discount: number;
  stock: number;
}

interface ProductEditModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export function ProductEditModal({ product, onClose, onSave }: ProductEditModalProps) {
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    active: true,
    discount: 0,
    stock: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: keyof Product, value: string | number | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl mb-1">Editar Producto</h2>
            <p className="text-sm opacity-90">Modifica los detalles del producto</p>
          </div>
          <button onClick={onClose} className="hover:bg-primary-foreground/20 p-2 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Image */}
          <div>
            <label className="block mb-3 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Imagen del Producto
            </label>
            <div className="flex items-center gap-4">
              <img
                src={formData.image}
                alt={formData.name}
                className="w-32 h-32 object-cover rounded-lg border-2 border-accent"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-accent focus:border-primary outline-none bg-input-background mb-2"
                  placeholder="URL de la imagen"
                />
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-accent rounded-lg hover:border-primary transition-colors text-sm"
                >
                  <Upload className="w-4 h-4" />
                  Subir Nueva Imagen
                </button>
              </div>
            </div>
          </div>

          {/* Name and Description */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 text-sm">Nombre del Producto</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-accent focus:border-primary outline-none bg-input-background"
                placeholder="Ej: Caja Premium"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-accent focus:border-primary outline-none bg-input-background resize-none"
                rows={3}
                placeholder="Describe el producto..."
                required
              />
            </div>
          </div>

          {/* Price, Stock, Discount */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Precio
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border-2 border-accent focus:border-primary outline-none bg-input-background"
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border-2 border-accent focus:border-primary outline-none bg-input-background"
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                Descuento (%)
              </label>
              <input
                type="number"
                value={formData.discount}
                onChange={(e) => handleChange('discount', parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border-2 border-accent focus:border-primary outline-none bg-input-background"
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => handleChange('active', e.target.checked)}
              className="w-5 h-5 rounded border-2 border-accent"
            />
            <label htmlFor="active" className="cursor-pointer">
              Producto activo (visible en la tienda)
            </label>
          </div>

          {/* Final Price Preview */}
          <div className="bg-accent/20 border-2 border-accent rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">Vista Previa del Precio</p>
            {formData.discount > 0 ? (
              <div className="flex items-center gap-3">
                <span className="text-lg text-muted-foreground line-through">
                  ${formData.price.toLocaleString()}
                </span>
                <span className="text-2xl text-primary">
                  ${(formData.price * (1 - formData.discount / 100)).toLocaleString()}
                </span>
                <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm">
                  -{formData.discount}%
                </span>
              </div>
            ) : (
              <span className="text-2xl text-primary">${formData.price.toLocaleString()}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-accent">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-accent rounded-lg hover:border-primary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
