<template>
  <div class="overflow-hidden drop-shadow-2xl" :id="'card' + id">
    <img
      :src="src"
      :alt="alt"
      class="h-full w-full object-cover"
      :style="'filter: url(#noise' + id + ')'"
    />
    <svg class="hidden">
      <defs>
        <filter :id="'noise' + id" ref="noise">
          <feTurbulence
            baseFrequency="0.7,0.8"
            seed="0"
            type="fractalNoise"
            result="static"
          >
            <animate
              attributeName="seed"
              values="0;100"
              :dur="duration"
              repeatCount="1"
              :begin="'card' + id + '.mouseenter'"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="static" scale="0">
            <animate
              attributeName="scale"
              :values="'0;' + noiseScale + ';0'"
              :dur="duration"
              repeatCount="1"
              :begin="'card' + id + '.mouseenter'"
            />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script setup lang="ts">
const id = ref(
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substring(0, 5),
)
console.log(id.value)

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
  aspectRatio: {
    type: String,
    required: true,
  },
  zoomScale: {
    type: Number,
    required: false,
    default: 1.1,
  },
  duration: {
    type: String,
    required: false,
    default: '800ms',
  },
  noiseScale: {
    type: Number,
    required: false,
    default: 20,
  },
})
</script>

<style scoped>
div {
  width: 100%;
  max-width: v-bind(width);
  aspect-ratio: v-bind(aspectRatio);
}

img:hover {
  animation: pulseZoom v-bind(duration) ease-in-out;
}

@keyframes pulseZoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(v-bind(zoomScale));
  }
  100% {
    transform: scale(1);
  }
}
</style>
