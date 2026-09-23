{
   /* ====================================== SECCION ABOUT ======================================= */
}
{
   /* <section
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
         </section> */
}
