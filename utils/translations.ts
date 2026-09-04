type Project = {
   id: number;
   title: string;
   shortDescription: string;
   fullDescription: string;
   image: string;
   link: string;
   stack: string[];
   inProgress: boolean;
   featured: boolean;
   video?: string;
   apk?: string;
   academic?: boolean;
};

type Info = {
   key: 'email' | 'phone' | 'location';
   label: string;
   value: string;
};

export type TranslationSchema = {
   s1: {
      introduction: string;
      description: string;
      cv: {
         downloadEs: string;
         downloadEn: string;
      };
   };
   s2: {
      hobbiesTitle: string;
      gym: string;
      smash: string;
      metal: string;
   };
   s_extra: {
      title: string;
   };
   s3: {
      title: string;
   };
   s4: {
      title: string;
   };
   labels: {
      academic: string;
      featured: string;
      inProgress: string;
      visit: string;
   };
   projects: Project[];
   info: Info[];
};

export const translations: Record<'es' | 'en', TranslationSchema> = {
   es: {
      s1: {
         introduction: 'Soy',
         description:
            'Desarrollador web enfocado en Frontend, con más de 3 años de aprendizaje continuo y experiencia en múltiples proyectos reales. Me especializo en crear interfaces modernas y desarrollar funcionalidades, con un fuerte entendimiento de cómo funciona la web de punta a punta, incluyendo desarrollo de backends en Node.js y PHP.',
         cv: {
            downloadEs: 'Mi CV (ES)',
            downloadEn: 'Mi CV (EN)',
         },
      },
      s2: {
         hobbiesTitle: 'Acerca de mi',
         gym: 'Voy al Gimnasio',
         smash: 'Fan del Smash',
         metal: 'Escucho buen metal',
      },
      s_extra: {
         title: 'Proyectos Destacados',
      },
      s3: {
         title: 'Todos los Proyectos',
      },
      s4: {
         title: 'Información de Contacto',
      },
      labels: {
         academic: 'Proyecto Académico',
         featured: 'Proyecto Destacado',
         inProgress: 'En Progreso',
         visit: 'Visitar Sitio',
      },
      projects: [
         {
            id: 1,
            title: 'CompanyRadar',
            shortDescription:
               'Plataforma para explorar empresas por categoría y país.',
            fullDescription:
               'CompanyRadar es una aplicación web que permite descubrir y explorar empresas según su categoría y presencia geográfica. Los usuarios pueden navegar perfiles de empresas, ver enlaces relevantes y sugerir nuevas compañías mediante un formulario. El proyecto está construido con Next.js (App Router) y TailwindCSS, utilizando Supabase como backend para la gestión y almacenamiento de datos. Se enfoca en una interfaz limpia, un modelo de datos simple y una experiencia de usuario fluida.',
            image: '/thumbnails/CompanyRadar1.png',
            link: 'https://company-radar-sepia.vercel.app/es',
            inProgress: false,
            featured: true,
            academic: false,
            stack: [
               'Next.js',
               'React',
               'TailwindCSS',
               'Supabase',
               'PostgreSQL',
            ],
         },
         {
            id: 2,
            title: 'App de Clima',
            shortDescription: 'Aplicación de pronóstico del tiempo.',
            fullDescription:
               'Aplicación de clima desarrollada con React Native, enfocada en consultar el estado actual y pronóstico por ciudad o ubicación. Incluye búsqueda, favoritos, cambio de unidades y modo claro/oscuro, consumiendo datos en tiempo real desde una API externa.',
            image: '/thumbnails/clima-app.png',
            link: '',
            inProgress: false,
            featured: false,
            stack: ['React Native', 'Expo', 'JavaScript'],
            video: '/videos/clima-app.mp4',
            apk: 'https://github.com/ALFAandWatch/clima-app/releases/download/v1.1.0/clima-app.apk',
         },
         {
            id: 3,
            title: 'Primeros Paso',
            shortDescription: 'Incubadora de empresas.',

            fullDescription:
               'Proyecto de incubadora de empresas en etapa de desarrollo, orientado a impulsar PYMES locales y apoyar iniciativas de crecimiento económico. Actualmente en la última fase antes de su despliegue.',
            image: '/thumbnails/primerPaso.png',
            link: 'https://incubadora-demo.vercel.app/',
            inProgress: false,
            featured: false,
            stack: ['NextJs', 'TailwindCSS', 'Supabase'],
         },
         {
            id: 4,
            title: 'Planner.uy - Landing Page',
            shortDescription: 'Landing page.',
            fullDescription:
               'Colaboré con Planner en el desarrollo de productos digitales para startups y empresas, trabajando en diseño web, frontend y experiencias interactivas para convertir ideas en interfaces accesibles y visualmente atractivas.',
            image: '/thumbnails/planner.png',
            link: 'https://planner.uy/',
            inProgress: false,
            featured: false,
            stack: ['HTML5', 'PHP', 'SASS', 'GSAP'],
         },
         {
            id: 5,
            title: 'SportTickers',
            shortDescription: 'Librería de enlaces a tickers deportivos.',
            fullDescription:
               'Este proyecto surgió como una idea que propuse en mi trabajo en SportRadar, que trabaja con estadisticas deportivas y mercados de apuestas: se trata de una librería organizada de enlaces a tickers deportivos. Comenzó en HTML y PHP y luego lo reconstruí con React. Actualmente, el frontend está en Vercel y el backend en Supabase.',
            image: '/thumbnails/sport-tickers.png',
            link: 'https://sportstickers-supabase.vercel.app/',
            inProgress: false,
            featured: true,
            stack: ['NextJs', 'TailwindCSS', 'Supabase'],
         },
         {
            id: 6,
            title: 'ClickNest - E-commerce',
            shortDescription: 'E-commerce funcional.',
            fullDescription:
               'Proyecto desarrollado durante mi curso, con diseño libre. Construido con Next.js (App Router) y TailwindCSS, incluye registro, login, carrito y checkout funcional. El frontend está en Vercel, el backend en Render y la base de datos en Supabase, ofreciendo una experiencia fluida y responsiva.',
            image: '/thumbnails/clickNest0.png',
            link: 'https://clicknest-rho.vercel.app/',
            inProgress: false,
            featured: false,
            academic: true,
            stack: ['React', 'TailwindCSS', 'Node.js', 'Express', 'PostgreSQL'],
         },
      ],
      info: [
         {
            key: 'email',
            label: 'Correo Electrónico',
            value: 'alfonso.gonzalezwebdev@gmail.com',
         },
         {
            key: 'phone',
            label: 'Teléfono',
            value: '+59899567652',
         },
         {
            key: 'location',
            label: 'Ubicación',
            value: 'Tarariras, Departamento de Colonia, Uruguay',
         },
      ],
   },
   // ============ EN ======================================
   // ======================================================
   en: {
      s1: {
         introduction: 'I am',
         description:
            'Frontend-focused Web Developer with over 3 years of continuous learning and experience across multiple real-world projects. I specialize in building modern interfaces and developing features, with a strong understanding of how the web works end-to-end, including backend development with Node.js and PHP.',
         cv: {
            downloadEs: 'My Resume (ES)',
            downloadEn: 'My Resume (EN)',
         },
      },
      s2: {
         hobbiesTitle: 'Something about me',
         gym: 'I go to the gym',
         smash: 'Big Smash Fan',
         metal: 'I listen to good metal music',
      },
      s_extra: {
         title: 'Featured Projects',
      },
      s3: {
         title: 'All Projects',
      },
      s4: {
         title: 'Contact Information',
      },
      labels: {
         academic: 'Academic Project',
         featured: 'Featured Project',
         inProgress: 'In Progress',
         visit: 'Visit Site',
      },
      projects: [
         {
            id: 1,
            title: 'CompanyRadar',
            shortDescription:
               'Platform to explore companies by category and country.',
            fullDescription:
               'CompanyRadar is a web application that allows users to discover and explore companies based on category and geographic presence. Users can browse company profiles, view relevant links, and suggest new companies through a submission form. The project is built with Next.js (App Router) and TailwindCSS, using Supabase as the backend for data storage and management. It focuses on clean UI, simple data modeling, and a smooth user experience.',
            image: '/thumbnails/CompanyRadar1.png',
            link: 'https://company-radar-sepia.vercel.app/en',
            inProgress: false,
            featured: true,
            academic: false,
            stack: [
               'Next.js',
               'React',
               'TailwindCSS',
               'Supabase',
               'PostgreSQL',
            ],
         },
         {
            id: 2,
            title: 'Weather Forecast App',
            shortDescription: 'Mobile weather forecasting application.',
            fullDescription:
               'A mobile weather application built with React Native, focused on providing current conditions and forecasts by city or user location. It includes search, favorites, unit switching, and light/dark mode, consuming real-time data from an external API to deliver an accurate and user-friendly experience.',
            image: '/thumbnails/clima-app.png',
            link: '',
            inProgress: false,
            featured: false,
            stack: ['React Native', 'Expo', 'JavaScript'],
            video: '/videos/clima-app.mp4',
            apk: 'https://github.com/ALFAandWatch/clima-app/releases/download/v1.1.0/clima-app.apk',
         },
         {
            id: 3,
            title: 'Primeros Paso',
            shortDescription: 'Business incubator platform.',
            fullDescription:
               'A business incubator platform currently under development, aimed at supporting local SMEs and fostering economic growth initiatives. The project is in its final stage before deployment, focusing on scalability and accessibility for emerging businesses.',
            image: '/thumbnails/primerPaso.png',
            link: 'https://incubadora-demo.vercel.app/',
            inProgress: false,
            featured: false,
            stack: ['Next.js', 'Tailwind CSS', 'Supabase'],
         },
         {
            id: 4,
            title: 'Planner.uy - Landing Page',
            shortDescription: 'Corporate landing page.',
            fullDescription:
               'Collaborated with Planner on the development of digital products for startups and companies, working on web design, frontend development, and interactive experiences to transform ideas into accessible and visually engaging interfaces.',
            image: '/thumbnails/planner.png',
            link: 'https://planner.uy/',
            inProgress: false,
            featured: false,
            stack: ['HTML5', 'PHP', 'Sass', 'GSAP'],
         },
         {
            id: 5,
            title: 'SportTickers',
            shortDescription: 'Sports ticker link library.',
            fullDescription:
               'This project originated from an idea I proposed while working at SportRadar, a company focused on sports statistics and betting markets. It consists of an organized library of sports ticker links. Initially built with HTML and PHP, it was later rebuilt using React. Currently, the frontend is deployed on Vercel and the backend runs on Supabase.',
            image: '/thumbnails/sport-tickers.png',
            link: 'https://sportstickers-supabase.vercel.app/',
            inProgress: false,
            featured: true,
            stack: ['Next.js', 'Tailwind CSS', 'Supabase'],
         },
         {
            id: 6,
            title: 'ClickNest - E-commerce Platform',
            shortDescription: 'Full-featured e-commerce application.',
            fullDescription:
               'A course project developed with a custom design. Built using Next.js (App Router) and Tailwind CSS, it includes user authentication, shopping cart functionality, and a fully working checkout system. The frontend is deployed on Vercel, the backend on Render, and the database on Supabase, delivering a smooth and responsive user experience.',
            image: '/thumbnails/clickNest0.png',
            link: 'https://clicknest-rho.vercel.app/',
            inProgress: false,
            featured: false,
            academic: true,
            stack: [
               'React',
               'Tailwind CSS',
               'Node.js',
               'Express',
               'PostgreSQL',
            ],
         },
      ],
      info: [
         {
            key: 'email',
            label: 'Email',
            value: 'alfonso.gonzalezwebdev@gmail.com',
         },
         {
            key: 'phone',
            label: 'Phone',
            value: '+59899567652',
         },
         {
            key: 'location',
            label: 'Location',
            value: 'Tarariras, Departamento de Colonia, Uruguay',
         },
      ],
   },
};
