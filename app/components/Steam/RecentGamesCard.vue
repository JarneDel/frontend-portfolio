<template>
  <div
    v-if="sortedRecentGames.length > 0"
    class="group col-span-2 row-span-2 rounded-xl bg-background-dark-300 p-4 transition-colors duration-200 border border-background-dark-400 shadow-lg"
    style="grid-column: span 2; grid-row: span 2"
  >
    <h3
      class="mb-4 text-sm font-semibold tracking-wide text-background-light-500 uppercase"
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
        class="col-span-2 flex items-center space-x-3 rounded-lg bg-background-dark-400 p-3 transition-all duration-200 hover:bg-background-dark-500 border border-transparent hover:border-primary-dark"
      >
        <BaseImage
          :src="sortedRecentGames[0].iconUrl"
          :alt="sortedRecentGames[0].name"
          class="h-10 w-10 flex-shrink-0 rounded-lg shadow-sm"
          loading="lazy"
        />
        <div class="min-w-0 flex-1">
          <p
            class="truncate text-sm font-semibold text-white"
          >
            {{ sortedRecentGames[0].name }}
          </p>
          <p class="text-xs text-background-light-500">
            {{ formatPlaytime(sortedRecentGames[0].playtime2weeks) }}
            recent
          </p>
        </div>
      </div>

      <!-- Games 2-6 - smaller grid items -->
      <div
        v-for="game in sortedRecentGames.slice(1, maxDisplayedGames)"
        :key="game.id"
        class="min-w-0"
        :class="{
          'col-span-1 flex flex-col items-center space-y-2 rounded-lg bg-background-dark-400 p-3 text-center transition-all duration-200 hover:bg-background-dark-500 hover:shadow-sm border border-transparent hover:border-primary-dark':
            game !== sortedRecentGames[sortedRecentGames.length - 1] ||
            (sortedRecentGames.length % 3 === 2 &&
              game === sortedRecentGames[sortedRecentGames.length - 1]),
          'col-span-2 flex items-center space-x-3 rounded-lg bg-background-dark-400 p-3 transition-all duration-200 hover:bg-background-dark-500 border border-transparent hover:border-primary-dark':
            sortedRecentGames.length % 3 === 1 &&
            game === sortedRecentGames[sortedRecentGames.length - 1],
          'col-span-3 flex items-center space-x-3 rounded-lg bg-background-dark-400 p-3 transition-all duration-200 hover:bg-background-dark-500 border border-transparent hover:border-primary-dark':
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
            class="truncate text-sm text-white"
            :class="[game !== sortedRecentGames[sortedRecentGames.length - 1] ||
            (sortedRecentGames.length % 3 === 2 &&
              game === sortedRecentGames[sortedRecentGames.length - 1]) ? 'font-medium' : 'font-semibold']"
            :title="game.name"
          >
            {{ game.name }}
          </p>
          <p class="text-xs text-background-light-500">
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

const maxDisplayedGames = 8

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
