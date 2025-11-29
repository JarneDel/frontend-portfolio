<template>
  <div>
    <h3
      class="mb-6 text-2xl font-bold text-white"
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
        class="hocus:-translate-y-1 flex flex-col justify-center gap-4 rounded-lg bg-background-dark-300 p-4 shadow-lg transition-transform duration-200 border border-background-dark-400"
      >
        <!-- The ProjectCard component is used here -->
        <ProjectCard :project="project" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { projectOthers as projects } from '~/content/projects'

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
