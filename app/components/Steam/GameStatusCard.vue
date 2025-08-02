<template>
  <!-- Current Game Card -->
  <div
    v-if="currentGame"
    class="col-span-2 row-span-1 from-primary-dark to-primary-light rounded-xl bg-gradient-to-br p-4 text-white transition-all duration-200"
    style="grid-column: span 2;"
  >
    <div class="mb-2 flex items-center space-x-2">
      <div class="h-2 w-2 animate-pulse rounded-full bg-white/70"></div>
      <h3
        class="text-sm font-semibold tracking-wide text-white/80 uppercase"
      >
        Currently Playing
      </h3>
    </div>
    <div class="flex items-center space-x-3">
      <BaseImage
        v-if="currentGame.iconUrl"
        :src="currentGame.iconUrl"
        :alt="currentGame.name"
        class="h-10 w-10 rounded"
        loading="lazy"
      />
      <p class="text-xl font-bold">
        {{ currentGame.name }}
      </p>
    </div>
  </div>


  <!-- Last Played Game Card - When not currently playing -->
  <div
    v-else-if="lastPlayedGame"
    class="col-span-2 row-span-1 rounded-xl border-2 border-gray-200 bg-gray-50 p-4 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800"
    style="grid-column: span 2;"
  >
    <div class="mb-2 flex items-center space-x-2">
      <div
        class="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"
      ></div>
      <h3
        class="text-sm font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400"
      >
        Last Played
      </h3>
    </div>
    <div class="flex items-center space-x-3">
      <BaseImage
        :src="lastPlayedGame.iconUrl"
        :alt="lastPlayedGame.name"
        class="h-10 w-10 rounded"
        loading="lazy"
      />
      <div class="min-w-0 flex-1">
        <p class="truncate text-lg font-bold">
          {{ lastPlayedGame.name }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ formatPlaytime(lastPlayedGame.playtimeForever) }}
          total playtime
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CurrentGame } from '~~/Interfaces/ISteam'
import BaseImage from '../Styled/baseImage.vue'

interface Game {
  id: string
  name: string
  iconUrl: string
  playtimeForever: number
}

interface Props {
  currentGame?: CurrentGame | null
  lastPlayedGame?: Game | null
}

defineProps<Props>()

function formatPlaytime(minutes?: number): string {
  if (!minutes) return '0 minutes'

  if (minutes < 60) {
    return `${minutes} minutes`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours < 24) {
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours} hours`
  }

  const days = Math.floor(hours / 24)
  const remainingHours = hours % 24

  return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days} days`
}
</script>
