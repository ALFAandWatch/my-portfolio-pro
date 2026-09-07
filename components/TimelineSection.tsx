'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import timelineData from '@/data/timeline.json';
import type { Lang } from '@/types/i18b';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type TimelineEntry = (typeof timelineData.experience)[number];

function TimelineGroup({
   entries,
   lang,
}: {
   entries: TimelineEntry[];
   lang: Lang;
}) {
   const orderedEntries = [...entries].sort((a, b) => {
      const yearA = Number(a.period.match(/\d{4}/)?.[0] ?? 0);
      const yearB = Number(b.period.match(/\d{4}/)?.[0] ?? 0);

      return yearA - yearB;
   });

   return (
      <div className="relative space-y-8 before:absolute before:bottom-4 before:left-[0.45rem] before:top-4 before:w-px before:bg-zinc-300 dark:before:bg-zinc-700">
         {orderedEntries.map((entry) => (
            <article
               key={`${entry.title[lang]}-${entry.period}`}
               data-timeline-card
               className="relative pl-8 opacity-0 transition-transform duration-300 hover:-translate-y-1"
            >
               <span className="absolute left-0 top-2 size-2 rounded-full ring-4 ring-white bg-violet-400 dark:ring-black" />
               <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/10 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-violet-400 sm:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                     <div>
                        <h3 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
                           {entry.title[lang]}
                        </h3>
                        <p className="mt-1 text-violet-400">
                           {entry.role[lang]}
                        </p>
                     </div>
                     <time className="shrink-0 text-sm font-medium text-zinc-500">
                        {entry.period}
                     </time>
                  </div>
                  <p className="mt-5 max-w-3xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                     {entry.description[lang]}
                  </p>
                  <ul
                     className="mt-6 flex flex-wrap gap-2"
                     aria-label="Technologies and skills"
                  >
                     {entry.tags.map((tag) => (
                        <li
                           key={tag}
                           className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
                        >
                           {tag}
                        </li>
                     ))}
                  </ul>
               </div>
            </article>
         ))}
      </div>
   );
}

export default function TimelineSection({ lang }: { lang: Lang }) {
   const sectionRef = useRef<HTMLElement>(null);

   useGSAP(
      () => {
         gsap.set('[data-timeline-card]', { y: 24 });

         gsap.to('[data-timeline-card]', {
            y: 24,
            opacity: 1,
            duration: 0.7,
            stagger: 0.16,
            ease: 'power2.out',
            scrollTrigger: {
               trigger: sectionRef.current,
               start: 'top 75%',
               once: true,
            },
         });
      },
      { scope: sectionRef }
   );

   return (
      <section
         ref={sectionRef}
         id="experience"
         className="w-full bg-zinc-100 px-6 py-24 dark:bg-zinc-950 sm:px-10 lg:px-20"
      >
         <div className="mx-auto w-full max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
               {lang === 'es' ? 'Recorrido' : 'Journey'}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
               {lang === 'es'
                  ? 'Experiencia y formación'
                  : 'Experience and education'}
            </h2>
            <div className="mt-14 space-y-16">
               <div>
                  <h3 className="mb-8 text-xl font-semibold text-zinc-700 dark:text-zinc-300">
                     {lang === 'es'
                        ? 'Experiencia profesional'
                        : 'Professional experience'}
                  </h3>
                  <TimelineGroup
                     entries={timelineData.experience}
                     lang={lang}
                  />
               </div>
               <div>
                  <h3 className="mb-8 text-xl font-semibold text-zinc-700 dark:text-zinc-300">
                     {lang === 'es' ? 'Estudios' : 'Education'}
                  </h3>
                  <TimelineGroup entries={timelineData.education} lang={lang} />
               </div>
            </div>
         </div>
      </section>
   );
}
