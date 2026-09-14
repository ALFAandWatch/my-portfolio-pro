'use client';

import Image from 'next/image';
import type { Ref } from 'react';
import type { Lang } from '@/types/i18b';
import { useVisits } from '@/hooks/useVisits';

type HeroSceneProps = {
   lang: Lang;
   decorative?: boolean;
   opacity: number;
   portraitRef?: Ref<HTMLDivElement>;
};

export default function HeroScene({
   lang,
   decorative = false,
   opacity,
   portraitRef,
}: HeroSceneProps) {
   const visits = useVisits();

   return (
      <div className="h-full w-full" aria-hidden={decorative}>
         <div className="flex h-full w-full flex-col items-center justify-center gap-2 pb-6 lg:justify-center lg:gap-0 lg:pb-0">
            <p className="absolute top-0 left-0 mt-2 hidden text-sm text-gray-500 opacity-0 transition duration-75 hover:opacity-100 dark:text-gray-400 lg:block">
               👀 {visits} visitas
            </p>
            <div className="flex w-full min-w-0 shrink-0 items-center justify-center px-4 py-4 sm:py-6 lg:w-1/2 lg:px-10">
               <div
                  ref={portraitRef}
                  className="relative mt-4 aspect-square w-40 max-h-[25dvh] overflow-clip rounded-full border border-white/10 shadow-[0_0_30px_rgba(162,244,253,0.35)] sm:mt-6 sm:w-48 sm:max-h-[28dvh] lg:mt-10 lg:w-full lg:max-w-50 lg:max-h-none"
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

            <div className="flex w-full min-w-0 flex-1 flex-col justify-center gap-2 px-4 py-4 sm:py-6 lg:w-2/3 lg:px-10 lg:py-0">
               <div className="mx-auto rounded-3xl text-center lg:flex lg:flex-col">
                  <div className="mt-2 text-xl md:text-2xl lg:text-4xl">
                     <p className="mb-2 text-3xl font-bold text-gray-100 sm:text-4xl lg:text-5xl">
                        {lang === 'es' ? 'Hola, soy' : 'Hi, I’m'}{' '}
                        <span className="bg-linear-to-r from-[#6D28D9] to-[#0E7490] bg-clip-text text-transparent dark:from-[#8B5CF6] dark:to-[#22D3EE]">
                           Alfonso González
                        </span>
                     </p>
                  </div>
                  <h1 className="text-xl font-extrabold tracking-tight text-gray-100 sm:text-2xl md:text-4xl">
                     Full Stack Developer{' '}
                     <span style={{ opacity }} className="text-violet-500 shine">
                        / Frontend Focus.
                     </span>
                  </h1>
                  <p
                     className="mt-3 text-xs text-gray-400 sm:text-sm lg:mt-4 lg:text-lg"
                     style={{ opacity }}
                  >
                     {lang === 'es'
                        ? 'Soy un desarrollador especializado en Next.js, con experiencia construyendo aplicaciones de punta a punta. Mi foco está en Frontend: crear interfaces modernas, funcionales y agradables de usar, sin perder de vista todo lo que ocurre detrás.'
                        : 'I’m a developer specializing in Next.js, with experience building end-to-end applications. My focus is on Frontend: creating modern, functional, and enjoyable-to-use interfaces, while keeping sight of everything happening behind the scenes.'}
                  </p>
                  <p
                     className="pointer-events-auto mt-3 select-text text-xs text-cyan-200 sm:text-sm lg:mt-5 lg:text-lg"
                     style={{ opacity }}
                  >
                     alfonso.gonzalezwebdev@gmail.com | +59899567652
                  </p>
               </div>
            </div>
            <div className="flex justify-center gap-6 pb-2 sm:gap-10 lg:pb-20">
               {[
                  ['01', 'Email', '/social/email.png', 'mailto:alfonso.gonzalezwebdev@gmail.com'],
                  ['02', 'Github', '/stack/github.png', 'https://github.com/ALFAandWatch'],
                  ['03', 'LinkedIn', '/social/linkedin.png', 'https://www.linkedin.com/in/alfonsogonzalez-desarrollador/'],
                  ['04', 'CV', '/social/document.png', '/Resume-Alfonso-Gonzalez-Desarrollador-Fullstack.pdf'],
               ].map(([id, slug, image, action]) => (
                  <a
                     href={action}
                     key={id}
                     className="pointer-events-auto flex cursor-pointer flex-col items-center justify-center text-gray-400 transition-margin duration-300 hover:scale-110 hover:text-cyan-200 hover:drop-shadow-[0_0_15px_rgb(34,211,238)]"
                     target="_blank"
                     rel="noreferrer"
                     style={{ opacity }}
                  >
                     <div className="relative aspect-square w-7 sm:w-8">
                        <Image src={image} alt={slug} fill />
                     </div>
                     {slug}
                  </a>
               ))}
            </div>
         </div>
      </div>
   );
}
