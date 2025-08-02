<template>
  <div class="flex flex-col h-full">
    <div class="flex-grow">
      <div class="flex w-full flex-row items-center justify-between">
        <!-- Placeholder for your SVG component -->
        <svg-other-projects
          :size="48"
          class="text-primary-light dark:text-primary-dark"
        />
        <div class="flex flex-row">
          <!-- Placeholder for your Github component -->
          <Github :to="project.githubUrl" />
          <!-- Placeholder for your External link component -->
          <External
            v-if="project.link"
            :to="project.link"
            :title="project.externalTitle ? project.externalTitle : 'Visit project'"
          />
        </div>
      </div>
      <h4 class="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        {{ project.name }}
      </h4>
      <p class="mt-2 text-gray-700 dark:text-gray-300">{{ project.description }}</p>
    </div>
    <!-- Placeholder for your Technologies component -->
    <ProjectsTechnologies :technologies="project.technologies" />
  </div>
</template>

<script setup lang="ts">
interface IProject {
  id: number;
  name: string;
  description: string;
  technologies: string;
  githubUrl: string;
  link?: string;
  externalTitle?: string;
}

defineProps<{
  project: IProject;
}>();

</script>
