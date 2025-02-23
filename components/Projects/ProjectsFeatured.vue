<template>
  <div v-for="(project, number) in projects" :key="project.id">
    <div
      v-motion="{
        initial: { opacity: 0, x: number % 2 === 0 ? -100 : 100 },
        visibleOnce: {
          opacity: 1,
          x: 0,
          transition: { duration: 200, delay: 100 * number, ease: 'easeOut' },
        },
      }"
      class="mb-24 flex w-full flex-col-reverse gap-4 md:flex-row md:items-center"
      :class="project.id % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'"
    >
      <a
        class="drop-shadow-xl md:basis-1/2"
        :href="project.external ?? project.github"
      >
        <NoiseImage
          :src="project.image"
          :alt="project.imageAlt"
          aspect-ratio="16/9"
          heightPx="270"
          widthPx="470"
          :width="viewportWidth.valueOf() > 768 ? '27rem' : '32rem'"
          class="rounded-xl"
          :noise-scale="
            viewportWidth.valueOf() > 1080
              ? 15
              : viewportWidth.valueOf() > 768
                ? 13
                : 10
          "
          :zoom-scale="1.05"
          :transform-origin="project.transformOrigin"
        />
      </a>
      <div
        class="flex max-w-xl basis-1/2 flex-col md:justify-center"
        :class="project.id % 2 === 0 ? 'md:items-start' : 'md:items-end'"
      >
        <p class="font-mono text-primary-light dark:text-primary-dark">
          {{ project.category }}
        </p>
        <h3
          class="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100"
          :class="project.id % 2 === 0 ? 'md:text-left' : 'md:text-right'"
        >
          {{ project.title }}
        </h3>
        <p
          class="-m-4 mb-1 mt-2 w-full max-w-[32rem] rounded-lg bg-gray-100/30 px-4 py-2 shadow-xl dark:bg-gray-900/30"
          :class="project.id % 2 === 0 ? 'md:text-left' : 'md:text-right'"
        >
          {{ project.description }}
        </p>
        <ProjectsTechnologies
          class="max-w-[32rem]"
          :technologies="project.technologies"
          :text-alignment="project.id % 2 === 0 ? 'text-left' : 'text-right'"
        />
        <div class="flex gap-4">
          <a
            v-if="project.functionalAnalysis"
            :href="project.functionalAnalysis"
            class="hocus:text-primary-light hocus:dark:text-primary-dark"
            download
          >
            <SvgDesigndocument title="Design Document" />
          </a>
          <a
            v-if="project.designDocument"
            :href="project.designDocument"
            class="hocus:text-primary-light hocus:dark:text-primary-dark"
            download
          >
            <SvgDocument title="Design Document" />
          </a>
          <a
            v-if="project.technicalAnalysis"
            :href="project.technicalAnalysis"
            class="hocus:text-primary-light hocus:dark:text-primary-dark"
            download
            title="Technical components"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-server"
            >
              <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
              <line x1="6" x2="6.01" y1="6" y2="6" />
              <line x1="6" x2="6.01" y1="18" y2="18" />
            </svg>
          </a>
          <Github :to="project.github" v-if="project.github" />
          <External
            v-if="project.external"
            :to="project.external"
            :title="
              project.externalTitle ? project.externalTitle : 'Visit project'
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface IFeaturedProject {
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
const { viewportWidth } = useViewportSize()

const projects: IFeaturedProject[] = [
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
    order: 3,
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
    order: 4,
  },
  {
    id: 3,
    category: 'Featured',
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
    category: 'Featured',
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
    category: 'Featured',
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
    category: 'Featured',
    title: 'Techorama - Huge Belgian tech conference.',
    description:
      "Revitalized Techorama's 2025 website with a dynamic 'Sports Edition' theme, achieved primarily through targeted CSS modifications. This strategic approach ensured minimal disruption to the underlying HTML structure, facilitating seamless future updates and maintainability, while improving a11y!",
    technologies: 'Umbraco scss js',
    external: 'https://techorama.be/',
    image: '/images/techorama.webp',
    imageAlt: 'Techorama 2025 website screenshot',
    externalTitle: 'Visit the 2025 techorama website',
    order: 1,
    transformOrigin: 'top',
  },
  {
    id: 7,
    category: 'Featured',
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
</script>
