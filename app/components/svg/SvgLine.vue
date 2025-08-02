<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="'0 0 ' + width + ' ' + height"
    fill="none"
    stroke="currentColor"
    :stroke-width="lineWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-linkedin"
  >
    <!--   just a vertical line-->
    <line x1="50%" y1="0%" x2="50%" y2="100%"></line>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: Number,
    required: false,
    default: 24,
  },
  height: {
    type: Number,
    required: false,
    default: 24,
  },
  lineWidth: {
    type: Number,
    required: false,
    default: 2,
  },
})
</script>
