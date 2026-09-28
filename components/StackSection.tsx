'use client';

import Image from 'next/image';
import type { Lang } from '@/types/i18b';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stackGroups = [
   [
      'Frontend',
      [
         ['React', 'react'],
         ['Next.js', 'nextjs'],
         ['TypeScript', 'typescript'],
         ['JavaScript', 'javascript'],
         ['Tailwind CSS', 'tailwind'],
         ['Bootstrap', 'bootstrap'],
         ['HTML5', 'html5'],
         ['CSS3', 'css3'],
         ['GSAP', 'gsap'],
      ],
   ],
   [
      'Backend',
      [
         ['Node.js', 'nodejs'],
         ['Express', 'express'],
         ['Supabase', 'supabase'],
         ['PostgreSQL', 'postgresql'],
      ],
   ],
   [
      'Tools & platforms',
      [
         ['Git', 'git'],
         ['GitHub', 'github'],
         ['Vercel', 'vercel1'],
      ],
   ],
   [
      'A little experience with',
      [
         ['PHP', 'php'],
         ['Python', 'python'],
         ['Sass', 'sass'],
         ['Expo', 'expo'],
         ['React Native', 'react'],
         ['Render', 'render1'],
         ['Codex', 'codex'],
      ],
   ],
] as const;

export default function StackSection({ lang }: { lang: Lang }) {
   const sectionRef = useRef<HTMLElement>(null);

   useGSAP(
      () => {
         gsap.fromTo(
            '.stack-title',
            {
               x: 1500,
               opacity: 0.2,
            },
            {
               x: 0,
               opacity: 0.8,
               ease: 'circ.out',
               duration: 1.5,
               scrollTrigger: {
                  trigger: '.stack-title',
                  start: 'top 90%',
                  end: 'top -=400',
                  invalidateOnRefresh: true,
                  once: true,
               },
            }
         );

         const subtitles = gsap.utils.toArray<HTMLElement>(
            '.stack-subtitle',
            sectionRef.current
         );
         subtitles.forEach((subtitle) => {
            gsap.fromTo(
               subtitle,
               {
                  x: 1500,
                  opacity: 0.2,
               },
               {
                  x: 0,
                  opacity: 0.8,
                  ease: 'circ.out',
                  duration: 1.5,
                  delay: 2,
                  scrollTrigger: {
                     trigger: subtitle,
                     start: 'top 90%',
                     end: 'top -=400',
                     invalidateOnRefresh: true,
                     once: true,
                  },
               }
            );
         });

         const groups = gsap.utils.toArray<HTMLElement>(
            '[data-stack-group]',
            sectionRef.current
         );
         groups.forEach((group) => {
            const cards = gsap.utils.toArray<HTMLElement>(
               '[data-stack-card]',
               group
            );

            gsap.fromTo(
               cards,
               {
                  scale: 0.2,
                  opacity: 0,
               },
               {
                  scale: 1,
                  opacity: 1,
                  duration: 0.7,
                  stagger: 0.25,
                  ease: 'back.out(3)',
                  scrollTrigger: {
                     trigger: group,
                     start: 'top 70%',
                     once: true,
                  },
               }
            );
         });
      },
      { scope: sectionRef }
   );

   return (
      <section
         id="stack"
         ref={sectionRef}
         className="w-full overflow-hidden px-6 py-24 bg-black sm:px-10 lg:px-20 lg:py-32"
      >
         <div className="mx-auto w-full max-w-6xl">
            <h2 className="stack-title mt-5 max-w-3xl text-4xl font-bold tracking-tight text-cyan-200 sm:text-5xl">
               {lang === 'es'
                  ? 'Tecnologías con las que construyo.'
                  : 'Technologies I build with.'}
            </h2>
            <div className="mt-14 space-y-12">
               {stackGroups.map(([group, technologies]) => (
                  <div key={group} data-stack-group>
                     <h3 className="stack-subtitle mb-5 text-xl font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                        {group}
                     </h3>
                     <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {technologies.map(([name, slug]) => (
                           <article
                              key={slug}
                              data-stack-card
                              className="group relative flex min-h-36 flex-col items-center justify-center overflow-hidden rounded-2xl border text-center transition-[transform,border-color,box-shadow, translate] duration-300 hover:-translate-2 hover:-translate-y-1.5 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-400/30 border-zinc-800 bg-cyan-950"
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
