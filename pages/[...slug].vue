<template>
  <article
    class="flex min-h-screen flex-row items-center justify-center text-center font-mono text-gray-600 dark:text-gray-400"
  >
    <div>
      <h2 class="text-6xl font-bold">404:Page_not_found</h2>
      <p class="mt-4 text-lg">
        Sorry, but the page you were trying to view does not exist.
      </p>
      <StyledNuxtLink to="/" class="mt-4 max-w-fit text-lg">
        <LucideArrowLeft></LucideArrowLeft>
        Go back home
      </StyledNuxtLink>
    </div>
    <iframe
      width="300"
      height="250"
      src="https://embed.lottiefiles.com/animation/43391"
    ></iframe>
  </article>
</template>

<script setup>
import { LucideArrowLeft } from 'lucide-vue-next'

onMounted(() => {
  document.title = '404: Page not found'
})
</script>

<style scoped></style>
