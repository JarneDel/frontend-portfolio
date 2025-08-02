
<template>
  <NuxtImg
    v-bind="$attrs"
    :placeholder="placeholder"
    :placeholder-class="`${placeholderClass} animate-pulse`"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    default: '/images/placeholder-full.webp',
  },
  placeholderClass: {
    type: String,
    default: 'object-contain bg-gray-300 dark:bg-gray-600',
  },
})
</script>
