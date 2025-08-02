<template>
  <div class="overflow-hidden drop-shadow-2xl">
    <nuxt-picture
      :src="src"
      :alt="alt"
      :width="widthPx"
      :height="heightPx"
      densities="x1 x2"
      class="h-full w-full object-cover"
      format="webp"
      :modifiers="{ position: 'top' }"
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
  transformOrigin: {
    type: String,
    required: false,
    default: 'center',
  },
})
</script>

<style scoped>
div {
  width: 100%;
  max-width: v-bind(width);
  aspect-ratio: v-bind(aspectRatio);
}
:deep(img) {
  transition: all 400ms ease-in-out;
  transform-origin: v-bind(transformOrigin);
}
:deep(img:hover) {
  scale: v-bind(zoomScale);
}
</style>
