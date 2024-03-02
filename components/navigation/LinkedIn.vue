<template>
  <a
    :href="to"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-block hocus:text-primary-light hocus:dark:text-primary-dark"
    aria-label="LinkedIn"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-linkedin"
    >
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      ></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  </a>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: false,
    default: 24,
  },
})
</script>
