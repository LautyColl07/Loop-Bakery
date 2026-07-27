import {
  createContext, useContext, useEffect, useState, ReactNode,
} from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, signOutUser } from '../lib/firebase';

// Email único autorizado para el panel admin
// Se lee del .env.local para que sea configurable sin tocar el código
const OWNER_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? 'lautarocollblanco@gmail.com';

// ─────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: User | null;
  isOwner: boolean;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const isOwner = user?.email?.toLowerCase() === OWNER_EMAIL.toLowerCase();

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await signOutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isOwner, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
