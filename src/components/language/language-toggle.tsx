'use client';

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguageStore } from '@/stores/language-store';
import { translations } from '@/locales/translations';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore();
  const t = translations[language];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" data-testid="language-toggle">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setLanguage('fr')} 
          className={`cursor-pointer ${language === 'fr' ? 'bg-accent' : ''}`}
          data-testid="lang-fr"
        >
          <span className="mr-2">🇫🇷</span>
          {t.profile.french}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('en')} 
          className={`cursor-pointer ${language === 'en' ? 'bg-accent' : ''}`}
          data-testid="lang-en"
        >
          <span className="mr-2">🇬🇧</span>
          {t.profile.english}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
