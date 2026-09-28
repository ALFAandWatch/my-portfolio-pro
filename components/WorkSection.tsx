import { useWorkAnimation } from '@/hooks/useWorkAnimation';
import type { Lang } from '@/types/i18b';
import { useRef } from 'react';

type Card = {
   number: string;
   title: string;
   description: string;
   stack: string[];
};

export default function WorkSection({ lang }: { lang: Lang }) {
   const workRef = useRef<HTMLElement>(null);

   useWorkAnimation({ workRef });

   const cards: Card[] =
      lang === 'es'
         ? [
              {
                 number: '01',
                 title: 'Interfaces frontend',
                 description:
                    'Construyo interfaces responsive, accesibles y reutilizables con React, Next.js y TypeScript.',
                 stack: ['React', 'Next.js', 'TypeScript'],
              },
              {
                 number: '02',
                 title: 'Datos y backend',
                 description:
                    'Conecto la interfaz con APIs, autenticación, bases de datos y servicios backend para convertir una pantalla en una aplicación funcional.',
                 stack: ['Supabase', 'PostgreSQL', 'REST APIs'],
              },
              {
                 number: '03',
                 title: 'Interacción y feedback',
                 description:
                    'Diseño estados de carga, éxito, error y vacío, además de animaciones con propósito para que cada acción sea comprensible.',
                 stack: ['GSAP', 'UI states', 'Motion'],
              },
              {
                 number: '04',
                 title: 'De idea a producto publicado',
                 description:
                    'Puedo acompañar el proyecto desde la estructura inicial hasta el deploy, el responsive y las mejoras posteriores.',
                 stack: ['Git', 'Vercel', 'Supabase'],
              },
           ]
         : [
              {
                 number: '01',
                 title: 'Frontend interfaces',
                 description:
                    'I build responsive, accessible, and reusable interfaces with React, Next.js, and TypeScript.',
                 stack: ['React', 'Next.js', 'TypeScript'],
              },
              {
                 number: '02',
                 title: 'Data and backend',
                 description:
                    'I connect interfaces with APIs, authentication, databases, and backend services to turn screens into functional applications.',
                 stack: ['Supabase', 'PostgreSQL', 'REST APIs'],
              },
              {
                 number: '03',
                 title: 'Interaction and feedback',
                 description:
                    'I design loading, success, error, and empty states, plus purposeful motion that helps users understand every action.',
                 stack: ['GSAP', 'UI states', 'Motion'],
              },
              {
                 number: '04',
                 title: 'From idea to shipped product',
                 description:
                    'I can support a project from its initial structure through deployment, responsive refinement, and continued improvements.',
                 stack: ['Git', 'Vercel', 'Supabase'],
              },
           ];

   return (
      <section
         id="work"
         className="w-full px-6 py-24 bg-black sm:px-10 lg:px-20 overflow-hidden"
         ref={workRef}
      >
         <div className="mx-auto w-full max-w-6xl">
            <div className="work-title-wrapper mt-20">
               <p className="work-title z-1 text-3xl md:text-5xl font-black uppercase tracking-[0.3em] text-cyan-200 pb-80">
                  {lang === 'es'
                     ? 'Cómo puedo aportar'
                     : 'How I can contribute'}
               </p>
            </div>
            <div className="gap-35 flex flex-col w-[80%] mx-auto">
               {cards.map(({ number, title, description, stack }) => (
                  <article
                     key={number}
                     className="group animated-card lg:w-[40%] lg:aspect-square z-10 opacity-0 odd:ms-auto rounded-2xl border p-6 transition-[border-color,box-shadow] duration-300 border-cyan-400/30 bg-cyan-950"
                  >
                     <span className="font-mono text-md text-cyan-200">
                        {number}
                     </span>
                     <h3 className="mt-8 text-3xl font-semibold text-zinc-100">
                        {title}
                     </h3>
                     <p className="mt-3 leading-relaxed text-zinc-300 text-lg">
                        {description}
                     </p>
                     <div className="mt-4 flex flex-wrap items-center gap-3 border-zinc-200 pt-4 dark:border-zinc-800">
                        {stack.map((text, i) => (
                           <span
                              key={i}
                              className="text-sm text-zinc-100 bg-cyan-800/90 p-4 py-2 rounded-full"
                           >
                              {text}
                           </span>
                        ))}
                     </div>
                  </article>
               ))}
            </div>
         </div>
      </section>
   );
}
