import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { X, Package, Check } from 'lucide-react';

interface BoxItem {
  id: string;
  name: string;
  image: string;
}

interface CustomBoxBuilderProps {
  onClose: () => void;
  onComplete: () => void;
}

const availableProducts: BoxItem[] = [
  { id: 'p1', name: 'Cupcake Vainilla', image: 'https://images.unsplash.com/photo-1713759980319-8199058cef6b?w=150' },
  { id: 'p2', name: 'Cupcake Chocolate', image: 'https://images.unsplash.com/photo-1710940945472-c601481a2c03?w=150' },
  { id: 'p3', name: 'Tarteleta Frutas', image: 'https://images.unsplash.com/photo-1764155535434-6cb2fa141e5e?w=150' },
  { id: 'p4', name: 'Alfajor', image: 'https://images.unsplash.com/photo-1717198100629-b1a59284ced9?w=150' },
  { id: 'p5', name: 'Mini Torta', image: 'https://images.unsplash.com/photo-1643102012833-cc5f59e206f7?w=150' },
  { id: 'p6', name: 'Macaron', image: 'https://images.unsplash.com/photo-1754294437651-2a79a3f1888b?w=150' },
];

const boxSizes = [
  { size: 4, name: 'Pequeña', price: 3500 },
  { size: 6, name: 'Mediana', price: 5000 },
  { size: 9, name: 'Grande', price: 7000 },
];

function DraggableProduct({ product }: { product: BoxItem }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'product',
    item: product,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-card border-2 border-accent rounded-lg p-3 cursor-move hover:border-primary transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <img src={product.image} alt={product.name} className="w-full h-20 object-cover rounded mb-2" />
      <p className="text-xs text-center">{product.name}</p>
    </div>
  );
}

function BoxSlot({ index, item, onDrop }: { index: number; item: BoxItem | null; onDrop: (item: BoxItem) => void }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'product',
    drop: (droppedItem: BoxItem) => onDrop(droppedItem),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`border-2 border-dashed rounded-lg p-2 flex items-center justify-center min-h-24 transition-all ${
        isOver ? 'border-primary bg-primary/10' : item ? 'border-accent bg-card' : 'border-muted bg-muted/30'
      }`}
    >
      {item ? (
        <div className="text-center">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mb-1 mx-auto" />
          <p className="text-xs">{item.name}</p>
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <Package className="w-8 h-8 mx-auto mb-1 opacity-50" />
          <p className="text-xs">Arrastra aquí</p>
        </div>
      )}
    </div>
  );
}

function CustomBoxBuilderContent({ onClose, onComplete }: CustomBoxBuilderProps) {
  const [selectedSize, setSelectedSize] = useState(boxSizes[1]);
  const [boxItems, setBoxItems] = useState<(BoxItem | null)[]>(Array(selectedSize.size).fill(null));

  const handleDrop = (index: number, item: BoxItem) => {
    const newBoxItems = [...boxItems];
    newBoxItems[index] = item;
    setBoxItems(newBoxItems);
  };

  const handleSizeChange = (size: typeof boxSizes[0]) => {
    setSelectedSize(size);
    setBoxItems(Array(size.size).fill(null));
  };

  const isFull = boxItems.every(item => item !== null);
  const filledCount = boxItems.filter(item => item !== null).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl mb-1">Arma tu Caja Personalizada</h2>
            <p className="text-sm opacity-90">Arrastra tus productos favoritos a la caja</p>
          </div>
          <button onClick={onClose} className="hover:bg-primary-foreground/20 p-2 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Size Selection */}
          <div className="mb-8">
            <h3 className="mb-4">Elige el tamaño de tu caja</h3>
            <div className="grid grid-cols-3 gap-4">
              {boxSizes.map(size => (
                <button
                  key={size.size}
                  onClick={() => handleSizeChange(size)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedSize.size === size.size
                      ? 'border-primary bg-primary/10'
                      : 'border-accent hover:border-primary'
                  }`}
                >
                  <p className="mb-1">{size.name}</p>
                  <p className="text-sm text-muted-foreground mb-2">{size.size} productos</p>
                  <p className="text-xl text-primary">${size.price.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Products */}
            <div>
              <h3 className="mb-4">Productos Disponibles</h3>
              <div className="grid grid-cols-3 gap-3">
                {availableProducts.map(product => (
                  <DraggableProduct key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Box Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3>Tu Caja ({filledCount}/{selectedSize.size})</h3>
                {isFull && (
                  <div className="flex items-center gap-2 text-primary">
                    <Check className="w-5 h-5" />
                    <span className="text-sm">Completa</span>
                  </div>
                )}
              </div>
              <div className={`grid gap-3 ${
                selectedSize.size === 4 ? 'grid-cols-2' : selectedSize.size === 6 ? 'grid-cols-3' : 'grid-cols-3'
              }`}>
                {boxItems.map((item, index) => (
                  <BoxSlot key={index} index={index} item={item} onDrop={(droppedItem) => handleDrop(index, droppedItem)} />
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-accent rounded-lg hover:border-primary transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onComplete}
              disabled={!isFull}
              className={`px-6 py-3 rounded-lg transition-colors ${
                isFull
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              Agregar al Pedido · ${selectedSize.price.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CustomBoxBuilder(props: CustomBoxBuilderProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <CustomBoxBuilderContent {...props} />
    </DndProvider>
  );
}
