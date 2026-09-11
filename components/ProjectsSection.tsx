'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Dictionary, Lang } from '@/types/i18b';

type Project = Dictionary['projects'][number];
type BadgeVariant = 'featured' | 'academic' | 'inProgress';

export default function ProjectsSection({
   projects,
   labels,
   lang,
}: {
   projects: Project[];
   labels: Dictionary['labels'];
   lang: Lang;
}) {
   const [selectedProject, setSelectedProject] = useState<Project | null>(null);

   useEffect(() => {
      if (!selectedProject) return;

      const closeOnEscape = (event: KeyboardEvent) => {
         if (event.key === 'Escape') setSelectedProject(null);
      };

      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', closeOnEscape);

      return () => {
         document.body.style.overflow = '';
         document.removeEventListener('keydown', closeOnEscape);
      };
   }, [selectedProject]);

   return (
      <section
         id="projects"
         className="w-full bg-white px-6 py-24 dark:bg-black sm:px-10 lg:px-20"
      >
         <div className="mx-auto w-full max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-violet-400">
               {lang === 'es' ? 'Selección' : 'Selected work'}
            </p>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
               {lang === 'es' ? 'Proyectos' : 'Projects'}
            </h2>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
               {projects.map((project) => (
                  <button
                     key={project.id}
                     type="button"
                     onClick={() => setSelectedProject(project)}
                     className={`group relative flex min-h-64 w-full items-end overflow-hidden rounded-2xl border bg-zinc-900 text-left shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-white/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 hover:cursor-pointer hover:shadow-lg hover:shadow-white/5 ${project.featured ? 'border-cyan-400 drop-shadow-[0_0px_10px_rgb(0,211,242)]' : project.academic ? 'border-orange-400 drop-shadow-[0_0px_10px_rgb(255,137,3)]' : 'border-zinc-200'}`}
                  >
                     <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 960px, 100vw"
                        className="object-cover opacity-65 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                     />
                     <span className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
                     <span className="relative z-10 flex w-full flex-col gap-3 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                        <span>
                           <span className="block text-2xl font-semibold text-white">
                              {project.title}
                           </span>
                           <span className="mt-1 block text-sm text-zinc-200">
                              {project.shortDescription}
                           </span>
                        </span>
                        <span className="flex flex-wrap gap-2">
                           {project.featured && (
                              <Badge variant="featured">
                                 {labels.featured}
                              </Badge>
                           )}
                           {project.academic && (
                              <Badge variant="academic">
                                 {labels.academic}
                              </Badge>
                           )}
                           {project.inProgress && (
                              <Badge variant="inProgress">
                                 {labels.inProgress}
                              </Badge>
                           )}
                        </span>
                     </span>
                  </button>
               ))}
            </div>
         </div>

         {selectedProject && (
            <div
               role="presentation"
               className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-2 backdrop-blur-sm sm:p-4"
               onMouseDown={(event) => {
                  if (event.target === event.currentTarget)
                     setSelectedProject(null);
               }}
            >
               <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`project-title-${selectedProject.id}`}
                  className="relative flex max-h-[calc(100dvh-1rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-zinc-950 sm:max-h-[calc(100dvh-2rem)]"
               >
                  <button
                     type="button"
                     aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
                     onClick={() => setSelectedProject(null)}
                     className="absolute right-3 top-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xl leading-none text-white transition hover:bg-black/80"
                  >
                     ×
                  </button>
                  <div className="relative h-[24dvh] min-h-32 w-full shrink-0 bg-zinc-900 sm:h-[28dvh]">
                     {selectedProject.video ? (
                        <video
                           controls
                           playsInline
                           preload="metadata"
                           poster={selectedProject.image}
                           className="size-full object-cover"
                        >
                           <source
                              src={selectedProject.video}
                              type="video/mp4"
                           />
                           {lang === 'es'
                              ? 'Tu navegador no puede reproducir este video.'
                              : 'Your browser cannot play this video.'}
                        </video>
                     ) : (
                        <Image
                           src={selectedProject.image}
                           alt={selectedProject.title}
                           fill
                           sizes="(min-width: 768px) 768px, 100vw"
                           className="object-cover"
                        />
                     )}
                  </div>
                  <div className="min-h-0 flex flex-col items-center overflow-hidden p-4 sm:p-6">
                     <div className="flex flex-wrap gap-2">
                        {selectedProject.featured && (
                           <Badge variant="featured">{labels.featured}</Badge>
                        )}
                        {selectedProject.academic && (
                           <Badge variant="academic">{labels.academic}</Badge>
                        )}
                        {selectedProject.inProgress && (
                           <Badge variant="inProgress">
                              {labels.inProgress}
                           </Badge>
                        )}
                     </div>
                     <h3
                        id={`project-title-${selectedProject.id}`}
                        className="mt-3 text-2xl font-bold text-zinc-800 dark:text-zinc-100 sm:text-3xl"
                     >
                        {selectedProject.title}
                     </h3>
                     <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                        {selectedProject.fullDescription}
                     </p>
                     <div className="mt-4 flex flex-wrap gap-2">
                        {selectedProject.stack.map((item) => (
                           <span
                              key={item}
                              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
                           >
                              {item}
                           </span>
                        ))}
                     </div>
                     <div className="mt-5 flex flex-wrap gap-3">
                        {selectedProject.link && (
                           <a
                              href={selectedProject.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 dark:bg-violet-500 dark:hover:bg-violet-600"
                           >
                              {labels.visit}
                           </a>
                        )}
                        {selectedProject.repository && (
                           <a
                              href={selectedProject.repository}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-violet-400 hover:text-violet-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-violet-400 dark:hover:text-violet-300"
                           >
                              {lang === 'es'
                                 ? 'Ver repositorio'
                                 : 'View repository'}
                           </a>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         )}
      </section>
   );
}

function Badge({
   children,
   variant,
}: {
   children: React.ReactNode;
   variant: BadgeVariant;
}) {
   return (
      <span
         className={`rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur text-nowrap ${
            variant === 'featured'
               ? 'border border-cyan-400 bg-cyan-400/40'
               : variant === 'academic'
                 ? 'border border-orange-400 bg-orange-400/40'
                 : 'bg-white/15'
         }`}
      >
         {children}
      </span>
   );
}
