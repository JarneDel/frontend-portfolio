<template>
  <article class="mb-24 mt-40 font-sans md:mt-80">
    <p
      class="text-2xl font-medium text-gray-800 lg:text-3xl dark:text-gray-200"
      v-motion="{
        initial: { y: 10, opacity: 0 },
        visibleOnce: {
          y: 0,
          opacity: 1,
          transition: { duration: 350, delay: 150, ease: 'easeInOut' },
        },
      }"
    >
      Hey there,
    </p>
    <p
      v-motion="{
        initial: { x: -200, opacity: 0 },
        visibleOnce: {
          x: 0,
          opacity: 1,
          transition: {
            stiffness: 250,
            damping: 20,
            mass: 1,
            type: 'spring',
          },
        },
      }"
      class="mb-3 text-6xl font-medium"
    >
      I'm <span class="font-mono text-teal-400">Jarne Delarue</span>
    </p>
    <p
      v-motion="{
        initial: { y: -10, opacity: 0 },
        visibleOnce: {
          y: 0,
          opacity: 1,
          transition: { duration: 350, delay: 150, ease: 'easeInOut' },
        },
      }"
      class="pb-6 text-3xl text-neutral-400"
    >
      A full stack web developer and Linux enthousiast
    </p>
    <div
      v-motion="{
        initial: { x: 200, opacity: 0 },
        visibleOnce: {
          x: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 250,
            damping: 20,
            mass: 0.8,
          },
        },
      }"
    >
      <nuxt-link
        to="/#about"
        class="rounded-lg border-2 border-solid border-teal-400 p-2 outline-none transition-colors duration-300 focus-visible:ring focus-visible:ring-teal-600 hocus:bg-primary-dark hocus:text-white"
      >
        Find out more
      </nuxt-link>
    </div>
  </article>
</template>
