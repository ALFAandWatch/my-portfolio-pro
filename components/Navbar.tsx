import Link from 'next/link';
import type { Lang } from '@/types/i18b';

const languages: { code: Lang; label: string }[] = [
   { code: 'es', label: 'ES' },
   { code: 'en', label: 'EN' },
];

export default function Navbar({ lang }: { lang: Lang }) {
   return (
      <nav
         data-navbar
         aria-label="Language selection"
         className="fixed inset-x-0 top-0 z-50 flex h-16 w-full shrink-0 items-center justify-end border-b border-zinc-200/80 bg-white/90 px-4 backdrop-blur dark:border-zinc-800 dark:bg-black/90 sm:px-6 lg:px-8"
      >
         <div className="flex items-center gap-2" aria-label="Idioma">
            {languages.map(({ code, label }) => {
               const isActive = code === lang;

               return (
                  <Link
                     key={code}
                     href={`/${code}`}
                     aria-current={isActive ? 'page' : undefined}
                     className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                        isActive
                           ? 'bg-emerald-600 text-white dark:bg-violet-500'
                           : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900'
                     }`}
                  >
                     {label}
                  </Link>
               );
            })}
         </div>
      </nav>
   );
}
