import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CatalogProvider } from './context/CatalogContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { HomePage } from './pages';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <CatalogProvider>
        <AppProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                {/* ── Cliente ─────────────────────── */}
                <Route path="/" element={<HomePage />} />

                {/* ── Admin ───────────────────────── */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AppProvider>
      </CatalogProvider>
    </AuthProvider>
  );
}

export default App;
