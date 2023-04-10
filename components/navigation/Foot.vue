<template>
  <footer class="mt-24 flex w-full flex-col items-center justify-center">
    <div
      class="mb-2 flex flex-row gap-4 text-gray-500 dark:text-gray-400 lg:fixed lg:bottom-0 lg:right-0 lg:z-10 lg:mb-0 lg:mr-4 lg:flex-col lg:justify-center"
    >
      <Github :to="socials.github" :size="24" class="inline-block"></Github>
      <LinkedIn :to="socials.linkedin" :size="24"></LinkedIn>
      <Mail :to="socials.mail" :size="24"></Mail>
      <SvgLine
        :width="24"
        :height="72"
        :line-width="1"
        class="hidden text-primary-light dark:text-primary-dark lg:block"
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
