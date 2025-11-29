<template>
  <div
    v-if="mostPlayedGames.length > 0"
    class="group col-span-2 row-span-2 rounded-xl bg-background-dark-300 p-4 transition-colors duration-200 border border-background-dark-400 shadow-lg"
    style="grid-column: span 2; grid-row: span 2"
  >
    <div class="mb-3 flex items-center justify-between">
      <h3
        class="text-sm font-semibold tracking-wide text-background-light-500 uppercase"
      >
        Most Played
      </h3>
      <div
        class="flex items-center space-x-1 text-xs text-background-light-500"
      >
        <span>{{ currentPage + 1 }}/{{ totalPages }}</span>
      </div>
    </div>

    <div class="mb-3">
      <Transition v-if="hasPaginated" name="fade" mode="out-in">
        <div :key="currentPage" class="grid grid-cols-2 gap-2 sm:grid-cols-2">
          <div
            v-for="game in paginatedGames"
            :key="game.id"
            class="flex flex-col items-center rounded-lg bg-background-dark-400 p-2 text-center transition-colors duration-200 hover:bg-background-dark-500 hover:shadow-sm border border-transparent hover:border-primary-dark"
          >
            <BaseImage
              :src="game.iconUrl"
              :alt="game.name"
              class="mb-1 h-8 w-8 flex-shrink-0 rounded"
              loading="lazy"
            />
            <p class="w-full truncate text-xs font-medium text-white">
              {{ game.name }}
            </p>
            <p class="text-xs text-background-light-500">
              {{ formatPlaytime(game.playtimeForever) }}
            </p>
          </div>
        </div>
      </Transition>
      <div v-else class="grid grid-cols-2 gap-2 sm:grid-cols-2">
        <div
          v-for="game in paginatedGames"
          :key="game.id"
          class="flex flex-col items-center rounded-lg bg-background-dark-400 p-2 text-center transition-colors duration-200 hover:bg-background-dark-500 hover:shadow-sm border border-transparent hover:border-primary-dark"
        >
          <BaseImage
            :src="game.iconUrl"
            :alt="game.name"
            class="mb-1 h-8 w-8 flex-shrink-0 rounded"
            loading="lazy"
          />
          <p class="w-full truncate text-xs font-medium text-white">
            {{ game.name }}
          </p>
          <p class="text-xs text-background-light-500">
            {{ formatPlaytime(game.playtimeForever) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div
      v-if="totalPages > 1"
      class="flex items-center justify-between border-t border-background-dark-400 pt-2"
    >
      <button
        @click="prevPage"
        :disabled="!canGoPrev"
        class="flex items-center rounded px-2 py-1 text-xs font-medium transition-colors hover:bg-background-dark-400 disabled:cursor-not-allowed disabled:opacity-50"
        :class="
          canGoPrev
            ? 'text-white'
            : 'text-background-light-500'
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
          @click="goToPage(page - 1)"
          class="h-6 w-6 rounded text-xs transition-colors"
          :class="
            currentPage === page - 1
              ? 'bg-primary-dark text-white'
              : 'text-background-light-500 hover:bg-background-dark-400'
          "
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="nextPage"
        :disabled="!canGoNext"
        class="flex items-center rounded px-2 py-1 text-xs font-medium transition-colors hover:bg-background-dark-400 disabled:cursor-not-allowed disabled:opacity-50"
        :class="
          canGoNext
            ? 'text-white'
            : 'text-background-light-500'
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
</template>

<script setup lang="ts">
import BaseImage from '../Styled/baseImage.vue'

interface MostPlayedGame {
  id: string
  name: string
  iconUrl: string
  playtimeForever: number
}

interface Props {
  mostPlayedGames: MostPlayedGame[]
  recentCount: number
}

const props = defineProps<Props>()

// Pagination setup
const currentPage = ref(0)
const gamesPerPage = props.recentCount > 5 ? 12 : 8
const hasPaginated = ref(false)

// Pre-calculate first page on server, use reactive pagination for subsequent pages
const paginatedGames = computed(() => {
  if (!props.mostPlayedGames) return []

  // For SSR and first page, always show first 6 games
  if (import.meta.server || currentPage.value === 0) {
    return props.mostPlayedGames.slice(0, gamesPerPage)
  }

  // For client-side pagination on subsequent pages
  const startIndex = currentPage.value * gamesPerPage
  return props.mostPlayedGames.slice(startIndex, startIndex + gamesPerPage)
})

const totalPages = computed(() => {
  if (!props.mostPlayedGames) return 0

  // floor because we want to show full pages only
  return Math.floor(props.mostPlayedGames.length / gamesPerPage)
})

const canGoNext = computed(() => currentPage.value < totalPages.value - 1)
const canGoPrev = computed(() => currentPage.value > 0)

function nextPage() {
  if (canGoNext.value) {
    hasPaginated.value = true
    currentPage.value++
  }
}

function prevPage() {
  if (canGoPrev.value) {
    hasPaginated.value = true
    currentPage.value--
  }
}

function goToPage(page: number) {
  if (page !== currentPage.value) {
    hasPaginated.value = true
    currentPage.value = page
  }
}

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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.7;
}
</style>
