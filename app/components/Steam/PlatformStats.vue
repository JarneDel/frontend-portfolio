<template>
  <div
    class="rounded-xl bg-gray-50 p-4 transition-colors duration-200 dark:bg-gray-800"
  >
    <h3
      class="mb-3 text-sm font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400"
    >
      Platform Statistics
    </h3>

    <div class="space-y-3">
      <!-- Linux Stats -->
      <div class="flex items-center justify-between text-sm">
        <!-- Icon -->
        <div class="flex items-center justify-center h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30">
          <ArchLinux class="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <!-- Platform Info -->
        <div class="flex-1 ml-3">
          <p class="font-semibold text-gray-900 dark:text-white">Linux</p>
          <p class="text-xs text-gray-600 dark:text-gray-400">
            {{ platformStats.linuxGamesCount }} games
          </p>
        </div>
        <!-- Playtime & Percentage -->
        <div class="text-right">
          <p class="font-bold text-gray-900 dark:text-white">
            {{ formatPlaytime(platformStats.totalLinuxPlaytime) }}
          </p>
          <p class="text-xs text-gray-600 dark:text-gray-400">
            {{ getPercentage(platformStats.totalLinuxPlaytime) }}% of total
          </p>
        </div>
      </div>

      <!-- Windows Stats -->
      <div class="flex items-center justify-between text-sm">
        <!-- Icon -->
        <div class="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30">
          <svg
            class="h-5 w-5 text-blue-600 dark:text-blue-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M0 3.449L9.75 2.1v9.451H0zm10.949-1.32L24 0v11.4H10.949zM0 12.6h9.75v9.451L0 20.699zm10.949.45H24V24l-13.051-1.35z"
            />
          </svg>
        </div>
        <!-- Platform Info -->
        <div class="flex-1 ml-3">
          <p class="font-semibold text-gray-900 dark:text-white">Windows</p>
          <p class="text-xs text-gray-600 dark:text-gray-400">
            {{ platformStats.windowsGamesCount }} games
          </p>
        </div>
        <!-- Playtime & Percentage -->
        <div class="text-right">
          <p class="font-bold text-gray-900 dark:text-white">
            {{ formatPlaytime(platformStats.totalWindowsPlaytime) }}
          </p>
          <p class="text-xs text-gray-600 dark:text-gray-400">
            {{ getPercentage(platformStats.totalWindowsPlaytime) }}% of total
          </p>
        </div>
      </div>

      <!-- Combined Progress Bar -->
      <div
        class="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
      >
        <div
          class="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
          :style="{
            width: `${getPercentage(platformStats.totalLinuxPlaytime)}%`,
          }"
        ></div>
        <div
          class="absolute top-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
          :style="{
            left: `${getPercentage(platformStats.totalLinuxPlaytime)}%`,
            width: `${getPercentage(platformStats.totalWindowsPlaytime)}%`,
          }"
        ></div>
      </div>

      <!-- Total Stats -->
      <div class="!mt-4 border-t border-gray-200 dark:border-gray-700 pt-3 flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
          >Total Playtime</span
        >
        <span class="text-lg font-bold text-gray-900 dark:text-white">
          {{ formatPlaytime(totalPlaytime) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PlatformStats } from '~~/Interfaces/ISteam'
import ArchLinux from '../icons/ArchLinux.vue';

interface Props {
  platformStats: PlatformStats
}

const props = defineProps<Props>()

const totalPlaytime = computed(
  () =>
    props.platformStats.totalLinuxPlaytime +
    props.platformStats.totalWindowsPlaytime,
)

const formatPlaytime = (minutes: number): string => {
  if (minutes === 0) return '0h'

  const hours = Math.floor(minutes / 60)
  if (hours < 1) return `${minutes}m`
  // Simplified for compactness
  return `${hours}h`
}

const getPercentage = (minutes: number): number => {
  if (totalPlaytime.value === 0) return 0
  return Math.round((minutes / totalPlaytime.value) * 100)
}
</script>
