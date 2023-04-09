<template>
  <p
    class="mb-2 rounded-lg py-2 font-mono text-sm text-gray-600 dark:text-gray-400"
    :class="'md:' + textAlignment"
  >
    {{ technologies }}
  </p>
</template>

<script setup lang="ts">
defineProps({
  technologies: {
    type: String,
    required: true,
  },
  textAlignment: {
    type: String,
    required: false,
    default: 'text-left',
  },
})
</script>
