'use client';

import Image from 'next/image';
import { useRef } from 'react';
import esDictionary from '@/dictionaries/es.json';
import enDictionary from '@/dictionaries/en.json';
import type { Lang } from '@/types/i18b';
import TimelineSection from '@/components/TimelineSection';
import ProjectsSection from '@/components/ProjectsSection';
import WorkSection from '@/components/WorkSection';
import StackSection from '@/components/StackSection';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import HeroScene from '@/components/HeroScene';

const dictionaries = {
   es: esDictionary,
   en: enDictionary,
};

export default function PageContent({ lang }: { lang: Lang }) {
   const sceneRef = useRef<HTMLDivElement>(null);
   const stageRef = useRef<HTMLElement>(null);
   const revealRef = useRef<HTMLDivElement>(null);
   const outlineRef = useRef<HTMLDivElement>(null);
   const portraitRef = useRef<HTMLDivElement>(null);
   const dictionary = dictionaries[lang];

   useHeroAnimation({
      sceneRef,
      stageRef,
      revealRef,
      outlineRef,
      portraitRef,
   });

   return (
      <>
         <div ref={sceneRef} className="relative h-[calc(100dvh-4rem)] w-full">
            <section
               ref={stageRef}
               className="relative h-full w-full overflow-hidden"
            >
               <HeroScene
                  lang={lang}
                  opacity={0.08}
                  portraitRef={portraitRef}
               />

               <div
                  id="This"
                  ref={revealRef}
                  className=" absolute inset-0 z-10 h-full w-full overflow-clip will-change-[clip-path] aspect-square rounded-full"
               >
                  {/* revealRef tenia pointer-events-none, volver a agregar si se encuentran malos comportamientos deribados de su falta */}
                  <HeroScene lang={lang} decorative opacity={1} />
               </div>

               <div
                  ref={outlineRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 overflow-clip z-20 box-border border-3 border-cyan-400/30 will-change-[transform,width,height] aspect-square rounded-full"
                  style={{
                     backgroundImage:
                        'radial-gradient(rgba(123,241,167,0), rgba(123,241,167,0), rgba(34,211,238, 0.4))',
                  }}
               />
            </section>
         </div>

         {/* ====================================== SECCION WORK ======================================= */}
         <WorkSection lang={lang} />

         {/* ====================================== SECCION TIMELINE ======================================= */}
         <TimelineSection lang={lang} />

         {/* ====================================== SECCION STACK ======================================= */}
         <StackSection lang={lang} />

         {/* ====================================== SECCION PROYECTOS ======================================= */}
         <ProjectsSection
            projects={dictionary.projects}
            labels={dictionary.labels}
            lang={lang}
         />

         {/* ====================================== SECCION CONTACT ======================================= */}
         <section
            id="contact"
            className="w-full px-6 py-24 bg-black sm:px-10 lg:px-20 lg:py-32"
         >
            <div className="mx-auto w-full max-w-6xl">
               <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                  {lang === 'es' ? 'Contacto' : 'Contact'}
               </p>
               <h2 className="mt-5 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {lang === 'es' ? 'Hablemos.' : "Let's talk."}
               </h2>

               <div className="mt-12 grid overflow-hidden rounded-4xl bg-white shadow-xl shadow-zinc-300/30 dark:bg-zinc-900 dark:shadow-black/20 lg:grid-cols-[0.75fr_1.25fr]">
                  <div className="relative min-h-80 bg-zinc-900 lg:min-h-full">
                     <Image
                        src="/profilepic2.png"
                        alt="Alfonso González"
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover object-[center_-10%] grayscale transition duration-500 hover:grayscale-0"
                     />
                     <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                     <p className="absolute bottom-6 left-6 text-sm font-medium tracking-wide text-white">
                        Alfonso González
                     </p>
                  </div>

                  <div className="flex flex-col justify-between p-8 sm:p-12">
                     <div>
                        <p className="max-w-xl text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
                           {lang === 'es'
                              ? 'Estoy abierto a oportunidades junior, posiciones trainee y equipos donde pueda aportar, seguir aprendiendo y crecer profesionalmente.'
                              : 'I’m open to junior opportunities, trainee positions, and teams where I can contribute, continue learning, and grow professionally.'}
                        </p>
                        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                           {dictionary.info.map((item) => (
                              <div key={item.key}>
                                 <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                                    {item.label}
                                 </dt>
                                 <dd className="mt-2 wrap-break-word text-sm font-medium text-zinc-700 dark:text-zinc-200">
                                    {item.value}
                                 </dd>
                              </div>
                           ))}
                        </dl>
                     </div>
                     <p className="max-w-xl mt-12 leading-relaxed text-lg font-medium text-zinc-700 dark:text-zinc-200">
                        {lang === 'es'
                           ? '¿Te interesa trabajar conmigo? ¡Hablemos!'
                           : 'Interested in working with me? Let’s talk!'}
                     </p>
                     <div className="mt-6 flex flex-wrap gap-3">
                        <a
                           href="mailto:alfonso.gonzalezwebdev@gmail.com"
                           aria-label={
                              lang === 'es' ? 'Enviar email' : 'Send email'
                           }
                           className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-3 text-sm font-semibold text-gray-100 transition focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-5 bg-cyan-500 hover:bg-cyan-600 focus-visible:outline-cyan-300"
                        >
                           <Image
                              src="/social/email.png"
                              alt=""
                              width={20}
                              height={20}
                           />
                           <span className="hidden sm:inline">
                              {lang === 'es' ? 'Enviar email' : 'Send email'}
                           </span>
                        </a>
                        <a
                           href="/Resume-Alfonso-Gonzalez-Desarrollador-Fullstack.pdf"
                           aria-label={
                              lang === 'es' ? 'Descargar CV' : 'Download CV'
                           }
                           target="_blank"
                           className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-3 py-3 text-sm font-semibold text-zinc-700 transition focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-5 dark:border-zinc-700 dark:text-zinc-200 hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline-cyan-400"
                        >
                           <Image
                              src="/social/download.png"
                              alt=""
                              width={20}
                              height={20}
                           />
                           <span className="hidden sm:inline">
                              {lang === 'es' ? 'Descargar CV' : 'Download CV'}
                           </span>
                        </a>
                        <a
                           href="https://www.linkedin.com/in/alfonso-gonzalez-desarrollador/"
                           aria-label="LinkedIn"
                           rel="noreferrer"
                           target="_blank"
                           className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-3 py-3 text-sm font-semibold text-zinc-700 transition focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-5 dark:border-zinc-700 dark:text-zinc-200 hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline-cyan-400"
                        >
                           <Image
                              src="/social/linkedin.png"
                              alt=""
                              width={20}
                              height={20}
                           />
                           <span className="hidden sm:inline">LinkedIn</span>
                        </a>
                        <a
                           href="https://github.com/ALFAandWatch"
                           target="_blank"
                           rel="noreferrer"
                           aria-label="GitHub"
                           className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-3 py-3 text-sm font-semibold text-zinc-700 transition focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-5 dark:border-zinc-700 dark:text-zinc-200 hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline-cyan-400"
                        >
                           <Image
                              src="/social/github.png"
                              alt=""
                              width={20}
                              height={20}
                           />
                           <span className="hidden sm:inline">GitHub</span>
                        </a>
                        <a
                           href={`https://wa.me/59899567652?text=${encodeURIComponent('¡Hola, Alfonso! Me gustaría hablar contigo sobre una oportunidad laboral.')}`}
                           target="_blank"
                           rel="noreferrer"
                           aria-label="WhatsApp"
                           className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-3 py-3 text-sm font-semibold text-zinc-700 transition focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-5 dark:border-zinc-700 dark:text-zinc-200 hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline-cyan-400"
                        >
                           <Image
                              src="/social/whatsapp.png"
                              alt=""
                              width={20}
                              height={20}
                           />
                           <span className="hidden sm:inline">WhatsApp</span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
