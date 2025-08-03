import type { de } from "zod/v4/locales"

export interface IFeaturedProject {
  id: number
  category: string
  title: string
  description: string
  technologies: string
  github?: string
  image: string
  imageAlt: string
  external?: string
  externalTitle?: string
  designDocument?: string
  functionalAnalysis?: string
  technicalAnalysis?: string
  order: number
  transformOrigin?: string
}

export const projects: IFeaturedProject[] = [
  {
    id: 1,
    category: 'Favourite',
    title: 'League of Statistics',
    description:
      'League of Statistics is a website that shows you statistics about your League of Legends account, per champion you play. You can also view champion information and abilities. It was build with micro-interactions and accessibility in mind.',
    technologies: 'HTML, CSS, JS, Node, Azure Functions, CosmosDB, Riot API',
    external: 'https://leagueofstatistics.jarnedel.dev',
    externalTitle: 'Visit League of Statistics',
    github: 'https://github.com/JarneDel/LolApi',
    image: '/images/lolstats.webp',
    imageAlt: 'LeagueOfStatisticsMockup',
    order: 4,
  },
  {
    id: 2,
    title: 'Research Project - HTMX - ElysiaJS - Live-streaming',
    category: 'Featured',
    description:
      'How do you build a performant real-time live stream collaboration tool using HTMX and a bun-Elysiajs backend?',
    technologies: 'HTMX ElysiaJS Websockets WebRTC Cloudflare-Stream Supabase',
    image: '/images/research.webp',
    imageAlt: 'HTMXMockup',
    external: 'https://quizx.jarnedel.dev',
    externalTitle: 'Visit QuizX',
    github: 'https://github.com/JarneDel/Research-Elysia-HTMX',
    order: 8,
  },
  {
    id: 34,
    category: "Browser extension",
    title: 'Browser extension - Project Environment switcher',
    description:
      'A browser extension that allows you to switch between different project environments',
    technologies: 'React TypeScript LM-studio',
    github: 'https://github.com/JarneDel/env-switcher-extension',
    image: '/images/env-switcher.webp',
    imageAlt: 'EnvSwitcherMockup',
    external: 'https://addons.mozilla.org/en-US/firefox/addon/project-environment-switcher/',
    externalTitle: 'Add to Firefox',
    order: 3,
  },
  {
    id: 3,
    category: 'Co-op Project',
    title: 'Team Project - Jumping Jaws',
    description:
      'Jumping Jaws is a co-op game where you have to steer a boat through a river full of obstacles. You have to avoid obstacles by jumping on a trampoline. If the left player jumps on the trampoline, the boat will move to the left and vice versa. The jump tracking was done with an Xbox Kinect 2. There are 2 buttons, to navigate through the menus. We were fortunate enough to present our game to the public at Facts gent and GameForce Brussels 2023',
    technologies:
      'C# Unity Xbox-Kinect-2 NodeJs Express MySql Websockets ESP-32 C++ Serial-communication Scrum Agile',
    github: 'https://github.com/DauweQuinten/Trampoline_Groep2_FrontEnd',
    designDocument: '/documents/DesignDocument.pdf',
    functionalAnalysis: '/documents/FunctionalAnalysis.pdf',
    image: '/images/jumpingjawsnoframe.webp',
    imageAlt: 'JumpingJawsMockup',
    order: 5,
  },

  {
    id: 4,
    category: 'Education',
    title: 'Industry Project - Digital Patient Twin',
    description:
      "Digital Patient twin is a platform to enable continuous observation of a patient, offering notifications, realtime data, and patient analysis to a medical professional, unfortunately, I can't show the code for this project.",
    technologies:
      'Vue Nuxt Typescript .NET Azure authentication pub-sub cosmosdb Microservices Dapr',
    image: '/images/dpt.webp',
    imageAlt: 'DigitalPatientTwinMockup',
    functionalAnalysis: '/documents/FA02.pdf',
    technicalAnalysis: '/documents/componenten.pdf',
    github: 'https://github.com/JarneDel/digital-patient-twin-backend',
    order: 6,
  },
  {
    id: 5,
    category: 'Education',
    title: 'Air insight - Digital air quality monitor',
    description:
      'Air Insight is a digital air quality monitor that can be used to monitor the air quality in your home or office. It is a project that I made for my "Project One" at school.',
    technologies:
      'HTML CSS JavaScript Socket.io MySQL Python Flask Raspberry Pi',
    github: 'https://github.com/howest-mct/2021-2022-projectone-JarneDel',
    external:
      'https://www.instructables.com/Air-Insight-Air-Quality-Monitor-With-Raspberry-Pi/',
    externalTitle: 'Instructables',
    image: '/images/PROJECT1.webp',
    imageAlt: 'AirInsightMockup',
    order: 7,
  },
  {
    id: 6,
    category: 'Professional',
    title: 'Techorama - Huge Belgian tech conference.',
    description:
      "Revitalized Techorama's 2025 website with a dynamic 'Sports Edition' theme, achieved primarily through targeted CSS modifications. This strategic approach ensured minimal disruption to the underlying HTML structure, facilitating seamless future updates and maintainability, while improving a11y!",
    technologies: 'Umbraco scss js',
    external: 'https://techorama.be/',
    image: '/images/techorama.webp',
    imageAlt: 'Techorama 2025 website screenshot',
    externalTitle: 'Visit Techorama',
    order: 1,
    transformOrigin: 'top',
  },
  {
    id: 7,
    category: 'Professional',
    title: 'Buildwise - Belgian Construction research and innovation',
    description:
      'Contributed to the ongoing development and improvement of the Buildwise platform, a leading resource for construction research and innovation.  Focused on enhancing existing features, resolving bugs, and ensuring a seamless user experience for industry professionals.',
    technologies: 'Umbraco vue2 .Net Scss',
    image: '/images/buildwise.webp',
    imageAlt: 'Buildwise: Belgian Construction research and innovation',
    externalTitle: 'Visit buildwise',
    external: 'https://www.buildwise.be',
    order: 2,
    transformOrigin: 'top',
  },
].toSorted((a, b) => a.order - b.order)


export interface IProject {
  id: number
  name: string
  description: string
  technologies: string
  githubUrl: string
  link?: string
  externalTitle?: string
}

export const projectOthers: IProject[] = [
  {
    id: 1,
    name: 'Roman converter',
    description: 'A simple app to convert Latin numbers to Roman numbers.',
    technologies: 'Expo ReactNative TypeScript',
    githubUrl: 'https://github.com/JarneDel/app-converter',
  },

  {
    id: 2,
    name: 'Portfolio',
    description: 'This portfolio',
    technologies: 'Nuxt Vue Typescript TailwindCss SPA',
    githubUrl: 'https://github.com/JarneDel/frontend-portfolio',
  },
  {
    id: 3,
    name: 'Sports Complex',
    description:
      'A website to manage a sport complex. Currently not live due to cost of hosting.',
    technologies:
      'Vue Nestjs Docker Typescript TailwindCss SPA PWA GraphQL Jest MonoRepo MongoDB Firebase',
    githubUrl: 'https://github.com/JarneDel/Doran-Jarne-Tibo',
  },
  {
    id: 4,
    name: 'HTML colors',
    description: 'A simple app that shows you a random html color.',
    technologies: 'Expo ReactNative TypeScript Animation',
    githubUrl: 'https://github.com/JarneDel/app-html-kleuren/tree/develop',
  },
]