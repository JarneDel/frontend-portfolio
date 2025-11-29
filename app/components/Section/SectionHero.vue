<template>
  <article class="mt-20 mb-12 font-sans md:mt-30">
    <!-- Bento Grid Container -->
    <div
      class="mx-auto mb-8 grid h-auto max-w-4xl grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:h-[400px] md:grid-cols-4 md:grid-rows-3"
    >
      <!-- Title Section - Top Left 2x1 -->
      <div
        class="col-span-1 min-[360px]:col-span-2 md:col-span-2 md:row-span-1 flex flex-col justify-center rounded-xl border border-background-dark-400 bg-background-dark-300 p-6"
        v-motion="{
          initial: { y: 10, opacity: 0 },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: { duration: 350, delay: 150, ease: 'easeInOut' },
          },
        }"
      >
        <p class="mb-2 text-lg font-medium text-background-light-500">
          Hey there,
        </p>
        <h1 class="text-2xl font-bold min-[360px]:text-3xl md:text-4xl text-white">
          I'm <span class="font-mono text-primary-dark">Jarne Delarue</span>
        </h1>
      </div>

      <!-- Current Employer - Top Right 2x1 -->
      <div
        class="col-span-1 min-[360px]:col-span-2 md:col-span-2 md:row-span-1 flex flex-col justify-center rounded-xl border border-background-dark-400 bg-background-dark-400 p-6"
        v-motion="{
          initial: { x: 200, opacity: 0 },
          visibleOnce: {
            x: 0,
            opacity: 1,
            transition: { duration: 350, delay: 200, ease: 'easeInOut' },
          },
        }"
      >
        <p class="mb-1 text-sm font-medium text-primary-dark">
          Currently at
        </p>
        <h2 class="text-xl font-bold text-white">Numble</h2>
        <p class="text-sm text-background-light-500">
          Full stack Umbraco Developer
        </p>
      </div>

      <!-- Profile Picture - Middle Right 1x2 -->
      <div
        class="col-span-1 min-[360px]:col-span-1 md:col-span-1 md:row-span-2 flex items-center justify-center rounded-xl border border-background-dark-400 bg-gradient-to-br from-background-dark-500 to-background-dark-400 p-4"
        v-motion="{
          initial: { opacity: 0, scale: 0.8 },
          visibleOnce: {
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.8,
              type: 'spring',
              stiffness: 250,
              damping: 20,
              mass: 5,
            },
          },
        }"
      >
        <BaseImage
          src="/images/profile.webp"
          alt="Profile"
          width-px="200px"
          height-px="200px"
          width="200px"
          class="h-24 w-24 min-[360px]:h-32 min-[360px]:w-32 md:h-full md:w-full rounded-lg object-cover shadow-lg"
          :zoom-scale="1.05"
        />
      </div>

      <!-- About Text 1 - Middle Left on desktop, mobile position varies -->
      <div
        class="order-4 md:order-none col-span-1 min-[360px]:col-span-1 md:col-span-2 md:row-span-1 flex flex-col justify-center rounded-xl border border-background-dark-400 bg-background-dark-400 p-6"
        v-motion="{
          initial: { y: 20, opacity: 0 },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: { duration: 350, delay: 300, ease: 'easeInOut' },
          },
        }"
      >
        <p class="text-xs min-[360px]:text-sm leading-relaxed text-background-light-500">
          Hi there! I'm a <strong>full-stack web developer</strong> and
          <strong>Linux</strong> enthusiast who enjoys building beautiful and
          functional websites.
        </p>
      </div>

      <!-- Location - Bottom Left on desktop, mobile position varies -->
      <div
        class="order-3 md:order-none col-span-1 min-[360px]:col-span-1 md:col-span-1 md:row-span-1 flex flex-col items-center justify-center rounded-xl border border-background-dark-400 bg-background-dark-400 p-4"
        v-motion="{
          initial: { y: 20, opacity: 0 },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: { duration: 350, delay: 400, ease: 'easeInOut' },
          },
        }"
      >
        <div class="mb-2 text-2xl">📍</div>
        <p class="text-center text-xs min-[360px]:text-sm font-medium text-white">
          Ghent, Belgium
        </p>
      </div>

      <!-- About Text 2 - Bottom Middle 1x1 -->
      <div
        class="col-span-1 min-[360px]:col-span-1 md:col-span-1 md:row-span-1 flex flex-col justify-center rounded-xl border border-background-dark-400 bg-background-dark-400 p-4"
        v-motion="{
          initial: { y: 20, opacity: 0 },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: { duration: 350, delay: 450, ease: 'easeInOut' },
          },
        }"
      >
        <p class="text-xs leading-relaxed text-background-light-500">
          Strong focus on <strong>accessibility</strong> and attention to
          detail.
        </p>
      </div>

      <!-- About Text 3 - Bottom Middle-Left 1x1 -->
      <div
        class="col-span-1 min-[360px]:col-span-1 md:col-span-1 md:row-span-1 flex flex-col justify-center rounded-xl border border-background-dark-400 bg-background-dark-400 p-4"
        v-motion="{
          initial: { y: 20, opacity: 0 },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: { duration: 350, delay: 500, ease: 'easeInOut' },
          },
        }"
      >
        <p class="text-xs leading-relaxed text-background-light-500">
          Love learning new <strong>technologies</strong> and tinkering with
          Linux.
        </p>
      </div>

      <!-- CTA Button - Bottom Right 1x1 -->
      <NuxtLink
        to="/#projects"
        class="col-span-1 min-[360px]:col-span-1 md:col-span-1 md:row-span-1 border-2 border-solid border-primary-dark flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-dark/10 to-primary-light/10 p-4 hocus:bg-primary-dark hocus:text-white transition-colors duration-300"
        v-motion="{
          initial: { y: 30, opacity: 0 },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: { duration: 350, delay: 600, ease: 'easeInOut' },
          },
        }"
      >
        <span class="text-center text-xs min-[360px]:text-sm text-background-light-500">Explore my work</span>
        <LucideArrowRight :size="14" class="ml-1"/>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import {  LucideArrowRight } from 'lucide-vue-next';

</script>

<style scoped lang="scss">
// Additional custom styles if needed
.hocus\:bg-teal-400:hover,
.hocus\:bg-teal-400:focus {
  background-color: #2dd4bf;
}

.hocus\:text-white:hover,
.hocus\:text-white:focus {
  color: white;
}
</style>
