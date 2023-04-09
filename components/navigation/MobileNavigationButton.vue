<template>
  <div class="py-1 pl-3">
    <button
      v-on:click="$emit('click')"
      class="-mx-6 flex h-12 w-12 flex-col items-center justify-center rounded-xl outline-none transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-light hocus:bg-primary-dark hocus:ring-primary-dark dark:bg-primary-dark dark:focus:ring-offset-primary-dark hocus:dark:bg-primary-light hocus:dark:ring-primary-light"
    >
      <svg
        v-if="!isOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(['click'])
defineProps({
  isOpen: {
    type: Boolean || undefined,
    required: true,
    default: false,
  },
})
</script>
