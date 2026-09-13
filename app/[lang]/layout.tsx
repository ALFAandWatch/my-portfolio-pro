import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import type { Lang } from '@/types/i18b';

export default async function PageLayout({
   children,
   params,
}: Readonly<{
   children: React.ReactNode;
   params: Promise<{ lang: string }>;
}>) {
   const { lang } = await params;
   const isValidLang = lang === 'es' || lang === 'en';

   if (!isValidLang) {
      redirect('/es');
   }

   return (
      <div className="flex min-h-dvh flex-col items-center font-sans bg-black">
         <Navbar lang={lang as Lang} />
         <main data-lang={lang} className="flex w-full flex-1 flex-col pt-16">
            <div className="w-full min-w-0">{children}</div>
         </main>
      </div>
   );
}
