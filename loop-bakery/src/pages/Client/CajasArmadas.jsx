import React from 'react';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Tag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const finalPrice = product.discountPrice || product.price;

  return (
    <div className="group bg-white rounded-3xl border border-primary/10 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.discountPrice && (
          <div className="absolute top-4 right-4 bg-primary text-cream px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Tag size={12} />
            <span>OFERTA</span>
          </div>
        )}
      </div>
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold text-primary-dark group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-neutral text-sm line-clamp-2 min-h-[40px]">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-4">
          <div className="flex flex-col">
            {product.discountPrice && (
              <span className="text-neutral-dark/40 text-xs line-through">
                ${product.price.toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-black text-primary-dark">
              ${finalPrice.toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="bg-primary text-cream p-3 rounded-2xl hover:bg-primary-dark transition-all active:scale-90 shadow-md hover:shadow-primary/30"
            title="Agregar al carrito"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CajasArmadas = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-dark tracking-tight">
          Cajas <span className="text-primary italic">Ya Armadas</span>
        </h1>
        <p className="text-neutral-dark max-w-2xl mx-auto text-lg">
          Selecciones curadas por nuestros maestros pasteleros. La opción ideal para regalar sin complicaciones.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PRODUCTS.boxes.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CajasArmadas;
