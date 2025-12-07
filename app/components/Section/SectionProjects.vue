<template>
  <article class="py-12" id="projects">
    <h2
      v-motion="{
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0 },
        visibleOnce: { opacity: 1, y: 0 },
      }"
      class="max-w-[30rem] pb-2 text-3xl font-bold text-white md:mx-auto lg:mx-0"
    >
      Some projects I've built
    </h2>

    <p
      v-motion="{
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 100 } },
        visibleOnce: { opacity: 1, y: 0 },
      }"
      class="text-background-light-500 mb-6"
    ></p>
    <ProjectsBento />
    <ProjectsOthers />
  </article>
</template>

<script setup lang="ts"></script>
