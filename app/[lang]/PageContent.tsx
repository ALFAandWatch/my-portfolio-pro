'use client';

import Image from 'next/image';
import { useRef, type Ref } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import esDictionary from '@/dictionaries/es.json';
import enDictionary from '@/dictionaries/en.json';
import type { Dictionary, Lang } from '@/types/i18b';
import TimelineSection from '@/components/TimelineSection';
import ProjectsSection from '@/components/ProjectsSection';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const dictionaries = {
   es: esDictionary,
   en: enDictionary,
};

type HeroSceneProps = {
   dictionary: Dictionary;
   decorative?: boolean;
   opacity: number;
   portraitRef?: Ref<HTMLDivElement>;
};

function HeroScene({
   dictionary,
   decorative = false,
   opacity,
   portraitRef,
}: HeroSceneProps) {
   return (
      <div
         className="flex h-full w-full flex-col lg:flex-row"
         aria-hidden={decorative}
      >
         <div className="flex w-full min-w-0 shrink-0 items-center justify-center px-4 py-4 sm:py-6 lg:h-full lg:w-1/2 lg:px-10 lg:py-12">
            <div
               ref={portraitRef}
               className="relative aspect-3/4 w-32 overflow-hidden rounded-2xl rounded-bl-[12rem] rounded-tr-[12rem] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(5,150,105,0.35)] dark:shadow-[0_20px_60px_rgba(139,92,246,0.35)] sm:w-44 lg:w-full lg:max-w-sm"
            >
               <Image
                  style={{ opacity }}
                  src="/perfil2.png"
                  alt={decorative ? '' : 'Alfonso Gonzalez'}
                  fill
                  priority={!decorative}
                  sizes="(min-width: 1024px) 32vw, 11rem"
                  className="object-cover object-[center_-10%] lg:object-[center_top]"
               />
            </div>
         </div>

         <div className="flex w-full min-w-0 flex-1 flex-col justify-center gap-2 px-4 py-4 sm:py-6 lg:w-1/2 lg:px-10 lg:py-12 lg:gap-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-600 dark:text-gray-100 md:text-3xl lg:text-7xl">
               Full Stack Developer{' '}
               <span style={{ opacity }} className={`text-violet-500 shine`}>
                  / Frontend Focus.
               </span>
            </h1>

            <div className="flex flex-wrap gap-x-2 gap-y-0 text-xl md:text-2xl lg:text-4xl">
               {/* <p className="font-medium text-gray-600 dark:text-gray-100">
                  {dictionary.s1.introduction}{' '}
               </p> */}
               <p className="bg-linear-to-r from-[#6D28D9] to-[#0E7490] bg-clip-text font-medium text-transparent dark:from-[#8B5CF6] dark:to-[#22D3EE]">
                  Alfonso González
               </p>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 lg:text-lg">
               {dictionary.s1.introduction}
            </p>
         </div>
      </div>
   );
}

