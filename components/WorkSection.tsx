import { useWorkAnimation } from '@/hooks/useWorkAnimation';
import type { Lang } from '@/types/i18b';
import { useRef } from 'react';

export default function WorkSection({ lang }: { lang: Lang }) {
   const workRef = useRef<HTMLElement>(null);

   useWorkAnimation({ workRef });

   return (
      <section
         id="work"
         className="w-full px-6 py-24 bg-black sm:px-10 lg:px-20 overflow-hidden"
         ref={workRef}
      >
         <div className="mx-auto w-full max-w-6xl">
            <div className="work-title-wrapper mt-20">
               <p className="work-title z-1 text-4xl font-black uppercase tracking-[0.3em] text-cyan-200">
                  {lang === 'es'
                     ? 'Cómo puedo aportar'
                     : 'How I can contribute'}
               </p>
            </div>
            <div className="mt-42 gap-35 flex flex-col w-[80%] mx-auto">
               {(lang === 'es'
                  ? [
                       [
                          '01',
                          'Interfaces frontend',
                          'Construyo interfaces responsive, accesibles y reutilizables con React, Next.js y TypeScript.',
                          'CompanyRadar',
                          'React · Next.js · TypeScript',
                       ],
                       [
                          '02',
                          'Datos y backend',
                          'Conecto la interfaz con APIs, autenticación, bases de datos y servicios backend para convertir una pantalla en una aplicación funcional.',
                          'ClickNest',
                          'Supabase · PostgreSQL · REST APIs',
                       ],
                       [
                          '03',
                          'Interacción y feedback',
                          'Diseño estados de carga, éxito, error y vacío, además de animaciones con propósito para que cada acción sea comprensible.',
                          'Planner.uy',
                          'GSAP · UI states · Motion',
                       ],
                       [
                          '04',
                          'De idea a producto publicado',
                          'Puedo acompañar el proyecto desde la estructura inicial hasta el deploy, el responsive y las mejoras posteriores.',
                          'SportTickers',
                          'Git · Vercel · Supabase',
                       ],
                    ]
                  : [
                       [
                          '01',
                          'Frontend interfaces',
                          'I build responsive, accessible, and reusable interfaces with React, Next.js, and TypeScript.',
                          'CompanyRadar',
                          'React · Next.js · TypeScript',
                       ],
                       [
                          '02',
                          'Data and backend',
                          'I connect interfaces with APIs, authentication, databases, and backend services to turn screens into functional applications.',
                          'ClickNest',
                          'Supabase · PostgreSQL · REST APIs',
                       ],
                       [
                          '03',
                          'Interaction and feedback',
                          'I design loading, success, error, and empty states, plus purposeful motion that helps users understand every action.',
                          'Planner.uy',
                          'GSAP · UI states · Motion',
                       ],
                       [
                          '04',
                          'From idea to shipped product',
                          'I can support a project from its initial structure through deployment, responsive refinement, and continued improvements.',
                          'SportTickers',
                          'Git · Vercel · Supabase',
                       ],
                    ]
               ).map(([number, title, description, evidence, stack]) => (
                  <article
                     key={number}
                     className="group animated-card lg:w-[50%] z-10 opacity-0 odd:ms-auto rounded-2xl border p-6 transition-[border-color,box-shadow] duration-300 border-cyan-400/30 bg-cyan-400/40 shadow-2xl shadow-cyan-400/30"
                  >
                     <span className="font-mono text-sm text-cyan-200">
                        {number}
                     </span>
                     <h3 className="mt-8 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
                        {title}
                     </h3>
                     <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {description}
                     </p>
                     <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                           {lang === 'es' ? 'Evidencia:' : 'Evidence:'}{' '}
                           <span className="text-cyan-200">{evidence}</span>
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                           {stack}
                        </span>
                     </div>
                  </article>
               ))}
            </div>
         </div>
      </section>
   );
}
