import React, { useState } from 'react';
import { Menu, X, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  const navLinks = [
    { name: 'Elegir caja personalizada', href: '/cajas-personalizadas' },
    { name: 'Cajas ya armadas', href: '/cajas-armadas' },
    { name: 'Otros productos', href: '/productos' },
    { name: 'Servicio de fiesta y cáterin', href: '/catering' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-cream/80 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group">
            <div className="bg-primary text-cream p-2 rounded-full mr-2 group-hover:rotate-12 transition-transform duration-300">
              <ShoppingBag size={24} />
            </div>
            <span className="text-2xl font-bold text-primary-dark tracking-tight">
              Loop <span className="text-primary">Bakery</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-neutral-dark hover:text-primary transition-colors duration-200 font-medium text-sm uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 ml-4">
              <div className="relative cursor-pointer group">
                <ShoppingCart className="text-neutral-dark group-hover:text-primary transition-colors" size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-cream text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-cream animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </div>
              <button className="bg-primary text-cream px-6 py-2 rounded-full font-semibold hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-primary/20">
                Pedir ahora
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-dark p-2 rounded-md hover:bg-primary-light/20 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-cream border-b border-primary/10 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block px-3 py-4 text-base font-medium text-neutral-dark hover:text-primary hover:bg-primary-light/10 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <button className="w-full bg-primary text-cream px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all">
                Pedir ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
