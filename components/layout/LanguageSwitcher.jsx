'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, defaultLocale } from '@/i18n';

/**
 * Sélecteur de langue
 * Bascule entre FR / EN / ES
 */
export function LanguageSwitcher({ className = '' }) {
  const pathname = usePathname();
  const router = useRouter();

  // Extraire la locale actuelle du pathname
  const currentLocale = locales.find((locale) => pathname.startsWith(`/${locale}`)) || defaultLocale;

  const handleChange = (newLocale) => {
    // Remplacer la locale dans le pathname
    let newPath = pathname;

    if (currentLocale === defaultLocale && pathname === '/') {
      // / → /en ou /es
      newPath = `/${newLocale}`;
    } else if (currentLocale !== defaultLocale) {
      // /en/boutique → /es/boutique ou /boutique
      newPath = pathname.replace(`/${currentLocale}`, newLocale === defaultLocale ? '' : `/${newLocale}`);
    } else {
      // /boutique → /en/boutique
      newPath = `/${newLocale}${pathname}`;
    }

    router.push(newPath || '/');
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={`
            border-2 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors
            ${
              locale === currentLocale
                ? 'border-pau-yellow bg-pau-yellow text-pau-night'
                : 'border-gray-300 bg-white text-gray-700 hover:border-pau-night hover:text-pau-night'
            }
          `}
          aria-label={`Switch to ${localeNames[locale]}`}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
