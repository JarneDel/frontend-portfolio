<template>
  <footer class="mt-24 flex w-full flex-col items-center justify-center pb-1">
    <div
      class="mb-2 flex flex-row gap-4 text-gray-500 lg:fixed lg:bottom-0 lg:right-0 lg:z-10 lg:mb-0 lg:mr-4 lg:flex-col lg:justify-center dark:text-gray-400"
    >
      <Github
        :to="socials.github"
        :size="24"
        class="inline-block"
        v-motion="{
          initial: { opacity: 0, x: 20 },
          enter: { opacity: 1, x: 0 },
        }"
      ></Github>
      <LinkedIn
        :to="socials.linkedin"
        :size="24"
        v-motion="{
          initial: { opacity: 0, x: 20 },
          enter: { opacity: 1, x: 0, transition: { delay: 100 } },
        }"
      ></LinkedIn>
      <Mail
        v-motion="{
          initial: { opacity: 0, x: 20 },
          enter: { opacity: 1, x: 0, transition: { delay: 200 } },
        }"
        :to="socials.mail"
        :size="24"
      ></Mail>
      <SvgLine
        v-motion="{
          initial: { opacity: 0, x: 20 },
          enter: { opacity: 1, x: 0, transition: { delay: 300 } },
        }"
        :width="24"
        :height="72"
        :line-width="1"
        class="hidden text-primary-light lg:block dark:text-primary-dark"
      />
    </div>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      Made with <span class="text-red-500">❤</span> by Jarne Delarue
    </p>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      © {{ new Date().getFullYear() }}
    </p>
  </footer>
</template>

<script setup lang="ts">
const socials = useSocials().socials
</script>
