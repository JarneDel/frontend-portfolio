<template>
  <div class="overflow-hidden drop-shadow-2xl" id="card">
    <img :src="src" :alt="alt" class="h-full w-full object-cover" />
    <svg class="hidden">
      <defs>
        <filter id="noise">
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
              begin="card.mouseenter"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="static" scale="0">
            <animate
              attributeName="scale"
              :values="'0;' + noiseScale + ';0'"
              :dur="duration"
              repeatCount="1"
              begin="card.mouseenter"
            />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
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
    type: Number,
    required: true,
  },
  aspectRatio: {
    type: Number,
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
div#card {
  width: v-bind(width + 'px');
  aspect-ratio: v-bind(aspectRatio);
}

img {
  filter: url(#noise);
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
