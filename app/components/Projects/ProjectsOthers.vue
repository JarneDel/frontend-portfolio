<template>
  <div>
    <h3
      class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100"
      v-motion="{
        initial: { opacity: 0, y: 20 },
        visibleOnce: { opacity: 1, y: 0 },
      }"
    >
      Other projects
    </h3>

    <ul
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2"
    >
      <!-- We now loop through all projects and apply dynamic classes for the bento layout -->
      <li
        v-for="(project, index) in projects"
        :key="project.id"
        v-motion="{
          initial: { opacity: 0 },
          visibleOnce: { opacity: 1, transition: { delay: 100 * (index + 1) } },
        }"
        :class="getProjectClasses(index)"
        class="hocus:-translate-y-1 flex flex-col justify-center gap-4 rounded-lg bg-gray-100 p-4 shadow-lg transition-transform duration-200 dark:bg-gray-800"
      >
        <!-- The ProjectCard component is used here -->
        <ProjectCard :project="project" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface IProject {
  id: number
  name: string
  description: string
  technologies: string
  githubUrl: string
  link?: string
  externalTitle?: string
}

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

// --- Dynamic Class Function for Bento Layout ---
const getProjectClasses = (index: number): string => {
  // Project 3 (index 2) spans two rows
  if (index === 2) {
    return 'lg:row-span-2'
  }
  // Project 4 (index 3) spans two columns
  if (index === 3) {
    return 'md:col-span-2'
  }
  return ''
}
</script>
