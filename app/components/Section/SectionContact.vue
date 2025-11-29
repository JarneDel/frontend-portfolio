<template>
  <article class="py-12" id="contact">
    <div class="mx-auto max-w-7xl">
      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[65%_35%]">
        <!-- Left Column - Header and Contact Form -->
        <div class="flex flex-col gap-4">
          <!-- Header Section -->
          <div
            class="flex flex-1 flex-col justify-center rounded-lg bg-background-dark-300 p-6 shadow-lg border border-background-dark-400"
            v-motion="{
              initial: { opacity: 0, y: 20 },
              visibleOnce: { opacity: 1, y: 0 },
            }"
          >
            <h2
              class="mb-4 text-3xl font-bold text-white"
            >
              Get in touch
            </h2>
            <p class="text-lg font-medium text-background-light-500">
              I'm currently gaining valuable experience at Numble and enjoying
              my role there. While I'm not actively job searching, I'm always
              open to hearing about interesting opportunities and connecting
              with fellow developers.
            </p>
          </div>

          <!-- Contact Form -->
          <div
            class="flex-1 rounded-lg bg-background-dark-300 p-6 shadow-lg border border-background-dark-400"
            v-motion="{
              initial: { opacity: 0, y: 20 },
              visibleOnce: { opacity: 1, y: 0, transition: { delay: 0.3 } },
            }"
          >
            <contact-form />
          </div>
        </div>

        <!-- Right Column - Quick Contact and Fun Elements -->
        <div class="flex flex-col gap-4">
          <!-- Quick Contact Button -->
          <div
            class="flex flex-1 flex-col justify-center rounded-lg bg-background-dark-300 p-6 shadow-lg border border-background-dark-400"
            v-motion="{
              initial: { opacity: 0, y: 20 },
              visibleOnce: { opacity: 1, y: 0, transition: { delay: 0.5 } },
            }"
          >
            <h3
              class="mb-4 text-xl font-semibold text-white"
            >
              Quick Contact
            </h3>
            <a
              :href="`mailto:contact@jarnedel.dev`"
              class="hocus:bg-primary-dark hocus:text-white mb-4 inline-flex items-center justify-center rounded-lg border-2 border-solid border-primary-dark p-3 text-center transition-colors duration-300 outline-none focus-visible:ring focus-visible:ring-primary-dark"
            >
              Get in touch via email
            </a>

            <!-- Social Links -->
            <div class="flex items-center justify-center gap-4">
              <Github
                :to="socials.github"
                :size="24"
                class="hocus:text-teal-600 dark:hocus:text-teal-400 text-gray-600 transition-colors duration-200 dark:text-gray-400"
              />
              <LinkedIn
                :to="socials.linkedin"
                :size="24"
                class="hocus:text-teal-600 dark:hocus:text-teal-400 text-gray-600 transition-colors duration-200 dark:text-gray-400"
              />
            </div>
          </div>

          <!-- Current Status Card -->
          <div
            class="dark: flex flex-1 flex-col justify-center rounded-lg bg-gradient-to-br from-primary-dark to-primary-light p-6 text-white shadow-lg"
            v-motion="{
              initial: { opacity: 0, scale: 0.9 },
              visibleOnce: { opacity: 1, scale: 1, transition: { delay: 0.7 } },
            }"
          >
            <h3 class="mb-2 text-lg font-semibold">Current Status</h3>
            <div class="flex items-center gap-2">
              <div
                class="h-3 w-3 animate-pulse rounded-full bg-yellow-300"
              ></div>
              <span class="text-sm"
                >Content at Numble, open to opportunities</span
              >
            </div>
            <p class="mt-2 text-sm opacity-90">
              Not actively searching, but happy to discuss interesting roles
            </p>
          </div>

          <!-- Response Time Card -->
          <div
            class="flex flex-1 flex-col justify-center rounded-lg bg-background-dark-300 p-6 shadow-lg border border-background-dark-400"
            v-motion="{
              initial: { opacity: 0, x: 20 },
              visibleOnce: { opacity: 1, x: 0, transition: { delay: 0.9 } },
            }"
          >
            <h3
              class="mb-2 text-lg font-semibold text-white"
            >
              ⚡ Quick Response
            </h3>
          </div>

          <!-- Fun Fact Card -->
          <div
            class="flex flex-1 flex-col justify-center rounded-lg bg-gradient-to-br from-primary-dark to-primary-light p-6 shadow-lg text-white"
            v-motion="{
              initial: { opacity: 0, y: 20 },
              visibleOnce: { opacity: 1, y: 0, transition: { delay: 1.1 } },
            }"
          >
            <h3 class="mb-2 text-lg font-semibold">💡 Fun Fact</h3>
            <p class="text-sm opacity-90">
              I'm powered by creativity, boundless energy, and a dash of ADHD.
              Let's build something amazing together!
            </p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import Github from '~/components/navigation/Github.vue'
import LinkedIn from '~/components/navigation/LinkedIn.vue'
import Mail from '~/components/navigation/Mail.vue'

const socials = useSocials().socials
</script>
