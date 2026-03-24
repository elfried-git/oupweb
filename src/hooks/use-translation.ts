'use client';

import { useLanguageStore } from '@/stores/language-store';
import { translations } from '@/locales/translations';

export function useTranslation() {
  const { language } = useLanguageStore();
  const t = translations[language];
  
  return { t, language };
}
