// ─────────────────────────────────────────────────────────────
// Firebase config — Loop Bakery
// ─────────────────────────────────────────────────────────────
// Reemplazá estos valores con los de tu proyecto Firebase:
// Firebase Console → Configuración del proyecto → Tus apps → SDK
// ─────────────────────────────────────────────────────────────
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';

// TODO: Reemplazá con tus credenciales reales de Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'PLACEHOLDER',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'PLACEHOLDER',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'PLACEHOLDER',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? 'PLACEHOLDER',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? 'PLACEHOLDER',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? 'PLACEHOLDER',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/** Abre el popup de Google Sign-In */
export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

/** Cierra la sesión del usuario actual */
export async function signOutUser() {
  return firebaseSignOut(auth);
}
