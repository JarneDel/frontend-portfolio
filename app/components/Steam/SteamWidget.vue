<template>
  <div class="mx-auto max-w-2xl">
    <div v-if="pending" class="animate-pulse">
      <div class="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
      <div class="h-3 w-1/2 rounded bg-gray-300"></div>
    </div>

    <div v-else-if="error" class="text-red-500">Failed to load Steam data</div>

    <div v-else-if="steamData && currentGameData" class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
      <!-- Player Info Card - Top Left -->
      <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 transition-colors duration-200 hover:shadow-lg">
        <div class="flex items-center space-x-3">
          <NuxtImg
            :src="currentGameData.playerInfo.avatar"
            :alt="currentGameData.playerInfo.personaname"
            class="h-12 w-12 rounded-full"
            loading="lazy"
          >
            <template #placeholder>
              <div class="h-12 w-12 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full"></div>
            </template>
          </NuxtImg>
          <div>
            <p class="font-bold text-lg">
              {{ currentGameData.playerInfo.personaname }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ getPlayerStatus(currentGameData.playerInfo.personastate) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Current Game Card - Top Right -->
      <div v-if="currentGameData.currentGame" class="bg-gradient-to-br from-primary-dark to-primary-light text-white rounded-xl p-4 transition-all duration-200 hover:shadow-lg">
        <div class="flex items-center space-x-2 mb-2">
          <div class="h-2 w-2 animate-pulse rounded-full bg-white/70"></div>
          <h3 class="text-sm font-semibold uppercase tracking-wide text-white/80">
            Currently Playing
          </h3>
        </div>
        <p class="font-bold text-xl">{{ currentGameData.currentGame.name }}</p>
      </div>

      <!-- Last Played Game Card - When not currently playing -->
      <div v-else-if="sortedRecentGames.length > 0" class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 transition-colors duration-200 border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg">
        <div class="flex items-center space-x-2 mb-2">
          <div class="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
          <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
            Last Played
          </h3>
        </div>
        <div class="flex items-center space-x-3">
          <NuxtImg
            :src="sortedRecentGames[0]?.iconUrl || ''"
            :alt="sortedRecentGames[0]?.name || 'Game'"
            class="h-10 w-10 rounded"
            loading="lazy"
          >
            <template #placeholder>
              <div class="h-10 w-10 bg-gray-300 dark:bg-gray-600 animate-pulse rounded"></div>
            </template>
          </NuxtImg>
          <div class="flex-1 min-w-0">
            <p class="font-bold text-lg truncate">{{ sortedRecentGames[0]?.name || 'Unknown Game' }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatPlaytime(sortedRecentGames[0]?.playtime2weeks) }} in last 2 weeks
            </p>
          </div>
        </div>
      </div>

      <!-- Recent Games Card - Bottom Left -->
      <div v-if="sortedRecentGames.length > 0" class="group bg-gray-50 dark:bg-gray-800 rounded-xl p-4 transition-colors duration-200 hover:shadow-lg">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-3">
          Recent Games
        </h3>
        <div class="space-y-2">
          <div
            v-for="game in sortedRecentGames.slice(0, 3)"
            :key="game.id"
            class="flex items-center space-x-2 group-hover:bg-gray-50 group-hover:dark:bg-gray-800 transition-colors rounded-lg"
          >
            <NuxtImg
              :src="game.iconUrl"
              :alt="game.name"
              class="h-6 w-6 rounded flex-shrink-0"
              loading="lazy"
            >
              <template #placeholder>
                <div class="h-6 w-6 bg-gray-300 dark:bg-gray-600 animate-pulse rounded flex-shrink-0"></div>
              </template>
            </NuxtImg>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ game.name }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatPlaytime(game.playtime2weeks) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Most Played Games Card - Bottom Right -->
      <div v-if="steamData.mostPlayedGames.length > 0" class="group bg-gray-50 dark:bg-gray-800 rounded-xl p-4 transition-colors duration-200 hover:shadow-lg">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
            Most Played
          </h3>
          <div class="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{{ currentPage + 1 }}/{{ totalPages }}</span>
          </div>
        </div>
        
        <div class="mb-3">
          <Transition
            name="fade"
            mode="out-in"
            appear
          >
            <div :key="currentPage" class="grid grid-cols-2 sm:grid-cols-2 gap-2">
              <div
                v-for="game in paginatedMostPlayedGames"
                :key="game.id"
                class="flex flex-col items-center text-center p-2 rounded-lg bg-gray-100 dark:bg-gray-750 transition-colors hover:shadow-md"
              >
            <NuxtImg
              :src="game.iconUrl"
              :alt="game.name"
              class="h-8 w-8 rounded mb-1 flex-shrink-0"
              loading="lazy"
            >
              <template #placeholder>
                <div class="h-8 w-8 bg-gray-300 dark:bg-gray-600 animate-pulse rounded mb-1"></div>
              </template>
            </NuxtImg>
            <p class="text-xs font-medium truncate w-full">{{ game.name }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ formatPlaytime(game.playtimeForever) }}
            </p>
          </div>
            </div>
          </Transition>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="prevPage"
            :disabled="!canGoPrev"
            class="flex items-center px-2 py-1 text-xs font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600"
            :class="canGoPrev ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'"
          >
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>
          
          <div class="flex space-x-1">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page - 1"
              class="w-6 h-6 text-xs rounded transition-colors"
              :class="currentPage === page - 1 
                ? 'bg-primary-dark text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'"
            >
              {{ page }}
            </button>
          </div>
          
          <button
            @click="nextPage"
            :disabled="!canGoNext"
            class="flex items-center px-2 py-1 text-xs font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600"
            :class="canGoNext ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'"
          >
            Next
            <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorMode, useIntervalFn } from '@vueuse/core'
