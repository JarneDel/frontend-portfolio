<template>
  <article class="mt-20 mb-12 font-sans md:mt-30">
    <!-- Bento Grid Container -->
    <div
      class="mx-auto mb-8 grid h-auto max-w-4xl grid-cols-1 gap-4 min-[360px]:grid-cols-2 md:h-[400px] md:grid-cols-4 md:grid-rows-3"
    >
      <!-- Title Section - Top Left 2x1 -->
      <div
        class="border-background-dark-400 bg-background-dark-300 col-span-1 flex flex-col justify-center rounded-xl border p-6 min-[360px]:col-span-2 md:col-span-2 md:row-span-1"
        v-motion="{
          initial: { y: 10, opacity: 0 },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: { duration: 350, delay: 150, ease: 'easeInOut' },
          },
        }"
      >
        <p class="text-background-light-500 mb-2 text-lg font-medium">
          Hey there,
        </p>
        <h1
          class="text-2xl font-bold text-white min-[360px]:text-3xl md:text-4xl"
        >
          I'm <span class="text-primary-dark font-mono">Jarne Delarue</span>
        </h1>
      </div>

      <!-- Current Employer - Top Right 2x1 -->
      <div
        class="border-background-dark-400 bg-background-dark-400 col-span-1 flex flex-col justify-center rounded-xl border p-6 min-[360px]:col-span-2 md:col-span-2 md:row-span-1"
        v-motion="{
          initial: { x: 200, opacity: 0 },
          visibleOnce: {
            x: 0,
            opacity: 1,
            transition: { duration: 350, delay: 200, ease: 'easeInOut' },
          },
        }"
      >
        <div class="flex items-start justify-between">
          <div>
            <p class="text-primary-dark mb-1 text-sm font-medium">
              Currently at
            </p>
            <h2 class="text-xl font-bold text-white">Numble</h2>
            <p class="text-background-light-500 text-sm">
              Full Stack Umbraco Developer
            </p>
          </div>
          <span
            class="bg-background-dark-300 text-background-light-500 border-background-dark-500 hidden rounded border px-2 py-1 text-xs sm:block"
          >
            Since 08/2024
          </span>
        </div>
      </div>

      <!-- Profile Picture - Middle Right 1x2 -->
      <div
        class="border-background-dark-400 from-background-dark-500 to-background-dark-400 col-span-1 flex items-center justify-center rounded-xl border bg-gradient-to-br p-4 min-[360px]:col-span-1 md:col-span-1 md:row-span-2"
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
          class="h-24 w-24 rounded-lg object-cover shadow-lg min-[360px]:h-32 min-[360px]:w-32 md:h-full md:w-full"
          :zoom-scale="1.05"
        />
      </div>

      <!-- About Text 1 - Middle Left on desktop, mobile position varies -->
      <div
        class="border-background-dark-400 bg-background-dark-400 order-4 col-span-1 flex flex-col justify-center rounded-xl border p-6 min-[360px]:col-span-1 md:order-none md:col-span-2 md:row-span-1"
        v-motion="{
          initial: { y: 20, opacity: 0 },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: { duration: 350, delay: 300, ease: 'easeInOut' },
          },
        }"
      >
        <p
          class="text-background-light-500 text-xs leading-relaxed min-[360px]:text-sm"
        >
          Hi there! I'm a <strong>full-stack web developer</strong> and
          <strong>Linux</strong> enthusiast who enjoys building beautiful and
          functional websites.
        </p>
      </div>

      <!-- Location - Bottom Left on desktop, mobile position varies -->
      <div
        class="border-background-dark-400 bg-background-dark-400 order-3 col-span-1 flex flex-col items-center justify-center rounded-xl border p-4 min-[360px]:col-span-1 md:order-none md:col-span-1 md:row-span-1"
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
        <p
          class="text-center text-xs font-medium text-white min-[360px]:text-sm"
        >
          Ghent, Belgium
        </p>
      </div>

      <!-- About Text 2 - Bottom Middle 1x1 -->
      <div
        class="border-background-dark-400 bg-background-dark-400 col-span-1 flex flex-col justify-center rounded-xl border p-4 min-[360px]:col-span-1 md:col-span-1 md:row-span-1"
        v-motion="{
          initial: { y: 20, opacity: 0 },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: { duration: 350, delay: 450, ease: 'easeInOut' },
          },
        }"
      >
        <p class="text-background-light-500 text-xs leading-relaxed">
          Strong focus on <strong>accessibility</strong> and attention to
          detail.
        </p>
      </div>

      <!-- About Text 3 - Bottom Middle-Left 1x1 -->
      <div
        class="border-background-dark-400 bg-background-dark-400 col-span-1 flex flex-col justify-center rounded-xl border p-4 min-[360px]:col-span-1 md:col-span-1 md:row-span-1"
        v-motion="{
          initial: { y: 20, opacity: 0 },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: { duration: 350, delay: 500, ease: 'easeInOut' },
          },
        }"
      >
        <p class="text-background-light-500 text-xs leading-relaxed">
          Love learning new <strong>technologies</strong> and tinkering with
          Linux.
        </p>
      </div>

      <!-- CTA Button - Bottom Right 1x1 -->
      <NuxtLink
        to="/#projects"
        class="border-primary-dark from-primary-dark/10 to-primary-light/10 hocus:bg-primary-dark hocus:text-white col-span-1 flex items-center justify-center rounded-xl border-2 border-solid bg-gradient-to-r p-4 transition-colors duration-300 min-[360px]:col-span-1 md:col-span-1 md:row-span-1"
        v-motion="{
          initial: { y: 30, opacity: 0 },
          visibleOnce: {
            y: 0,
            opacity: 1,
            transition: { duration: 350, delay: 600, ease: 'easeInOut' },
          },
        }"
      >
        <span
          class="text-background-light-500 text-center text-xs min-[360px]:text-sm"
          >Explore my work</span
        >
        <LucideArrowRight :size="14" class="ml-1" />
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { LucideArrowRight } from 'lucide-vue-next'
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
