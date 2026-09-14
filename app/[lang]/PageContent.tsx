'use client';

import Image from 'next/image';
import { useRef } from 'react';
import esDictionary from '@/dictionaries/es.json';
import enDictionary from '@/dictionaries/en.json';
import type { Lang } from '@/types/i18b';
import TimelineSection from '@/components/TimelineSection';
import ProjectsSection from '@/components/ProjectsSection';
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
               <HeroScene lang={lang} opacity={0.2} portraitRef={portraitRef} />

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

         {/* ====================================== SECCION ABOUT ======================================= */}
         {/* <section
            id="about"
            className="relative w-full overflow-clip px-6 py-24 sm:px-10 lg:px-20 lg:py-20 text-shadow-lg text-shadow-black"
         >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full">
               <div className="sticky top-16 h-[calc(100dvh-4rem)] w-screen">
                  <Image
                     src="/angel.jpg"
                     alt=""
                     fill
                     sizes="100vw"
                     className="object-cover object-center opacity-30"
                  />
               </div>
            </div>
            <div className="relative z-10 mx-auto w-full max-w-6xl">
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
                                    sh*t.
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
         </section> */}

         {/* ====================================== SECCION WORK ======================================= */}
         <section
            id="work"
            className="w-full px-6 py-24 bg-black sm:px-10 lg:px-20"
         >
            <div className="mx-auto w-full max-w-6xl">
               <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                  {lang === 'es'
                     ? 'Cómo puedo aportar'
                     : 'How I can contribute'}
               </p>
               <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {lang === 'es'
                     ? 'Construyo productos web claros, funcionales y preparados para crecer.'
                     : 'I build clear, functional web products designed to grow.'}
               </h2>
               <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {lang === 'es'
                     ? 'Puedo aportar tanto en la interfaz como en todo lo que ocurre detrás: desde estructurar una experiencia responsive hasta conectar datos, resolver estados y publicar una aplicación funcional.'
                     : 'I can contribute both to the interface and to everything behind it: from structuring a responsive experience to connecting data, handling states, and shipping a functional application.'}
               </p>
               <div className="mt-14 grid gap-5 md:grid-cols-2">
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
                        className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-400/30 dark:border-zinc-800 dark:bg-zinc-950"
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
