<template>
  <div class="py-1 pl-3">
    <button
      v-on:click="$emit('click')"
      class="grid items-center rounded-lg border-2 border-transparent p-1 outline-none focus-visible:border-solid focus-visible:border-primary-light dark:shadow-primary-dark dark:focus-visible:border-primary-light"
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
