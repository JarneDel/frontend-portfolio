<template>
  <div
    v-if="mostPlayedGames.length > 0"
    class="group col-span-2 row-span-2 rounded-xl bg-gray-50 p-4 transition-colors duration-200 dark:bg-gray-800"
    style="grid-column: span 2; grid-row: span 2"
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
      <Transition v-if="hasPaginated" name="fade" mode="out-in">
        <div :key="currentPage" class="grid grid-cols-2 gap-2 sm:grid-cols-2">
          <div
            v-for="game in paginatedGames"
            :key="game.id"
            class="dark:bg-gray-750 flex flex-col items-center rounded-lg bg-gray-100 p-2 text-center transition-colors duration-200 hover:bg-gray-50 hover:shadow-sm dark:hover:bg-gray-700"
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
      <div v-else class="grid grid-cols-2 gap-2 sm:grid-cols-2">
        <div
          v-for="game in paginatedGames"
          :key="game.id"
          class="dark:bg-gray-750 flex flex-col items-center rounded-lg bg-gray-100 p-2 text-center transition-all transition-colors duration-200 hover:bg-gray-50 hover:shadow-sm dark:hover:bg-gray-700"
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
          @click="goToPage(page - 1)"
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
