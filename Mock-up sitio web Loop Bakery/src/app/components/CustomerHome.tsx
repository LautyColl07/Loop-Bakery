import { useState } from 'react';
import { ShoppingBag, Box, Cake, Users, Instagram, MessageCircle, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router';
import { CustomBoxBuilder } from './CustomBoxBuilder';
import { ProductCard } from './ProductCard';
import { OrderForm } from './OrderForm';

type TabType = 'personalizada' | 'armadas' | 'otros' | 'catering';

export function CustomerHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('armadas');
  const [showCustomBox, setShowCustomBox] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const prebuiltBoxes = [
    {
      id: 1,
      name: 'Caja Dulce Tentación',
      description: 'Selección de 6 cupcakes artesanales con decoración floral',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1713759980319-8199058cef6b?w=400',
      discount: 10
    },
    {
      id: 2,
      name: 'Caja Premium',
      description: 'Torta de 3 pisos con flores comestibles + 4 tarteletas',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1630534591989-7858079986a6?w=400',
      discount: 0
    },
    {
      id: 3,
      name: 'Caja Artesanal',
      description: 'Mix de tarteletas de frutas y merengue tostado',
      price: 6500,
      image: 'https://images.unsplash.com/photo-1764155535434-6cb2fa141e5e?w=400',
      discount: 15
    }
  ];

  const individualProducts = [
    {
      id: 4,
      name: 'Alfajor Triple',
      description: 'Alfajor de dulce de leche con coco rallado',
      price: 850,
      image: 'https://images.unsplash.com/photo-1717198100629-b1a59284ced9?w=400'
    },
    {
      id: 5,
      name: 'Porción de Torta',
      description: 'Porción de torta red velvet con cream cheese',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1643102012833-cc5f59e206f7?w=400'
    },
    {
      id: 6,
      name: 'Cupcake Individual',
      description: 'Cupcake con buttercream y decoración',
      price: 900,
      image: 'https://images.unsplash.com/photo-1710940945472-c601481a2c03?w=400'
    }
  ];

  const cateringOptions = [
    {
      people: '10-15 personas',
      description: 'Mesa dulce con variedad de postres + torta temática',
      price: 35000
    },
    {
      people: '20-30 personas',
      description: 'Catering completo con postres variados + torta de 2 pisos',
      price: 65000
    },
    {
      people: '40+ personas',
      description: 'Servicio premium con candy bar + torta personalizada',
      price: 95000
    }
  ];

  const tabs = [
    { id: 'personalizada' as TabType, label: 'Caja Personalizada', icon: Box },
    { id: 'armadas' as TabType, label: 'Cajas Armadas', icon: ShoppingBag },
    { id: 'otros' as TabType, label: 'Otros Productos', icon: Cake },
    { id: 'catering' as TabType, label: 'Cátering', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4 border-b border-primary-foreground/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-foreground text-primary rounded-full flex items-center justify-center">
                <Cake className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl">Loop Bakery</h1>
                <p className="text-sm opacity-90">Pastelería Artesanal</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-lg transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden md:inline">Login Dueña</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex gap-2 py-3 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'personalizada') {
                      setShowCustomBox(true);
                    }
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-primary-foreground text-primary'
                      : 'bg-primary-foreground/10 hover:bg-primary-foreground/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Cajas Armadas */}
        {activeTab === 'armadas' && (
          <section>
            <div className="text-center mb-12">
              <h2 className="mb-3">Cajas Ya Armadas</h2>
              <p className="text-muted-foreground">Selecciones curadas por nuestros pasteleros</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prebuiltBoxes.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={() => setShowOrderForm(true)} />
              ))}
            </div>
          </section>
        )}

        {/* Otros Productos */}
        {activeTab === 'otros' && (
          <section>
            <div className="text-center mb-12">
              <h2 className="mb-3">Otros Productos</h2>
              <p className="text-muted-foreground">Alfajores, porciones y postres individuales</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {individualProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={() => setShowOrderForm(true)} />
              ))}
            </div>
          </section>
        )}

        {/* Catering */}
        {activeTab === 'catering' && (
          <section>
            <div className="text-center mb-12">
              <h2 className="mb-3">Servicio de Catering</h2>
              <p className="text-muted-foreground">Eventos y celebraciones especiales</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {cateringOptions.map((option, index) => (
                <div key={index} className="bg-card border-2 border-accent rounded-xl p-6 hover:border-primary transition-colors">
                  <div className="text-center mb-4">
                    <Users className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="text-xl mb-2">{option.people}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 text-center">{option.description}</p>
                  <p className="text-2xl text-primary text-center mb-4">${option.price.toLocaleString()}</p>
                  <button
                    onClick={() => setShowOrderForm(true)}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Solicitar Presupuesto
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Order Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowOrderForm(true)}
            className="bg-primary text-primary-foreground px-12 py-4 rounded-xl text-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Realizar Pedido
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-center mb-6">Contacto</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a
              href="https://wa.me/5491167905119"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg hover:text-primary transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
              <span>+54 11 6790-5119</span>
            </a>
            <a
              href="https://instagram.com/loopbakery"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg hover:text-primary transition-colors"
            >
              <Instagram className="w-6 h-6 text-[#E4405F]" />
              <span>@loopbakery</span>
            </a>
          </div>
          <p className="text-center text-muted-foreground mt-8">Loop Bakery © 2026 - Pastelería Artesanal</p>
        </div>
      </footer>

      {/* Modals */}
      {showCustomBox && <CustomBoxBuilder onClose={() => setShowCustomBox(false)} onComplete={() => {
        setShowCustomBox(false);
        setShowOrderForm(true);
      }} />}
      {showOrderForm && <OrderForm onClose={() => setShowOrderForm(false)} />}
    </div>
  );
}
