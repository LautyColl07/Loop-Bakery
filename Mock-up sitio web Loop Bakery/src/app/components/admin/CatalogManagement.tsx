import { useState } from 'react';
import { Tag, Eye, EyeOff, Edit2, Trash2, Plus } from 'lucide-react';
import { ProductEditModal } from './ProductEditModal';

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

export function CatalogManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Caja Dulce Tentación',
      description: 'Selección de 6 cupcakes artesanales',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1713759980319-8199058cef6b?w=150',
      active: true,
      discount: 10,
      stock: 24
    },
    {
      id: 2,
      name: 'Caja Premium',
      description: 'Torta de 3 pisos + 4 tarteletas',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1630534591989-7858079986a6?w=150',
      active: true,
      discount: 0,
      stock: 8
    },
    {
      id: 3,
      name: 'Caja Artesanal',
      description: 'Mix de tarteletas variadas',
      price: 6500,
      image: 'https://images.unsplash.com/photo-1764155535434-6cb2fa141e5e?w=150',
      active: true,
      discount: 15,
      stock: 15
    },
    {
      id: 4,
      name: 'Alfajor Triple',
      description: 'Alfajor con dulce de leche',
      price: 850,
      image: 'https://images.unsplash.com/photo-1717198100629-b1a59284ced9?w=150',
      active: true,
      discount: 0,
      stock: 42
    },
    {
      id: 5,
      name: 'Porción de Torta',
      description: 'Red velvet con cream cheese',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1643102012833-cc5f59e206f7?w=150',
      active: false,
      discount: 0,
      stock: 0
    },
    {
      id: 6,
      name: 'Cupcake Individual',
      description: 'Con buttercream y decoración',
      price: 900,
      image: 'https://images.unsplash.com/photo-1710940945472-c601481a2c03?w=150',
      active: true,
      discount: 5,
      stock: 18
    },
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const toggleActive = (id: number) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  const updateDiscount = (id: number, discount: number) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, discount } : p
    ));
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('¿Estás segura de que quieres eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">Administrar Catálogo</h1>
        <p className="text-muted-foreground">Gestiona productos, precios y descuentos</p>
      </div>

      <div className="bg-card border-2 border-accent rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4">Producto</th>
                <th className="text-left p-4">Descripción</th>
                <th className="text-left p-4">Precio</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Descuento</th>
                <th className="text-left p-4">Estado</th>
                <th className="text-left p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-accent hover:bg-accent/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-accent"
                      />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground text-sm max-w-xs">
                    {product.description}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      {product.discount > 0 ? (
                        <>
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price.toLocaleString()}
                          </span>
                          <span className="text-primary">
                            ${(product.price * (1 - product.discount / 100)).toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span>${product.price.toLocaleString()}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      product.stock > 10 ? 'bg-primary/20 text-primary' :
                      product.stock > 0 ? 'bg-accent text-accent-foreground' :
                      'bg-destructive/20 text-destructive'
                    }`}>
                      {product.stock} unidades
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={product.discount}
                        onChange={(e) => updateDiscount(product.id, parseInt(e.target.value) || 0)}
                        className="w-20 px-3 py-2 rounded-lg border-2 border-accent focus:border-primary outline-none bg-input-background"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleActive(product.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        product.active
                          ? 'bg-primary/20 text-primary hover:bg-primary/30'
                          : 'bg-muted text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      {product.active ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between bg-card border-2 border-accent rounded-xl p-6">
        <div>
          <p className="mb-1">Total de productos: {products.length}</p>
          <p className="text-sm text-muted-foreground">
            Activos: {products.filter(p => p.active).length} •
            Inactivos: {products.filter(p => !p.active).length} •
            Con descuento: {products.filter(p => p.discount > 0).length}
          </p>
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Agregar Nuevo Producto
        </button>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
