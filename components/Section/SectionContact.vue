<template>
  <article class="mb-48 py-24" id="contact">
    <h2
      v-motion="{
        initial: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }"
      class="mb-12 text-3xl font-bold text-gray-900 accent-teal-700 dark:text-gray-100"
    >
      Get in touch
    </h2>
    <p
      class="max-w-lg text-lg font-medium text-gray-800 dark:text-gray-200"
      v-motion="{
        initial: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.3 } },
      }"
    >
      I'm currently gaining valuable experience at Numble. However, I'm always
      open to discussing new opportunities that align with my skills and career
      goals. Please don't hesitate to reach out.
    </p>
    <div
      class="mt-6"
      v-motion="{
        initial: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
      }"
    >
      <a
        :href="`mailto:contact@jarnedel.dev`"
        class="inline rounded-lg border-2 border-solid border-teal-400 p-2 outline-none transition-colors duration-300 focus-visible:ring focus-visible:ring-teal-600 hocus:bg-primary-dark hocus:text-white"
        >Get in touch</a
      >
    </div>

    <contact-form />
  </article>
</template>

<script setup lang="ts"></script>
