<template>
  <div v-for="project in projects" :key="project.id">
    <div
      class="mb-24 flex w-full flex-col-reverse gap-4 md:flex-row md:items-center"
      :class="project.id % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'"
    >
      <div class="drop-shadow-xl md:basis-1/2">
        <NoiseImage
          :src="project.image"
          :alt="project.imageAlt"
          aspect-ratio="16/9"
          :width="viewportWidth > 768 ? '27rem' : '32rem'"
          class="rounded-xl"
          :noise-scale="
            viewportWidth > 1080 ? 15 : viewportWidth > 768 ? 13 : 10
          "
          :zoom-scale="1.05"
        />
      </div>
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
          <a v-if='project.technicalAnalysis'
            :href='project.technicalAnalysis'
             class="hocus:text-primary-light hocus:dark:text-primary-dark"
            download
             title='Technical components'
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-server"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
          </a>
          <Github :to="project.github" v-if='project.github'/>
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
import { IFeaturedProject } from '~/Interfaces/IFeaturedProject'

const { viewportWidth } = useViewportSize()

const projects: IFeaturedProject[] = [
  {
    id: 1,
    category: 'Featured',
    title: 'League of Statistics',
    description:
      'League of Statistics is a website that shows you statistics about your League of Legends account, per champion you play. You can also view champion information and abilities. It was build with micro-interactions and accessibility in mind.',
    technologies: 'HTML, CSS, JS, Node, Azure Functions, CosmosDB, Riot API',
    external: 'https://leagueofstatistics.jarnedel.dev',
    externalTitle: 'Visit League of Statistics',
    github: 'https://github.com/JarneDel/LolApi',
    image: '/images/lolstats.webp',
    imageAlt: 'LeagueOfStatisticsMockup',
  },
  {
    id: 2,
    category: 'Featured',
    title: 'Team Project - Jumping Jaws',
    description:
      'Jumping Jaws is a co-op game where you have to steer a boat through a river full of obstacles. You have to avoid obstacles by jumping on a trampoline. If the left player jumps on the trampoline, the boat will move to the left and vice versa. The jump tracking was done with an Xbox Kinect 2. There are 2 buttons, to navigate through the menus. We were fortunate enough to present our game to the public at Facts gent 2023',
    technologies:
      'C# Unity Xbox-Kinect-2 NodeJs Express MySql Websockets ESP-32 C++ Serial-communication Scrum Agile',
    github: 'https://github.com/DauweQuinten/Trampoline_Groep2_FrontEnd',
    designDocument: '/documents/DesignDocument.pdf',
    functionalAnalysis: '/documents/FunctionalAnalysis.pdf',
    image: '/images/jumpingjawsnoframe.webp',
    imageAlt: 'JumpingJawsMockup',
  },
  {
    id: 3,
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
  },
  {
    id: 4,
    category: 'Featured',
    title: 'Industry Project - Digital Patient Twin',
    description: "Digital Patient twin is a platform to enable continuous observation of a patient, offering notifications, realtime data, and patient analysis to a medical professional, unfortunately, I can't show the code for this project.",
    technologies: "Vue Nuxt Typescript .NET Azure authentication pub-sub cosmosdb Microservices Dapr",
    image: "/images/dpt.webp",
    imageAlt: "DigitalPatientTwinMockup",
    functionalAnalysis: "/documents/FA02.pdf",
    technicalAnalysis: "/documents/componenten.pdf",

  }
]
</script>