export default function PageContent({ lang }: { lang: Lang }) {
   const sceneRef = useRef<HTMLDivElement>(null);
   const stageRef = useRef<HTMLElement>(null);
   const revealRef = useRef<HTMLDivElement>(null);
   const outlineRef = useRef<HTMLDivElement>(null);
   const portraitRef = useRef<HTMLDivElement>(null);
   const dictionary = dictionaries[lang];

   useGSAP(
      () => {
         const getClipPath = (
            width: number,
            height: number,
            x: number,
            y: number
         ) =>
            `polygon(${x}px ${y}px, ${x + width}px ${y}px, ${x + width}px ${y + height}px, ${x}px ${y + height}px)`;

         const getInitialBounds = () => {
            const stage = stageRef.current;
            const portrait = portraitRef.current;

            if (!stage || !portrait) {
               return null;
            }

            const stageBounds = stage.getBoundingClientRect();
            const portraitBounds = portrait.getBoundingClientRect();

            return {
               width: portraitBounds.width,
               height: portraitBounds.height,
               x: portraitBounds.left - stageBounds.left,
               y: portraitBounds.top - stageBounds.top,
            };
         };

         const getCoverBounds = () => {
            const stage = stageRef.current;
            const portrait = portraitRef.current;

            if (!stage || !portrait) {
               return null;
            }

            const stageBounds = stage.getBoundingClientRect();
            const portraitBounds = portrait.getBoundingClientRect();
            const aspectRatio = portraitBounds.width / portraitBounds.height;
            const coverHeight = Math.max(
               stageBounds.height,
               stageBounds.width / aspectRatio
            );
            const coverWidth = coverHeight * aspectRatio;
            const overscan = 8;

            return {
               width: coverWidth + overscan * 2,
               height: coverHeight + overscan * 2,
               x: (stageBounds.width - coverWidth) / 2 - overscan,
               y: (stageBounds.height - coverHeight) / 2 - overscan,
            };
         };

         const initialBounds = getInitialBounds();

         if (!initialBounds) {
            return;
         }

         gsap.set(revealRef.current, {
            clipPath: getClipPath(
               initialBounds.width,
               initialBounds.height,
               initialBounds.x,
               initialBounds.y
            ),
         });
         gsap.set(outlineRef.current, {
            x: initialBounds.x,
            y: initialBounds.y,
            width: initialBounds.width,
            height: initialBounds.height,
            borderRadius: '1rem 12rem 1rem 12rem',
         });

         gsap
            .timeline({
               scrollTrigger: {
                  trigger: sceneRef.current,
                  start: 'top top+=64',
                  end: '+=200%',
                  pin: sceneRef.current,
                  pinSpacing: true,
                  scrub: 0.8,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
               },
            })
            .to(revealRef.current, {
               clipPath: () => {
                  const coverBounds = getCoverBounds();

                  return coverBounds
                     ? getClipPath(
                          coverBounds.width,
                          coverBounds.height,
                          coverBounds.x,
                          coverBounds.y
                       )
                     : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
               },
               ease: 'none',
               duration: 1,
            })
            .to(
               outlineRef.current,
               {
                  x: () => getCoverBounds()?.x ?? 0,
                  y: () => getCoverBounds()?.y ?? 0,
                  width: () =>
                     `${getCoverBounds()?.width ?? window.innerWidth}px`,
                  height: () =>
                     `${getCoverBounds()?.height ?? window.innerHeight}px`,
                  borderRadius: '0px',
                  ease: 'none',
                  duration: 1,
               },
               0
            )
            // Mantiene el Hero fijado un momento después de completar la expansión.
            .to({}, { duration: 0.8 });
      },
      { scope: sceneRef }
   );

   return (
      <>
         <div ref={sceneRef} className="relative h-[calc(100dvh-4rem)] w-full">
            <section
               ref={stageRef}
               className="relative h-full w-full overflow-hidden bg-white dark:bg-black"
            >
               <HeroScene
                  dictionary={dictionary}
                  opacity={0}
                  portraitRef={portraitRef}
               />

               <div
                  id="This"
                  ref={revealRef}
                  className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-hidden will-change-[clip-path]"
               >
                  <HeroScene dictionary={dictionary} decorative opacity={1} />
               </div>

               <div
                  ref={outlineRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 z-20 box-border border-2 border-emerald-500 dark:border-violet-400 will-change-[transform,width,height,border-radius]"
               />
            </section>
         </div>

         <section
            id="about"
            className="w-full overflow-hidden bg-zinc-100 px-6 py-24 dark:bg-zinc-950 sm:px-10 lg:px-20 lg:py-32"
         >
            <div className="mx-auto w-full max-w-6xl">
               <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                     {lang === 'es' ? 'Sobre mí' : 'About me'}
                  </p>
                  <h2 className="mt-5 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl lg:text-6xl">
                     {lang === 'es'
                        ? 'Las cosas que también forman parte de mí.'
                        : 'The things that are part of me, too.'}
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                     {lang === 'es'
                        ? 'Además del código, hay pequeñas obsesiones, recuerdos y objetos que me acompañan desde hace años. Esta es una mirada más personal, fuera de la pantalla de trabajo.'
                        : 'Beyond code, there are small obsessions, memories, and objects that have stayed with me over the years. This is a more personal look, away from the work screen.'}
                  </p>
               </div>

               <div className="mt-20 space-y-24 lg:space-y-32">
                  <div className="grid min-h-[80dvh] items-center gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
                     <div className="max-w-sm">
                        <span className="font-mono text-sm text-emerald-600 dark:text-violet-400">
                           01 / 03
                        </span>
                        <h3 className="mt-4 text-3xl font-bold text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                           {lang === 'es'
                              ? 'Una colección hecha de recuerdos.'
                              : 'A collection made of memories.'}
                        </h3>
                        <p className="mt-5 leading-relaxed text-zinc-600 dark:text-zinc-400">
                           {lang === 'es'
                              ? 'Colecciono videojuegos y ediciones que fueron apareciendo en distintas etapas de mi vida. Cada pieza tiene su propia historia y merece un lugar especial.'
                              : 'I collect video games and editions gathered throughout different stages of my life. Every piece has its own story and deserves a special place.'}
                        </p>
                     </div>
                     <div className="relative grid min-h-[28rem] grid-cols-5 gap-4 sm:min-h-[34rem] sm:gap-6">
                        <div
                           className="col-span-3 mt-10 aspect-[4/5] rounded-[2rem] border border-dashed border-zinc-400 bg-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-900"
                           aria-label="Photo placeholder 1"
                        />
                        <div
                           className="col-span-2 aspect-square rounded-[2rem] border border-dashed border-zinc-400 bg-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-900"
                           aria-label="Photo placeholder 2"
                        />
                        <div
                           className="absolute bottom-0 right-[8%] aspect-[4/3] w-2/5 rotate-3 rounded-[1.5rem] border-8 border-zinc-100 bg-zinc-300/70 dark:border-zinc-950 dark:bg-zinc-800"
                           aria-label="Photo placeholder 3"
                        />
                     </div>
                  </div>

                  <div className="grid min-h-[80dvh] items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
                     <div className="order-2 lg:order-1">
                        <div
                           className="relative aspect-video w-full rotate-1 rounded-[2rem] border border-dashed border-zinc-400 bg-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-900"
                           aria-label={
                              lang === 'es'
                                 ? 'Espacio para un video'
                                 : 'Video placeholder'
                           }
                        >
                           <span className="absolute inset-0 flex items-center justify-center text-sm text-zinc-500">
                              {lang === 'es'
                                 ? 'Video próximamente'
                                 : 'Video coming soon'}
                           </span>
                        </div>
                     </div>
                     <div className="order-1 max-w-sm lg:order-2">
                        <span className="font-mono text-sm text-emerald-600 dark:text-violet-400">
                           02 / 03
                        </span>
                        <h3 className="mt-4 text-3xl font-bold text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                           Super Smash Bros.
                        </h3>
                        <p className="mt-5 leading-relaxed text-zinc-600 dark:text-zinc-400">
                           {lang === 'es'
                              ? 'También me gusta jugar Super Smash Bros. Es ese tipo de juego al que siempre se puede volver: competitivo, caótico y perfecto para compartir con amigos.'
                              : 'I also enjoy playing Super Smash Bros. It is the kind of game you can always come back to: competitive, chaotic, and perfect for sharing with friends.'}
                        </p>
                     </div>
                  </div>

                  <div className="grid min-h-[80dvh] items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                     <div className="max-w-sm">
                        <span className="font-mono text-sm text-emerald-600 dark:text-violet-400">
                           03 / 03
                        </span>
                        <h3 className="mt-4 text-3xl font-bold text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                           {lang === 'es'
                              ? 'El feedback también es parte de la experiencia.'
                              : 'Feedback is part of the experience, too.'}
                        </h3>
                        <p className="mt-5 leading-relaxed text-zinc-600 dark:text-zinc-400">
                           {lang === 'es'
                              ? 'Me molesta cuando un formulario no responde después de hacer submit. ¿Se envió? ¿Falló? ¿Qué debo corregir? Para mí, una interfaz debe acompañar al usuario y dejar claro qué está pasando.'
                              : 'I dislike when a form gives no response after submitting. Was it sent? Did it fail? What should I fix? To me, an interface should guide users and make clear what is happening.'}
                        </p>
                     </div>
                     <div className="lg:pl-16">
                        <div
                           className="aspect-[5/4] -rotate-2 rounded-[2rem] border border-dashed border-zinc-400 bg-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-900"
                           aria-label={
                              lang === 'es'
                                 ? 'Espacio para una foto'
                                 : 'Photo placeholder'
                           }
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section
            id="work"
            className="w-full bg-white px-6 py-24 dark:bg-black sm:px-10 lg:px-20"
         >
            <div className="mx-auto w-full max-w-6xl">
               <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
                  {lang === 'es' ? 'Lo que hago' : 'What I do'}
               </p>
               <h2 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {lang === 'es'
                     ? 'Interfaces que conectan personas y productos.'
                     : 'Interfaces that connect people and products.'}
               </h2>
               <div className="mt-14 grid gap-5 md:grid-cols-3">
                  {(lang === 'es'
                     ? [
                          [
                             '01',
                             'Frontend',
                             'Componentes sólidos, accesibles y preparados para crecer.',
                          ],
                          [
                             '02',
                             'Interacción',
                             'Animaciones con propósito para guiar y sorprender.',
                          ],
                          [
                             '03',
                             'Estrategia',
                             'Decisiones simples que convierten objetivos en resultados.',
                          ],
                       ]
                     : [
                          [
                             '01',
                             'Frontend',
                             'Solid, accessible components built to scale.',
                          ],
                          [
                             '02',
                             'Interaction',
                             'Purposeful motion that guides and delights.',
                          ],
                          [
                             '03',
                             'Strategy',
                             'Simple decisions that turn goals into results.',
                          ],
                       ]
                  ).map(([number, title, description]) => (
                     <article
                        key={number}
                        className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950"
                     >
                        <span className="text-sm font-mono text-zinc-400">
                           {number}
                        </span>
                        <h3 className="mt-12 text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
                           {title}
                        </h3>
                        <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                           {description}
                        </p>
                     </article>
                  ))}
               </div>
            </div>
         </section>

         <TimelineSection lang={lang} />
         <ProjectsSection
            projects={dictionary.projects}
            labels={dictionary.labels}
            lang={lang}
         />

         <section
            id="contact"
            className="w-full bg-zinc-100 px-6 py-24 dark:bg-zinc-950 sm:px-10 lg:px-20 lg:py-32"
         >
            <div className="mx-auto w-full max-w-6xl">
               <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-violet-400">
                  {lang === 'es' ? 'Contacto' : 'Contact'}
               </p>
               <h2 className="mt-5 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {lang === 'es' ? 'Hablemos.' : "Let's talk."}
               </h2>

               <div className="mt-12 grid overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-zinc-300/30 dark:bg-zinc-900 dark:shadow-black/20 lg:grid-cols-[0.75fr_1.25fr]">
                  <div className="relative min-h-80 bg-zinc-900 lg:min-h-full">
                     <Image
                        src="/perfil2.png"
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
                                 <dd className="mt-2 break-words text-sm font-medium text-zinc-700 dark:text-zinc-200">
                                    {item.value}
                                 </dd>
                              </div>
                           ))}
                        </dl>
                     </div>
                     <p className="mt-12 text-sm text-zinc-400 opacity-0">
                        {lang === 'es'
                           ? 'Estoy abierto a oportunidades junior, posiciones trainee y equipos donde pueda aportar, seguir aprendiendo y crecer profesionalmente.'
                           : 'I’m open to junior opportunities, trainee positions, and teams where I can contribute, continue learning, and grow professionally.'}
                     </p>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
