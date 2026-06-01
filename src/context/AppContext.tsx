import { createContext, useContext, useState, ReactNode } from 'react';
import type { TabType } from '../types';

// ─────────────────────────────────────────────────────────────
// App Context — navegación y UI global
// ─────────────────────────────────────────────────────────────

interface AppContextValue {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('armadas');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AppContext.Provider value={{ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
