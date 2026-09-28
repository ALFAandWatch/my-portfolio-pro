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
      <div className="relative perspective-distant space-y-8 before:absolute before:bottom-4 before:left-[0.45rem] before:top-4 before:w-px before:bg-cyan-700">
         {orderedEntries.map((entry, i) => (
            <article
               key={`${entry.title[lang]}-${entry.period}`}
               data-timeline-card
               style={{ transformStyle: 'preserve-3d', zIndex: -i }}
               className="relative pl-8 opacity-0 duration-300"
            >
               <span className="absolute left-0 top-2 size-2 rounded-full ring-4 ring-white bg-cyan-200 dark:ring-black" />
               <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:-translate-2 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/30 dark:border-zinc-800 dark:bg-cyan-950 sm:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                     <div>
                        <h3 className="text-2xl font-semibold text-zinc-100">
                           {entry.title[lang]}
                        </h3>
                        <p className="mt-1 text-cyan-200">{entry.role[lang]}</p>
                     </div>
                     <time className="shrink-0 text-sm font-medium text-zinc-500">
                        {entry.period}
                     </time>
                  </div>
                  <p className="mt-5 max-w-3xl leading-relaxed text-zinc-300">
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
         gsap.fromTo(
            '.timeline-title',
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
                  trigger: '.timeline-title',
                  start: 'top 90%',
                  end: 'top -=400',
                  invalidateOnRefresh: true,
                  once: true,
               },
            }
         );

         const subtitles = gsap.utils.toArray<HTMLElement>(
            '.timeline-subtitle',
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

         const timelineCard = gsap.utils.toArray<HTMLElement>(
            '[data-timeline-card]',
            sectionRef.current
         );
         timelineCard.forEach((tCard) =>
            gsap.fromTo(
               tCard,
               {
                  opacity: 0.3,
                  y: 600,
                  scale: 0.2,
                  rotateX: -180,
               },
               {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  duration: 1.2,
                  ease: 'back.out(3)',
                  scrollTrigger: {
                     trigger: tCard,
                     start: 'top 90%',
                     once: true,
                     invalidateOnRefresh: true,
                     markers: true,
                  },
               }
            )
         );

         ScrollTrigger.refresh();
      },
      { scope: sectionRef }
   );

   return (
      <section
         ref={sectionRef}
         id="experience"
         className="w-full px-6 py-24 bg-black sm:px-10 lg:px-20 overflow-hidden"
      >
         <div className="mx-auto w-full max-w-6xl">
            <h2 className="timeline-title mt-5 max-w-3xl text-5xl font-bold tracking-tight text-cyan-200 sm:text-5xl">
               {lang === 'es'
                  ? 'Experiencia y formación'
                  : 'Experience and education'}
            </h2>
            <div className="mt-14 space-y-16">
               <div>
                  <h3 className="timeline-subtitle mb-8 text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
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
                  <h3 className="timeline-subtitle mb-8 text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
                     {lang === 'es' ? 'Estudios' : 'Education'}
                  </h3>
                  <TimelineGroup entries={timelineData.education} lang={lang} />
               </div>
            </div>
         </div>
      </section>
   );
}
