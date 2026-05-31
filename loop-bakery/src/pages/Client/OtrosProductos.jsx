import React from 'react';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const finalPrice = product.discountPrice || product.price;

  return (
    <div className="group bg-white rounded-3xl border border-primary/10 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-primary-dark">
          {product.name}
        </h3>
        <p className="text-neutral text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            {product.discountPrice && (
              <span className="text-neutral-dark/40 text-xs line-through">
                ${product.price.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-black text-primary-dark">
              ${finalPrice.toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="bg-primary text-cream p-2 rounded-xl hover:bg-primary-dark transition-all active:scale-90"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const OtrosProductos = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-dark tracking-tight">
          Otros <span className="text-primary italic">Productos</span>
        </h1>
        <p className="text-neutral-dark max-w-2xl mx-auto text-lg">
          Antojos individuales y delicias sueltas para endulzar tu día.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.others.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OtrosProductos;
