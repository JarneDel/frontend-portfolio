<template>
  <div class="overflow-hidden drop-shadow-2xl">
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="widthPx"
      :height="heightPx"
      class="h-full w-full object-cover"
      format="webp"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  heightPx: {
    type: String,
    required: true,
  },
  widthPx: {
    type: String,
    required: true,
  },
  aspectRatio: {
    type: String,
    required: true,
  },
  zoomScale: {
    type: Number,
    required: false,
    default: 1.1,
  },
})
</script>

<style scoped>
div {
  width: 100%;
  max-width: v-bind(width);
  aspect-ratio: v-bind(aspectRatio);
}
img {
  transition: all 400ms ease-in-out;
}
img:hover {
  scale: v-bind(zoomScale);
}
</style>
