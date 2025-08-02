<template>
  <a
    v-bind:href="to"
    class="border-1 flex flex-row gap-3 rounded-lg border-transparent p-2 transition-colors duration-200 focus:outline-none hocus:bg-primary-light/20 hocus:text-primary-light dark:hover:border-gray-400 dark:hover:border-primary-light dark:hocus:bg-gray-600/20"
  >
    <slot />
  </a>
</template>

<script setup>
defineProps(['to'])
</script>
