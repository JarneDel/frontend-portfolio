<template>
  <div v-for="project in projects" :key="project.id">
    <div
      class="mb-24 flex w-full flex-col-reverse gap-4 md:flex-row md:items-center"
      :class="project.id % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'"
    >
      <div class="drop-shadow-xl md:basis-1/2">
        <nuxt-img
          format="webp"
          :src="project.image"
          :alt="project.imageAlt"
          class="block w-full max-w-[32rem] md:max-w-full"
        />
      </div>
      <div
        class="flex max-w-xl basis-1/2 flex-col md:justify-center"
        :class="project.id % 2 === 0 ? 'md:items-start' : 'md:items-end'"
      >
        <p class="font-mono text-primary-light dark:text-primary-dark">
          {{ project.category }}
        </p>
        <h3 class="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          {{ project.title }}
        </h3>
        <p
          class="-m-4 mb-1 mt-2 w-full max-w-[32rem] rounded-lg bg-gray-100/30 px-4 py-2 shadow-xl dark:bg-gray-900/30"
          :class="project.id % 2 === 0 ? 'md:text-left' : 'md:text-right'"
        >
          {{ project.description }}
        </p>
        <ProjectsTechnologies
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
          <Github :to="project.github" />
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
    image: '/lolstats.png/',
    imageAlt: 'LeagueOfStatisticsMockup',
  },
  {
    id: 2,
    category: 'Featured',
    title: 'Team Project - Jumping Jaws',
    description:
      'Jumping Jaws is a co-op game where you have steer a boat through a river full of obstacles. You have to avoid the obstacles by jumping on a trampoline. If the left player jumps on the trampoline, the boat will move to the left and vice versa. The jump tracking was done with an Xbox Kinect 2. There are 2 buttons, to navigate through the menus. We were fortunate enough to present our game to the public at Facts gent 2023',
    technologies:
      'C# Unity Xbox-Kinect-2 NodeJs Express MySql Websockets ESP-32 C++ Serial-communication Scrum Agile',
    github: 'https://github.com/DauweQuinten/Trampoline_Groep2_FrontEnd',
    designDocument: '/documents/DesignDocument.pdf',
    functionalAnalysis: '/documents/FunctionalAnalysis.pdf',
    image: '/jumpingjawsnoframe.png/',
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
    image: '/PROJECT1.png/',
    imageAlt: 'AirInsightMockup',
  },
]
</script>
