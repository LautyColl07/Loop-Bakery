import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, ShieldX } from 'lucide-react';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isOwner, loading } = useAuth();

  // Cargando estado de auth
  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-primary-700 animate-spin" strokeWidth={1.5} />
          <p className="text-muted-foreground text-sm font-medium">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // No autenticado → redirige a login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Autenticado pero email no autorizado
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-card border border-red-100 p-10 max-w-md w-full text-center space-y-5">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <ShieldX className="w-8 h-8 text-red-500" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-purple-deep mb-2">
              Acceso denegado
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              El correo <strong className="text-red-600">{user.email}</strong> no tiene permiso
              para acceder al panel de administración de Loop Bakery.
            </p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 btn-primary text-sm"
          >
            ← Volver al sitio
          </a>
        </div>
      </div>
    );
  }

  // Autorizado ✅
  return <>{children}</>;
}
