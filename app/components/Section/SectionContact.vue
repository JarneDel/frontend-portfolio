<template>
  <article class="py-12" id="contact">
    <div class="mx-auto max-w-7xl">
      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[65%_35%]">
        <!-- Left Column - Header and Contact Form -->
        <div class="flex flex-col gap-4">
          <!-- Header Section -->
          <div
            class="flex flex-1 flex-col justify-center rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800"
            v-motion="{
              initial: { opacity: 0, y: 20 },
              visibleOnce: { opacity: 1, y: 0 },
            }"
          >
            <h2
              class="mb-4 text-3xl font-bold text-gray-900 accent-teal-700 dark:text-gray-100"
            >
              Get in touch
            </h2>
            <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
              I'm currently gaining valuable experience at Numble and enjoying
              my role there. While I'm not actively job searching, I'm always
              open to hearing about interesting opportunities and connecting
              with fellow developers.
            </p>
          </div>

          <!-- Contact Form -->
          <div
            class="flex-1 rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800"
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
            class="flex flex-1 flex-col justify-center rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800"
            v-motion="{
              initial: { opacity: 0, y: 20 },
              visibleOnce: { opacity: 1, y: 0, transition: { delay: 0.5 } },
            }"
          >
            <h3
              class="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              Quick Contact
            </h3>
            <a
              :href="`mailto:contact@jarnedel.dev`"
              class="hocus:bg-primary-dark hocus:text-white mb-4 inline-flex items-center justify-center rounded-lg border-2 border-solid border-teal-400 p-3 text-center transition-colors duration-300 outline-none focus-visible:ring focus-visible:ring-teal-600"
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
            class="dark: flex flex-1 flex-col justify-center rounded-lg bg-gradient-to-br from-teal-300 to-blue-300 p-6 text-white shadow-lg dark:from-teal-500 dark:to-blue-500"
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
            class="flex flex-1 flex-col justify-center rounded-lg bg-gray-50 p-6 shadow-lg dark:bg-gray-700"
            v-motion="{
              initial: { opacity: 0, x: 20 },
              visibleOnce: { opacity: 1, x: 0, transition: { delay: 0.9 } },
            }"
          >
            <h3
              class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100"
            >
              ⚡ Quick Response
            </h3>
          </div>

          <!-- Fun Fact Card -->
          <div
            class="flex flex-1 flex-col justify-center rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 p-6 shadow-lg dark:from-purple-600 dark:to-pink-600 dark:text-white"
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
