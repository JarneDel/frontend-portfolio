<template>
  <article class="py-12" id="projects">
    <h2
      v-motion="{
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0 },
        visibleOnce: { opacity: 1, y: 0 },
      }"
      class="max-w-[30rem] text-3xl font-bold text-white md:mx-auto lg:mx-0 pb-2"
    >
      Some projects I've built
    </h2>

    <p
      v-motion="{
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 100 } },
        visibleOnce: { opacity: 1, y: 0 },
      }"
      class="mb-6 text-background-light-500"
    >
      Hint: set
      <code class="px-1 font-mono text-sm bg-gray-200 rounded dark:bg-gray-700"
        >layout.css.grid-template-masonry-value.enabled</code
      >
      to true on firefox for a better layout :)
    </p>
    <ProjectsBento />
    <ProjectsOthers />
  </article>
</template>

<script setup lang="ts"></script>
