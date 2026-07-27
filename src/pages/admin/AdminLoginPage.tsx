import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cake, Loader2, ShieldCheck, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const OWNER_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? 'lautarocollblanco@gmail.com';

export function AdminLoginPage() {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setSigningIn(true);
    try {
      await signIn();
      // La verificación del email la hace ProtectedRoute al navegar a /admin
      navigate('/admin');
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError('El popup fue cerrado. Intentá de nuevo.');
      } else if (code === 'auth/popup-blocked') {
        setError('El popup fue bloqueado por el navegador. Permitílo e intentá de nuevo.');
      } else {
        setError('Ocurrió un error al iniciar sesión. Intentá de nuevo.');
      }
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-deep via-primary-800 to-primary-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-lila-DEFAULT/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary-400/15 blur-3xl pointer-events-none" />

      {/* Card central */}
      <div className="relative z-10 w-full max-w-md">

        {/* Volver al sitio */}
        <a
          href="/"
          id="admin-login-back"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Volver al sitio
        </a>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header de la card */}
          <div className="bg-gradient-to-r from-purple-deep to-primary-700 px-8 py-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4">
              <Cake className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              Loop Bakery
            </h1>
            <p className="text-lila-light text-sm">Panel de Administración</p>
          </div>

          {/* Cuerpo */}
          <div className="px-8 py-8 space-y-6">
            {/* Info de acceso restringido */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary-50 border border-primary-100">
              <ShieldCheck className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
              <div>
                <p className="font-semibold text-purple-deep text-sm">Acceso restringido</p>
                <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">
                  Solo el propietario de Loop Bakery puede ingresar. Cualquier otra cuenta de
                  Google será rechazada automáticamente.
                </p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 animate-fade-in">
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Botón Google */}
            <button
              id="admin-google-signin"
              onClick={handleSignIn}
              disabled={signingIn || loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200
                rounded-2xl font-semibold text-gray-700 text-sm
                hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card
                disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              {signingIn ? (
                <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2} />
              ) : (
                /* Logo de Google SVG */
                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              {signingIn ? 'Iniciando sesión...' : 'Ingresar con Google'}
            </button>

            {/* Nota */}
            <p className="text-center text-xs text-muted-foreground">
              Solo la cuenta <strong>{OWNER_EMAIL}</strong> puede acceder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