import {
  PlayerState,
  type SteamData,
  type CurrentGame,
  type PlayerInfo,
} from '~~/Interfaces/ISteam'

// Fetch static Steam data (can be cached more aggressively)
const {
  data: steamData,
  pending: steamPending,
  error: steamError,
  refresh: refreshSteam,
} = await useAsyncData('steamData', () => $fetch<SteamData>('/api/steam'), {
  server: true,
})

// Fetch current game status (updates more frequently, less cached)
const {
  data: currentGameData,
  pending: currentGamePending,
  error: currentGameError,
  refresh: refreshCurrentGame,
} = await useAsyncData(
  'steamCurrentGame',
  () =>
    $fetch<{ currentGame: CurrentGame | null; playerInfo: PlayerInfo }>(
      '/api/steam/current',
    ),
  {
    server: true,
  },
)

// Computed values for template
const pending = computed(() => steamPending.value || currentGamePending.value)
const error = computed(() => steamError.value || currentGameError.value)

// Sort recent games by last played time (most recent first)
const sortedRecentGames = computed(() => {
  if (!steamData.value?.recentGames) return []
  return [...steamData.value.recentGames].sort((a, b) => {
    const aLastPlayed = a.lastPlayed || 0
    const bLastPlayed = b.lastPlayed || 0
    return bLastPlayed - aLastPlayed // Sort descending (most recent first)
  })
})

const currentPage = ref(0)
const gamesPerPage = 6

const paginatedMostPlayedGames = computed(() => {
  if (!steamData.value?.mostPlayedGames) return []
  const startIndex = currentPage.value * gamesPerPage
  return steamData.value.mostPlayedGames.slice(startIndex, startIndex + gamesPerPage)
})

const totalPages = computed(() => {
  if (!steamData.value?.mostPlayedGames) return 0
  return Math.ceil(steamData.value.mostPlayedGames.length / gamesPerPage)
})

const canGoNext = computed(() => currentPage.value < totalPages.value - 1)
const canGoPrev = computed(() => currentPage.value > 0)

function nextPage() {
  if (canGoNext.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (canGoPrev.value) {
    currentPage.value--
  }
}

// Refresh static Steam data every 30 minutes (less frequent)
useIntervalFn(
  () => {
    refreshSteam()
  },
  30 * 60 * 1000,
)

// Refresh current game status every 2 minutes (more frequent)
useIntervalFn(
  () => {
    refreshCurrentGame()
  },
  2 * 60 * 1000,
  { immediate: true },
)

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

function getPlayerStatus(state: PlayerState): string {
  const statuses: Record<PlayerState, string> = {
    [PlayerState.Offline]: 'Offline',
    [PlayerState.Online]: 'Online',
    [PlayerState.Busy]: 'Busy',
    [PlayerState.Away]: 'Away',
    [PlayerState.Snooze]: 'Snooze',
    [PlayerState.LookingToTrade]: 'Looking to trade',
    [PlayerState.LookingToPlay]: 'Looking to play',
  }
  return statuses[state] || 'Unknown'
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 100ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: .7;
}
</style>
