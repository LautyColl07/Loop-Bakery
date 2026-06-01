import { ShoppingCart, Tag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="bg-card rounded-xl overflow-hidden border-2 border-accent hover:border-primary transition-all hover:shadow-lg group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && product.discount > 0 && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Tag className="w-4 h-4" />
            <span className="text-sm">-{product.discount}%</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 h-10">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          {product.discount && product.discount > 0 ? (
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground line-through">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-2xl text-primary">
                ${finalPrice.toLocaleString()}
              </span>
            </div>
          ) : (
            <span className="text-2xl text-primary">
              ${product.price.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={onAddToCart}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        >
          <ShoppingCart className="w-5 h-5" />
          Agregar
        </button>
      </div>
    </div>
  );
}
