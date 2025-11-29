<template>
  <div class="mx-auto max-w-7xl">
    <div v-if="pending" class="animate-pulse">
      <div class="mb-2 h-4 w-3/4 rounded bg-background-dark-400"></div>
      <div class="h-3 w-1/2 rounded bg-background-dark-400"></div>
    </div>

    <div
      v-else-if="steamData && currentGameData"
      class="flex flex-col gap-4 lg:flex-row"
      v-motion="{
        initial: { opacity: 0, y: 20 },
        visibleOnce: { opacity: 1, y: 0 },
      }"
    >

      <div class="flex w-full flex-col gap-4 lg:w-3/5">
        <div
          class="flex-1 h-max"
          v-motion="{
            initial: { opacity: 0, y: 20 },
            visibleOnce: { opacity: 1, y: 0, transition: { delay: 0.1 } },
          }"
        >
          <PlayerInfoCard :player-info="currentGameData.playerInfo" />
        </div>

        <div
          class="flex-1 basis-2/5"
          v-motion="{
            initial: { opacity: 0, y: 20 },
            visibleOnce: { opacity: 1, y: 0, transition: { delay: 0.2 } },
          }"
        >
          <div
            v-if="steamData.recentGames && steamData.recentGames.length > 0"
            class="flex-1 basis-3/4"
          >
            <RecentGamesCard :recent-games="steamData.recentGames" />
          </div>
        </div>

        <div
          v-if="steamData.platformStats"
          class="flex-1 basis-1/5"
          v-motion="{
            initial: { opacity: 0, y: 20 },
            visibleOnce: { opacity: 1, y: 0, transition: { delay: 0.3 } },
          }"
        >
          <PlatformStats :platform-stats="steamData.platformStats" />
        </div>
      </div>

      <div class="flex w-full flex-col gap-4 lg:w-2/5">
        <div
          v-motion="{
            initial: { opacity: 0, x: 20 },
            visibleOnce: { opacity: 1, x: 0, transition: { delay: 0.4 } },
          }"
        >
          <GameStatusCard
            :current-game="currentGameData.currentGame"
            :last-played-game="steamData.lastPlayedGame"
          />
        </div>
        <div
          v-if="
            steamData.mostPlayedGames && steamData.mostPlayedGames.length > 0
          "
          class="flex-1 basis-1/4"
          v-motion="{
            initial: { opacity: 0, x: 20 },
            visibleOnce: { opacity: 1, x: 0, transition: { delay: 0.5 } },
          }"
        >
          <MostPlayedGamesCard :most-played-games="steamData.mostPlayedGames" :recent-count="steamData.recentGames.length" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import type { SteamData, CurrentGame, PlayerInfo } from '~~/Interfaces/ISteam'
import PlayerInfoCard from './PlayerInfoCard.vue'
import GameStatusCard from './GameStatusCard.vue'
import RecentGamesCard from './RecentGamesCard.vue'
import MostPlayedGamesCard from './MostPlayedGamesCard.vue'
import PlatformStats from './PlatformStats.vue'

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
</script>
