<template>
  <article
    class="flex min-h-screen flex-col items-center justify-center text-center text-gray-600 dark:text-gray-400"
  >
    <h2>404: Page not found</h2>
    <p>Sorry, but the page you were trying to view does not exist.</p>
    <div ref="animationElement" class="w-1/2"></div>
  </article>
</template>

<script setup>
onMounted(() => {
  document.title = '404: Page not found'
})
</script>

<style scoped></style>
