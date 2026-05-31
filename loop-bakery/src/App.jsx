import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CajasArmadas from './pages/Client/CajasArmadas';
import OtrosProductos from './pages/Client/OtrosProductos';
import Catering from './pages/Client/Catering';

import { Link } from 'react-router-dom';

// Simple Home component to avoid a blank page
const Home = () => (
  <div className="h-[80vh] flex items-center justify-center text-center px-4">
    <div className="space-y-6 animate-in fade-in zoom-in duration-700">
      <h1 className="text-5xl md:text-7xl font-bold text-primary-dark tracking-tight">
        Bienvenido a <span className="text-primary italic">Loop Bakery</span>
      </h1>
      <p className="text-lg text-neutral-dark max-w-2xl mx-auto font-light">
        Explora nuestras delicias artesanales y personaliza tu experiencia dulce.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/cajas-armadas" className="bg-primary text-cream px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-all shadow-lg">
          Ver Cajas Armadas
        </Link>
        <Link to="/productos" className="bg-white text-primary-dark border border-primary/20 px-8 py-3 rounded-full font-bold hover:bg-primary-light/10 transition-all">
          Otros Productos
        </Link>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-cream">
          <Navbar />

          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cajas-armadas" element={<CajasArmadas />} />
              <Route path="/productos" element={<OtrosProductos />} />
              <Route path="/catering" element={<Catering />} />
              <Route path="*" element={<div className="flex items-center justify-center h-screen text-primary-dark font-bold">404 - Página no encontrada</div>} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
