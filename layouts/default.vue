<template>
  <div class="backgroundGradient scroll-smooth">
    <div class="background mx-8 min-h-screen dark:text-gray-100 lg:mx-0">
      <div class="flex flex-row-reverse justify-between">
        <ul class="flex-rows mx-6 my-4 flex gap-8">
          <li>
            <StyledNuxtLink :to="{ hash: '#about' }">
              <user></user>
              <p>About</p>
            </StyledNuxtLink>
          </li>
          <li>
            <StyledNuxtLink :to="'/#projects'">
              <Code2 />
              <p>Projects</p>
            </StyledNuxtLink>
          </li>
          <li>
            <StyledNuxtLink :to="'/#contact'">
              <Contact></Contact>
              <p>Contact</p>
            </StyledNuxtLink>
          </li>
          <li>
            <StyledNuxtLink :to="'/Resume'">
              <file-text />
              <p>Resume</p>
            </StyledNuxtLink>
          </li>
        </ul>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Contact, Code2, FileText } from 'lucide-vue-next'
import StyledNuxtLink from '~/components/elements/StyledNuxtLink.vue'
</script>

<style scoped>
.background {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='36' fill='%232DD4BF33' viewBox='0 192 1920 1920' width='36'%3E%3Cpath d='M479.825 856Q467 856 458.5 847.375T450 826V606H230q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230 546h220V326q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 326v220h220q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730 606H510v220q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Z'/%3E%3C/svg%3E");
  animation: bg-scrolling-reverse 3s linear infinite;
}
.backgroundGradient {
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
