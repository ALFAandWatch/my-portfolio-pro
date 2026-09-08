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
import StackSection from '@/components/StackSection';

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
               className="relative aspect-3/4 w-52 max-h-[36dvh] overflow-clip rounded-2xl rounded-bl-[7rem] rounded-tr-[7rem] lg:rounded-bl-[12rem] lg:rounded-tr-[12rem] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(5,150,105,0.35)] dark:shadow-[0_20px_60px_rgba(139,92,246,0.35)] sm:w-60 sm:max-h-none lg:w-full lg:max-w-sm"
            >
               <Image
                  style={{ opacity }}
                  src="/profilepic.png"
                  alt={decorative ? '' : 'Alfonso Gonzalez'}
                  fill
                  priority={!decorative}
                  sizes="(min-width: 1024px) 32vw, 11rem"
                  className="object-cover object-[center_-10%] lg:object-[center_top]"
               />
            </div>
         </div>

         <div className="flex w-full min-w-0 flex-1 flex-col justify-center gap-2 px-4 py-4 sm:py-6 lg:w-1/2 lg:px-10 lg:py-12 lg:gap-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-100 md:text-3xl lg:text-7xl">
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

         const getPortraitBorderRadius = () => {
            const portrait = portraitRef.current;

            if (!portrait) {
               return '1rem';
            }

            const styles = window.getComputedStyle(portrait);

            return `${styles.borderTopLeftRadius} ${styles.borderTopRightRadius} ${styles.borderBottomRightRadius} ${styles.borderBottomLeftRadius}`;
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
            borderRadius: getPortraitBorderRadius(),
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

         {/* ====================================== SECCION ABOUT ======================================= */}
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
                        ? 'Quiero comenzar compartiendo algo un poco más personal, para que puedan conocer a la persona detrás del desarrollador y las cosas que me hacen feliz. Más allá de ser desarrollador web, también soy una persona con pequeñas obsesiones, recuerdos y objetos que forman parte de mi vida desde hace años.'
                        : 'I want to start by sharing something a little more personal, so you can get to know the person behind the developer and the things that make me happy. Beyond being a web developer, I’m also someone with little obsessions, memories, and objects that have been part of my life for years.'}
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
                              ? '¡Soy un ’90s kid! Siempre fui un apasionado de los videojuegos, desde que jugué Super Mario Bros. por primera vez de niño. Ese cariño por los videojuegos terminó convirtiéndose en una colección de consolas, ediciones especiales y juegos que fui reuniendo a lo largo de diferentes etapas de mi vida. Cada pieza tiene su propia historia y merece un lugar especial.'
                              : 'I’m a ’90s kid! I’ve been a video game enthusiast ever since I first played Super Mario Bros. as a kid. That love for gaming eventually turned into a collection of consoles, special editions, and games that I’ve gathered throughout different stages of my life. Every piece has its own story and deserves a special place.'}
                        </p>
                     </div>
                     <div className="relative grid min-h-88 grid-cols-5 items-start gap-0 sm:min-h-128 sm:gap-3 lg:min-h-128 lg:gap-5">
                        <div
                           className="relative z-10 col-span-2 origin-left scale-110 aspect-9/16 overflow-hidden rounded-4xl border border-dashed border-zinc-400 bg-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-900 lg:scale-105"
                           aria-label="Photo placeholder 1"
                        >
                           <Image
                              src="/games/nes.png"
                              alt="NES collection"
                              fill
                              sizes="(min-width: 1024px) 60vw, 100vw"
                              className="object-cover"
                           />
                        </div>
                        <div
                           className="relative col-span-3 -mt-2 translate-x-1 aspect-4/3 overflow-hidden rounded-4xl border border-dashed border-zinc-400 bg-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-900 lg:mt-2 lg:translate-x-2"
                           aria-label="Photo placeholder 2"
                        >
                           <Image
                              src="/games/gamecube.png"
                              alt="GameCube collection"
                              fill
                              sizes="(min-width: 1024px) 60vw, 100vw"
                              className="object-cover"
                           />
                        </div>
                        <div
                           className="absolute -bottom-2 right-0 z-20 aspect-4/3 w-2/3 rotate-3 overflow-hidden rounded-2xl border-8 border-zinc-100 bg-zinc-300/70 dark:border-zinc-950 dark:bg-zinc-800 lg:-bottom-4 lg:right-2 lg:w-3/5"
                           aria-label="Photo placeholder 3"
                        >
                           <Image
                              src="/games/pokemon.png"
                              alt="Pokémon collection"
                              fill
                              sizes="(min-width: 1024px) 60vw, 100vw"
                              className="object-cover"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="grid min-h-[80dvh] items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
                     <div className="order-2 lg:order-1">
                        <div className="relative mx-auto aspect-7/10 w-full max-w-xl rotate-1 overflow-hidden rounded-4xl border border-dashed border-zinc-400 bg-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-900">
                           <Image
                              src="/games/smash.png"
                              alt="Super Smash Bros."
                              fill
                              sizes="(min-width: 1024px) 60vw, 100vw"
                              className="object-cover"
                           />
                        </div>
                     </div>
                     <div className="order-1 max-w-sm lg:order-2">
                        <span className="font-mono text-sm text-emerald-600 dark:text-violet-400">
                           02 / 03
                        </span>
                        <h3 className="mt-4 text-3xl font-bold text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                           Super Smash Bros. Ultimate
                        </h3>
                        <div className="mt-5 space-y-4 text-zinc-600 dark:text-zinc-400">
                           {lang === 'es' ? (
                              <>
                                 <p className="leading-relaxed">
                                    Uno de mis juegos favoritos, especialmente
                                    para jugar con amigos. Es un juego del que
                                    nunca me canso. Tengo la suerte de que,
                                    incluso ahora en 2026, todavía puedo
                                    juntarme con mis amigos —los mismos con los
                                    que me juntaba en el liceo— y jugar
                                    videojuegos juntos, en persona, no online.
                                 </p>

                                 <p className="leading-relaxed">
                                    Así son los viernes a la noche por acá. Nos
                                    juntamos, jugamos un rato y, obviamente,
                                    cuando alguno gana, no perdemos la
                                    oportunidad de gastarnos un poco entre
                                    nosotros.
                                 </p>
                              </>
                           ) : (
                              <>
                                 <p className="leading-relaxed">
                                    One of my favorite games, especially when
                                    playing with friends. It’s a game I never
                                    get tired of. I’m lucky enough that, even
                                    now in 2026, I can still get together with
                                    my friends—the same ones I used to hang out
                                    with back in high school—and play video
                                    games together, in person, not online.
                                 </p>

                                 <p className="leading-relaxed">
                                    This is what Friday nights look like around
                                    here. We get together, play some games, and,
                                    obviously, whenever someone wins, we never
                                    miss the chance to give each other a bit of
                                    shit.
                                 </p>
                              </>
                           )}
                        </div>
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
                        <div className="mt-5 space-y-4 text-zinc-600 dark:text-zinc-400">
                           {lang === 'es' ? (
                              <>
                                 <p className="leading-relaxed">
                                    Cuando alguien interactúa con una interfaz,
                                    no debería tener que adivinar qué acaba de
                                    pasar. Si un formulario fue enviado, si una
                                    acción tuvo éxito o si algo salió mal, la
                                    interfaz debería dejarlo claro.
                                 </p>
                                 <p className="leading-relaxed">
                                    Es un detalle al que le presto especial
                                    atención cuando desarrollo. Me gusta que
                                    cada acción tenga una respuesta clara y que
                                    el usuario siempre sepa qué está pasando.
                                 </p>
                              </>
                           ) : (
                              <>
                                 <p className="leading-relaxed">
                                    When someone interacts with an interface,
                                    they shouldn’t have to guess what just
                                    happened. If a form was submitted, an action
                                    was successful, or something went wrong, the
                                    interface should make it clear.
                                 </p>
                                 <p className="leading-relaxed">
                                    It’s a detail I pay close attention to when
                                    I develop. I like every action to have a
                                    clear response, so users always know what’s
                                    happening.
                                 </p>
                              </>
                           )}
                        </div>
                     </div>
                     <div className="lg:pl-16">
                        <div className="aspect-5/4 -rotate-2 rounded-4xl border border-dashed border-zinc-400 bg-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-900 relative overflow-hidden">
                           <Image
                              src="/feedback.png"
                              alt="Feedback example"
                              fill
                              sizes="(min-width: 1024px) 60vw, 100vw"
                              className="object-cover"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* ====================================== SECCION WORK ======================================= */}
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
                     ? 'Interfaces pensadas para funcionar, no solamente para verse bien.'
                     : 'Interfaces designed to work, not just to look good.'}
               </h2>
               <div className="mt-14 grid gap-5 md:grid-cols-3">
                  {(lang === 'es'
                     ? [
                          [
                             '01',
                             'Frontend',
                             'Construyo interfaces modernas, responsive y reutilizables con React, Next.js y TypeScript.',
                          ],
                          [
                             '02',
                             'Interacción',
                             'Cada acción debería tener una respuesta clara. Trabajo con estados, feedback y animaciones para que el usuario siempre entienda qué está pasando.',
                          ],
                          [
                             '03',
                             'Full Stack',
                             'Mi foco está en Frontend, pero también entiendo lo que ocurre detrás de la interfaz: APIs, autenticación, bases de datos y backend.',
                          ],
                       ]
                     : [
                          [
                             '01',
                             'Frontend',
                             'I build modern, responsive, and reusable interfaces with React, Next.js, and TypeScript.',
                          ],
                          [
                             '02',
                             'Interaction',
                             'Every action should have a clear response. I work with state, feedback, and motion so users always understand what is happening.',
                          ],
                          [
                             '03',
                             'Full Stack',
                             'My focus is Frontend, but I also understand what happens behind the interface: APIs, authentication, databases, and backend.',
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

         {/* ====================================== SECCION TIMELINE ======================================= */}
         <TimelineSection lang={lang} />
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
            className="w-full bg-zinc-100 px-6 py-24 dark:bg-zinc-950 sm:px-10 lg:px-20 lg:py-32"
         >
            <div className="mx-auto w-full max-w-6xl">
               <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-violet-400">
                  {lang === 'es' ? 'Contacto' : 'Contact'}
               </p>
               <h2 className="mt-5 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {lang === 'es' ? 'Hablemos.' : "Let's talk."}
               </h2>

               <div className="mt-12 grid overflow-hidden rounded-4xl bg-white shadow-xl shadow-zinc-300/30 dark:bg-zinc-900 dark:shadow-black/20 lg:grid-cols-[0.75fr_1.25fr]">
                  <div className="relative min-h-80 bg-zinc-900 lg:min-h-full">
                     <Image
                        src="/profilepic.png"
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
