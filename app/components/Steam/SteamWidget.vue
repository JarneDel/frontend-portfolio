<template>
  <div class="mx-auto max-w-2xl">
    <div v-if="pending" class="animate-pulse">
      <div class="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
      <div class="h-3 w-1/2 rounded bg-gray-300"></div>
    </div>

    <div v-else-if="error" class="text-red-500">Failed to load Steam data</div>

    <div
      v-else-if="steamData && currentGameData"
      class="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
    >
      <!-- Player Info Card - Top Left -->
      <div
        class="rounded-xl bg-gray-50 p-4 transition-colors duration-200 hover:shadow-lg dark:bg-gray-800"
      >
        <div class="flex items-center space-x-3">
          <BaseImage
            :src="currentGameData.playerInfo.avatar"
            :alt="currentGameData.playerInfo.personaname"
            class="h-12 w-12 rounded-full"
            loading="lazy"
            placeholder="/images/placeholder-full.webp"
          />
          <div>
            <p class="text-lg font-bold">
              {{ currentGameData.playerInfo.personaname }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ getPlayerStatus(currentGameData.playerInfo.personastate) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Current Game Card - Top Right -->
      <div
        v-if="currentGameData.currentGame"
        class="from-primary-dark to-primary-light rounded-xl bg-gradient-to-br p-4 text-white transition-all duration-200 hover:shadow-lg"
      >
        <div class="mb-2 flex items-center space-x-2">
          <div class="h-2 w-2 animate-pulse rounded-full bg-white/70"></div>
          <h3
            class="text-sm font-semibold tracking-wide text-white/80 uppercase"
          >
            Currently Playing
          </h3>
        </div>
        <p class="text-xl font-bold">{{ currentGameData.currentGame.name }}</p>
      </div>

      <!-- Last Played Game Card - When not currently playing -->
      <div
        v-else-if="sortedRecentGames.length > 0"
        class="rounded-xl border-2 border-gray-200 bg-gray-50 p-4 transition-colors duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="mb-2 flex items-center space-x-2">
          <div class="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
          <h3
            class="text-sm font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400"
          >
            Last Played
          </h3>
        </div>
        <div class="flex items-center space-x-3">
          <BaseImage
            :src="sortedRecentGames[0]?.iconUrl || ''"
            :alt="sortedRecentGames[0]?.name || 'Game'"
            class="h-10 w-10 rounded"
            loading="lazy"
          />
          <div class="min-w-0 flex-1">
            <p class="truncate text-lg font-bold">
              {{ sortedRecentGames[0]?.name || 'Unknown Game' }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatPlaytime(sortedRecentGames[0]?.playtime2weeks) }} in last
              2 weeks
            </p>
          </div>
        </div>
      </div>

      <!-- Recent Games Card - Bottom Left -->
      <div
        v-if="sortedRecentGames.length > 0"
        class="group rounded-xl bg-gray-50 p-4 transition-colors duration-200 hover:shadow-lg dark:bg-gray-800"
      >
        <h3
          class="mb-3 text-sm font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400"
        >
          Recent Games
        </h3>
        <div class="space-y-2">
          <div
            v-for="game in sortedRecentGames.slice(0, 3)"
            :key="game.id"
            class="flex items-center space-x-2 rounded-lg transition-colors group-hover:bg-gray-50 group-hover:dark:bg-gray-800"
          >
            <BaseImage
              :src="game.iconUrl"
              :alt="game.name"
              class="h-6 w-6 flex-shrink-0 rounded"
              loading="lazy"
            />
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
      <div
        v-if="steamData.mostPlayedGames.length > 0"
        class="group rounded-xl bg-gray-50 p-4 transition-colors duration-200 hover:shadow-lg dark:bg-gray-800"
      >
        <div class="mb-3 flex items-center justify-between">
          <h3
            class="text-sm font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400"
          >
            Most Played
          </h3>
          <div
            class="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400"
          >
            <span>{{ currentPage + 1 }}/{{ totalPages }}</span>
          </div>
        </div>

        <div class="mb-3">
          <Transition name="fade" mode="out-in" appear>
          <div :key="currentPage" class="grid grid-cols-2 gap-2 sm:grid-cols-2">
            <div
              v-for="game in paginatedMostPlayedGames"
              :key="game.id"
              class="dark:bg-gray-750 flex flex-col items-center rounded-lg bg-gray-100 p-2 text-center transition-colors hover:shadow-md"
            >
              <BaseImage
                :src="game.iconUrl"
                :alt="game.name"
                class="mb-1 h-8 w-8 flex-shrink-0 rounded"
                loading="lazy"
              />
              <p class="w-full truncate text-xs font-medium">
                {{ game.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatPlaytime(game.playtimeForever) }}
              </p>
            </div>
          </div>
          </Transition>
        </div>

        <!-- Pagination Controls -->
        <div
          v-if="totalPages > 1"
          class="flex items-center justify-between border-t border-gray-200 pt-2 dark:border-gray-700"
        >
          <button
            @click="prevPage"
            :disabled="!canGoPrev"
            class="flex items-center rounded px-2 py-1 text-xs font-medium transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-600"
            :class="
              canGoPrev
                ? 'text-gray-700 dark:text-gray-300'
                : 'text-gray-400 dark:text-gray-500'
            "
          >
            <svg
              class="mr-1 h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Prev
          </button>

          <div class="flex space-x-1">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page - 1"
              class="h-6 w-6 rounded text-xs transition-colors"
              :class="
                currentPage === page - 1
                  ? 'bg-primary-dark text-white'
                  : 'text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600'
              "
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="nextPage"
            :disabled="!canGoNext"
            class="flex items-center rounded px-2 py-1 text-xs font-medium transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-600"
            :class="
              canGoNext
                ? 'text-gray-700 dark:text-gray-300'
                : 'text-gray-400 dark:text-gray-500'
            "
          >
            Next
            <svg
              class="ml-1 h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
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
import BaseImage from '../Styled/baseImage.vue';

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

// Pagination setup
const currentPage = ref(0)
const gamesPerPage = 6

// Pre-calculate first page on server, use reactive pagination for subsequent pages
const paginatedMostPlayedGames = computed(() => {
  if (!steamData.value?.mostPlayedGames) return []

  // For SSR and first page, always show first 6 games
  if (import.meta.server || currentPage.value === 0) {
    return steamData.value.mostPlayedGames.slice(0, gamesPerPage)
  }

  // For client-side pagination on subsequent pages
  const startIndex = currentPage.value * gamesPerPage
  return steamData.value.mostPlayedGames.slice(
    startIndex,
    startIndex + gamesPerPage,
  )
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
  opacity: 0.7;
}
</style>
