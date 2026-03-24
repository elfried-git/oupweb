'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { translations } from '@/locales/translations';

// French only - no language switching
const TRANSLATIONS = translations.fr;

interface LanguageContextValue {
  t: typeof translations.fr;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => ({ t: TRANSLATIONS }), []);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    return { t: TRANSLATIONS };
  }
  return context;
}
