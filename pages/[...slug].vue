<template>
  <article
    class="flex min-h-screen flex-col-reverse items-center justify-center text-center font-mono text-gray-600 dark:text-gray-400"
  >
    <div>
      <h2 class="text-2xl font-bold md:text-6xl">404:Page_not_found</h2>
      <p class="mt-4 text-lg">
        Sorry, but the page you were trying to view does not exist.
      </p>
      <StyledNuxtLink to="/" class="mt-4 max-w-fit text-lg">
        <LucideArrowLeft></LucideArrowLeft>
        Go back home
      </StyledNuxtLink>
    </div>
    <client-only>
      <Lottie></Lottie>
    </client-only>
  </article>
</template>

<script setup>
import { LucideArrowLeft } from 'lucide-vue-next'
useHead({
  title: '404 | Page not found',
  meta: [
    {
      name: 'description',
      content: 'Sorry, but the page you were trying to view does not exist.',
    },
  ],
})
</script>

<style scoped></style>
