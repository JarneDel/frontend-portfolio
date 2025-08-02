<template>
  <article class="py-12" id="contact">
    <div class="mx-auto max-w-7xl">
      <!-- Bento Grid Layout -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-[65%_35%]">
        
        <!-- Left Column - Header and Contact Form -->
        <div class="flex flex-col gap-4">
          <!-- Header Section -->
          <div 
            class="flex flex-col justify-center rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800 flex-1"
            v-motion="{
              initial: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }"
          >
            <h2 class="mb-4 text-3xl font-bold text-gray-900 accent-teal-700 dark:text-gray-100">
              Get in touch
            </h2>
            <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
              I'm currently gaining valuable experience at Numble and enjoying my role there. 
              While I'm not actively job searching, I'm always open to hearing about interesting 
              opportunities and connecting with fellow developers.
            </p>
          </div>

          <!-- Contact Form -->
          <div 
            class="rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800 flex-1"
            v-motion="{
              initial: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.3 } },
            }"
          >
            <contact-form />
          </div>
        </div>

        <!-- Right Column - Quick Contact and Fun Elements -->
        <div class="flex flex-col gap-4">
          <!-- Quick Contact Button -->
          <div 
            class="flex flex-col justify-center rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800 flex-1"
            v-motion="{
              initial: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
            }"
          >
            <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Quick Contact
            </h3>
            <a
              :href="`mailto:contact@jarnedel.dev`"
              class="inline-flex items-center justify-center rounded-lg border-2 border-solid border-teal-400 p-3 text-center outline-none transition-colors duration-300 focus-visible:ring focus-visible:ring-teal-600 hocus:bg-primary-dark hocus:text-white"
            >
              Get in touch via email
            </a>
          </div>

          <!-- Current Status Card -->
          <div 
            class="flex flex-col justify-center rounded-lg bg-gradient-to-br from-teal-300 to-blue-300 dark:from-teal-500 dark:to-blue-500 p-6 dark:  text-white shadow-lg flex-1"
            v-motion="{
              initial: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { delay: 0.7 } },
            }"
          >
            <h3 class="mb-2 text-lg font-semibold">Current Status</h3>
            <div class="flex items-center gap-2">
              <div class="h-3 w-3 animate-pulse rounded-full bg-yellow-300"></div>
              <span class="text-sm">Content at Numble, open to opportunities</span>
            </div>
            <p class="mt-2 text-sm opacity-90">
              Not actively searching, but happy to discuss interesting roles
            </p>
          </div>

          <!-- Response Time Card -->
          <div 
            class="flex flex-col justify-center rounded-lg bg-gray-50 p-6 shadow-lg dark:bg-gray-700 flex-1"
            v-motion="{
              initial: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0, transition: { delay: 0.9 } },
            }"
          >
            <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              ⚡ Quick Response
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              I typically respond within <strong class="text-teal-600 dark:text-teal-400">24 hours</strong>
            </p>
            <div class="mt-3 flex items-center gap-2">
              <div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                <div class="h-2 w-5/6 rounded-full bg-teal-500 transition-all duration-1000"></div>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400">83%</span>
            </div>
          </div>

          <!-- Fun Fact Card -->
          <div 
            class="flex flex-col justify-center rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 p-6 dark:text-white shadow-lg flex-1"
            v-motion="{
              initial: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 1.1 } },
            }"
          >
            <h3 class="mb-2 text-lg font-semibold">💡 Fun Fact</h3>
            <p class="text-sm opacity-90">
              I'm powered by creativity, boundless energy, and a dash of ADHD. Let's build something amazing together!
            </p>
          </div>
        </div>

      </div>
    </div>
  </article>
</template>

<script setup lang="ts"></script>
