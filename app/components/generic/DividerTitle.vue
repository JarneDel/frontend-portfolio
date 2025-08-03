<template>
  <h2 class="mb-6 max-w-[30rem] text-3xl font-bold text-gray-900 accent-teal-700 md:mx-auto lg:mx-0 dark:text-gray-100">
    <span class="">
      {{ text }}
    </span>
  </h2>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()
</script>

