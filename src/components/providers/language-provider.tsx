'use client';

import { LanguageProvider } from '@/stores/language-store.tsx';
import { type ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
