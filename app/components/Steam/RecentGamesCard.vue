<template>
  <div
    v-if="sortedRecentGames.length > 0"
    class="group col-span-2 row-span-2 rounded-xl bg-gray-50 p-4 transition-colors duration-200 dark:bg-gray-800"
    style="grid-column: span 2; grid-row: span 2"
  >
    <h3
      class="mb-4 text-sm font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400"
    >
      Recent Games
    </h3>

    <!-- Bento Grid Layout -->
    <div
      class="grid gap-2"
      :style="{
        gridTemplateColumns: '1fr 1fr 1fr',
      }"
    >
      <!-- First game - larger featured item -->
      <div
        v-if="sortedRecentGames[0]"
        class="col-span-2 flex items-center space-x-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3 transition-all duration-200 hover:from-blue-100 hover:to-purple-100 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500"
      >
        <BaseImage
          :src="sortedRecentGames[0].iconUrl"
          :alt="sortedRecentGames[0].name"
          class="h-10 w-10 flex-shrink-0 rounded-lg shadow-sm"
          loading="lazy"
        />
        <div class="min-w-0 flex-1">
          <p
            class="truncate text-sm font-semibold text-gray-900 dark:text-white"
          >
            {{ sortedRecentGames[0].name }}
          </p>
          <p class="text-xs text-gray-600 dark:text-gray-300">
            {{ formatPlaytime(sortedRecentGames[0].playtime2weeks) }}
            recent
          </p>
        </div>
      </div>

      <!-- Games 2-6 - smaller grid items -->
      <div
        v-for="game in sortedRecentGames.slice(1, 8)"
        :key="game.id"
        class="min-w-0"
        :class="{
          'dark:bg-gray-750 col-span-1 flex flex-col items-center space-y-2 rounded-lg bg-white p-3 text-center transition-all duration-200 hover:bg-gray-50 hover:shadow-sm dark:hover:bg-gray-700':
            game !== sortedRecentGames[sortedRecentGames.length - 1] ||
            (sortedRecentGames.length % 3 === 2 &&
              game === sortedRecentGames[sortedRecentGames.length - 1]),
          'col-span-2 flex items-center space-x-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3 transition-all duration-200 hover:from-blue-100 hover:to-purple-100 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500':
            sortedRecentGames.length % 3 === 1 &&
            game === sortedRecentGames[sortedRecentGames.length - 1],
          'col-span-3 flex items-center space-x-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3 transition-all duration-200 hover:from-blue-100 hover:to-purple-100 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500':
            sortedRecentGames.length % 3 === 0 &&
            game === sortedRecentGames[sortedRecentGames.length - 1],
        }"
      >
        <BaseImage
          :src="game.iconUrl"
          :alt="game.name"
          class="h-8 w-8 flex-shrink-0 rounded-md"
          loading="lazy"
        />
        <div class="max-w-full">
          <p
            class="truncate text-sm text-gray-900 dark:text-white"
            :class="[game !== sortedRecentGames[sortedRecentGames.length - 1] ||
            (sortedRecentGames.length % 3 === 2 &&
              game === sortedRecentGames[sortedRecentGames.length - 1]) ? 'font-medium' : 'font-semibold']"
            :title="game.name"
          >
            {{ game.name }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ formatPlaytime(game.playtime2weeks) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseImage from '../Styled/baseImage.vue'

interface RecentGame {
  id: string
  name: string
  iconUrl: string
  playtime2weeks: number
  lastPlayed?: number
}

interface Props {
  recentGames: RecentGame[]
}

const props = defineProps<Props>()

// Sort recent games by last played time (most recent first)
const sortedRecentGames = computed(() => {
  if (!props.recentGames) return []
  return [...props.recentGames].sort((a, b) => {
    const aLastPlayed = a.lastPlayed || 0
    const bLastPlayed = b.lastPlayed || 0
    return bLastPlayed - aLastPlayed // Sort descending (most recent first)
  })
})

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
