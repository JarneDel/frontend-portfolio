<template>
  <footer class="mt-24 flex w-full flex-col items-center justify-center">
    <div
      class="mb-2 flex flex-row gap-4 lg:fixed lg:bottom-0 lg:right-0 lg:z-10 lg:mb-0 lg:mr-4 lg:flex-col lg:justify-center"
    >
      <Github :to="socials.github" :size="32" class="inline-block"></Github>
      <LinkedIn :to="socials.linkedin" :size="32"></LinkedIn>
      <Mail :to="socials.mail" :size="32"></Mail>
      <SvgLine
        :width="32"
        :height="96"
        :line-width="2"
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
const viewportWidth = useViewportSize().viewportWidth
const socials = useSocials().socials
</script>
