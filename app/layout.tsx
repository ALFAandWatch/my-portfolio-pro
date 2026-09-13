import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
   variable: '--font-poppins',
   weight: ['400', '500', '600', '700'],
   subsets: ['latin'],
});

export const metadata: Metadata = {
   title: 'Alfonso Gonzalez | Portfolio',
   description:
      'Este es mi portfolio personal, donde muestro mis proyectos y habilidades como desarrollador web.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
   return (
      <html lang="en" className={`${poppins.variable} h-full antialiased`}>
         <body className="min-h-full flex flex-col">{children}</body>
      </html>
   );
}
