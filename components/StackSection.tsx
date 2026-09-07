'use client';

import Image from 'next/image';
import type { Lang } from '@/types/i18b';

const stackGroups = [
   [
      'Frontend',
      [
         ['React', 'react'],
         ['Next.js', 'nextjs'],
         ['TypeScript', 'typescript'],
         ['JavaScript', 'javascript'],
         ['Tailwind CSS', 'tailwind'],
         ['Sass', 'sass'],
         ['Bootstrap', 'bootstrap'],
         ['HTML5', 'html5'],
         ['CSS3', 'css3'],
         ['GSAP', 'gsap'],
      ],
   ],
   [
      'Backend',
      [
         ['PHP', 'php'],
         ['Node.js', 'nodejs'],
         ['Express', 'express'],
         ['Supabase', 'supabase'],
         ['REST APIs', 'rest-api'],
      ],
   ],
   [
      'Databases',
      [
         ['PostgreSQL', 'postgresql'],
         ['MySQL', 'mysql'],
      ],
   ],
   [
      'Tools & platforms',
      [
         ['Git', 'git'],
         ['GitHub', 'github'],
         ['Vercel', 'vercel1'],
         ['Render', 'render1'],
         ['Expo', 'expo'],
         ['React Native', 'react'],
      ],
   ],
] as const;

export default function StackSection({ lang }: { lang: Lang }) {
   return (
      <section
         id="stack"
         className="w-full bg-zinc-100 px-6 py-24 dark:bg-zinc-950 sm:px-10 lg:px-20 lg:py-32"
      >
         <div className="mx-auto w-full max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-violet-400">
               {lang === 'es' ? 'Herramientas' : 'Toolkit'}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
               {lang === 'es'
                  ? 'Tecnologías con las que construyo.'
                  : 'Technologies I build with.'}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
               {lang === 'es'
                  ? 'Un stack que sigo ampliando a través de proyectos reales, aprendizaje continuo y curiosidad por entender cómo funciona cada capa.'
                  : 'A stack I keep expanding through real projects, continuous learning, and curiosity about how every layer works.'}
            </p>
            <div className="mt-14 space-y-12">
               {stackGroups.map(([group, technologies]) => (
                  <div key={group}>
                     <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                        {group}
                     </h3>
                     <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {technologies.map(([name, slug]) => (
                           <article
                              key={slug}
                              className="group relative flex min-h-36 flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 text-center transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-violet-400 hover:shadow-xl hover:shadow-violet-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-400"
                           >
                              <div className="relative size-14 transition-transform duration-300 ease-out group-hover:rotate-3 group-hover:scale-110">
                                 <Image
                                    src={`/stack/${slug}.png`}
                                    alt={`${name} logo`}
                                    fill
                                    sizes="3.5rem"
                                    className="object-contain"
                                 />
                              </div>
                              <h4 className="mt-4 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                                 {name}
                              </h4>
                              <span className="pointer-events-none absolute -right-8 -top-8 size-20 rounded-full bg-violet-400/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                           </article>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
