<template>
  <NuxtLink
    v-bind:to="to"
    v-bind:external="external"
    class=":hocus:ring-offset-gray-400 flex flex-row gap-3 focus:outline-none hocus:rounded-sm hocus:bg-gray-300 hocus:ring-2 hocus:ring-gray-400 hocus:ring-offset-8 dark:hocus:bg-gray-700 hocus:dark:ring-gray-600 dark:hocus:ring-offset-gray-700"
  >
    <slot />
  </NuxtLink>
</template>

<script setup>
defineProps(['to', 'external'])
</script>
