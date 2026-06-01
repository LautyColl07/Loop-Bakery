import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import { HomePage } from './pages';

function App() {
  return (
    <AppProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Más rutas se agregarán aquí (admin, etc.) */}
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AppProvider>
  );
}

export default App;
