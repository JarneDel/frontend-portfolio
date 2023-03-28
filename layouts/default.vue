<template>
  <div class="backgroundGradient scroll-smooth">
    <div class="background mx-8 min-h-screen dark:text-gray-100 lg:mx-0">
      <DesktopNavigation v-if="viewportWidth > 768" />
      <MobileSideNav v-else-if="viewportWidth > 0" />
      <Loader2 class="animate-spin" v-else />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36' fill='%232DD4BF33' viewBox='0 192 1920 1920' width='36'%3E%3Cpath d='M479.825 856Q467 856 458.5 847.375T450 826V606H230q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230 546h220V326q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 326v220h220q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730 606H510v220q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Z'/%3E%3C/svg%3E");
  animation: bg-scrolling-reverse 3s linear infinite;
}
.backgroundGradient {
  background: #dee0dd;
  background: linear-gradient(
    to right top,
    #cbc5bf,
    #d4d3ce,
    #dee0dd,
    #eaeceb,
    #fff
  );
}
@media (prefers-color-scheme: dark) {
  .backgroundGradient {
    background: #211f22;
    background: linear-gradient(
      to right top,
      #343a40,
      #2b2c31,
      #211f22,
      #151314,
      #000000
    );
  }
}

@keyframes bg-scrolling-reverse {
  100% {
    background-position: 36px 36px;
  }
}
@keyframes bg-scrolling {
  0% {
    background-position: 36px 36px;
  }
}
</style>

<style>
html {
  scroll-behavior: smooth;
}
</style>
<script setup lang="ts">
import DesktopNavigation from '~/components/navigation/DesktopNavigation.vue'
import MobileSideNav from '~/components/navigation/MobileSideNav.vue'
import { Loader2 } from 'lucide-vue-next'
const { viewportWidth } = useViewportSize()
</script>
