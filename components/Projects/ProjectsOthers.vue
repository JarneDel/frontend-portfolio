<template>
  <h3 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
    Other projects
  </h3>
  <ul
    class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8"
  >
    <li
      v-for="project in projects"
      :key="project.id"
      class="flex flex-col justify-center gap-4 rounded-lg bg-gray-100 p-4 shadow-lg transition-transform duration-200 hocus:-translate-y-1 dark:bg-gray-800"
    >
      <div class="flex w-full flex-row items-center justify-between">
        <svg-other-projects
          size="48"
          class="text-primary-light dark:text-primary-dark"
        />
        <div class="flex flex-row">
          <Github :to="project.githubUrl" />
          <External v-if="project.link" :to="project.link" />
        </div>
      </div>
      <h4 class="text-xl font-bold text-gray-900 dark:text-gray-100">
        {{ project.name }}
      </h4>
      <p>{{ project.description }}</p>
      <ProjectsTechnologies :technologies="project.technologies" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { IProject } from '~/Interfaces/IProject'

const projects: IProject[] = [
  {
    id: 1,
    name: 'Roman converter',
    description: 'A simple app to convert Latin numbers to Roman numbers.',
    technologies: 'Expo ReactNative TypeScript',
    githubUrl: 'https://github.com/JarneDel/app-converter',
  },
  {
    id: 2,
    name: 'Roman converter',
    description: 'A simple app to convert Latin numbers to Roman numbers.',
    technologies: 'Expo ReactNative TypeScript',
    githubUrl: 'https://github.com/JarneDel/app-converter',
  },
  {
    id: 3,
    name: 'Roman converter',
    description: 'A simple app to convert Latin numbers to Roman numbers.',
    technologies: 'Expo ReactNative TypeScript',
    githubUrl: 'https://github.com/JarneDel/app-converter',
  },
  {
    id: 4,
    name: 'Roman converter',
    description: 'A simple app to convert Latin numbers to Roman numbers.',
    technologies: 'Expo ReactNative TypeScript',
    githubUrl: 'https://github.com/JarneDel/app-converter',
  },
]
</script>
