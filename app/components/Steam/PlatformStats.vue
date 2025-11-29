<template>
  <div
    class="rounded-xl bg-background-dark-300 p-4 transition-colors duration-200 border border-background-dark-400 shadow-lg"
  >
    <h3
      class="mb-3 text-sm font-semibold tracking-wide text-background-light-500 uppercase"
    >
      Platform Statistics
    </h3>

    <div class="space-y-3">
      <!-- Linux Stats -->
      <div class="flex items-center justify-between text-sm">
        <!-- Icon -->
        <div class="flex items-center justify-center h-8 w-8 rounded-lg bg-background-dark-400">
          <ArchLinux class="h-5 w-5 text-green-500" />
        </div>
        <!-- Platform Info -->
        <div class="flex-1 ml-3">
          <p class="font-semibold text-white">Linux</p>
          <p class="text-xs text-background-light-500">
            {{ platformStats.linuxGamesCount }} games
          </p>
        </div>
        <!-- Playtime & Percentage -->
        <div class="text-right">
          <p class="font-bold text-white">
            {{ formatPlaytime(platformStats.totalLinuxPlaytime) }}
          </p>
          <p class="text-xs text-background-light-500">
            {{ getPercentage(platformStats.totalLinuxPlaytime) }}% of total
          </p>
        </div>
      </div>

      <!-- Windows Stats -->
      <div class="flex items-center justify-between text-sm">
        <!-- Icon -->
        <div class="flex items-center justify-center h-8 w-8 rounded-lg bg-background-dark-400">
          <svg
            class="h-5 w-5 text-blue-500"
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
          <p class="font-semibold text-white">Windows</p>
          <p class="text-xs text-background-light-500">
            {{ platformStats.windowsGamesCount }} games
          </p>
        </div>
        <!-- Playtime & Percentage -->
        <div class="text-right">
          <p class="font-bold text-white">
            {{ formatPlaytime(platformStats.totalWindowsPlaytime) }}
          </p>
          <p class="text-xs text-background-light-500">
            {{ getPercentage(platformStats.totalWindowsPlaytime) }}% of total
          </p>
        </div>
      </div>

      <!-- Combined Progress Bar -->
      <div
        class="relative h-2 w-full overflow-hidden rounded-full bg-background-dark-400"
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
      <div class="!mt-4 border-t border-background-dark-400 pt-3 flex items-center justify-between">
        <span class="text-sm font-medium text-background-light-500"
          >Total Playtime</span
        >
        <span class="text-lg font-bold text-white">
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
