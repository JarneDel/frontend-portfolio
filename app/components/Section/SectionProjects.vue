<template>
  <article class="py-24" id="projects">
    <h2
      v-motion="{
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }"
      class="mb-12 max-w-[30rem] text-3xl font-bold text-gray-900 accent-teal-700 md:mx-auto lg:mx-0 dark:text-gray-100"
    >
      Some projects I've built
    </h2>
    <ProjectsFeatured />
    <ProjectsOthers />
  </article>
</template>
<script setup lang="ts"></script>
