<template>
  <div
    class="bg-background-dark-300 border-background-dark-400 flex h-full max-h-[600px] flex-col rounded-xl border p-4 shadow-lg lg:col-span-1 lg:max-h-full"
  >
    <div
      class="border-background-dark-400 mb-4 flex items-center justify-between border-b pb-2"
    >
      <h3
        class="text-background-light-500 text-xs font-bold tracking-wider uppercase"
      >
        Top Tanks
      </h3>
      <!-- Dynamic label based on selection -->
      <div class="flex items-center space-x-2">
        <span
          class="bg-background-dark-500 text-background-light-400 rounded px-2 py-0.5 text-[10px]"
          >{{ recentData?.overall.label || 'Loading...' }}</span
        >
        <div
          v-if="totalPages > 1"
          class="text-background-light-500 flex items-center space-x-1 text-xs"
        >
          <span>{{ currentPage + 1 }}/{{ totalPages }}</span>
        </div>
      </div>
    </div>

    <div v-if="recentData" class="flex flex-grow flex-col">
      <!-- Tanks List with Pagination -->
      <div class="custom-scrollbar flex-grow overflow-y-auto pr-1">
        <Transition v-if="hasPaginated" name="fade" mode="out-in">
          <div
            :key="currentPage"
            :class="shouldStretch ? 'flex h-full flex-col gap-2' : 'space-y-3'"
          >
            <div
              v-for="tank in paginatedTanks"
              :key="tank.id"
              :class="[
                'group bg-background-dark-400 hover:bg-background-dark-500 hover:border-primary-dark relative flex items-center gap-3 overflow-hidden rounded-lg border border-transparent p-3 transition-all',
                shouldStretch ? 'min-h-0 flex-1' : '',
              ]"
            >
              <div
                class="bg-background-dark-500 relative flex h-full w-full max-w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded"
              >
                <img
                  :src="tank.image"
                  :alt="tank.name"
                  class="relative z-10 h-full w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div
                :class="[
                  'z-10 min-w-0 flex-grow',
                  shouldStretch
                    ? 'flex h-full flex-col justify-center py-1'
                    : '',
                ]"
              >
                <div
                  :class="
                    shouldStretch
                      ? 'mb-1 flex items-start justify-between'
                      : 'flex items-center justify-between'
                  "
                >
                  <h4
                    :class="
                      shouldStretch
                        ? 'group-hover:text-primary-light truncate text-sm leading-tight font-bold text-white transition-colors'
                        : 'group-hover:text-primary-light truncate text-xs font-bold text-white transition-colors'
                    "
                  >
                    {{ tank.name }}
                  </h4>
                  <span
                    v-if="tank.isPremium"
                    :class="
                      shouldStretch
                        ? 'ml-1 rounded bg-yellow-400/10 px-1.5 py-0.5 text-[9px] font-bold text-yellow-400'
                        : 'ml-1 rounded bg-yellow-400/10 px-1 text-[8px] font-bold text-yellow-400'
                    "
                    >PREM</span
                  >
                </div>

                <div
                  :class="
                    shouldStretch
                      ? 'flex items-center gap-2'
                      : 'mt-0.5 flex items-center gap-2'
                  "
                >
                  <span
                    :class="
                      shouldStretch
                        ? 'text-background-light-500 border-background-dark-500 rounded border px-2 py-0.5 text-[10px]'
                        : 'text-background-light-500 border-background-dark-500 rounded border px-1.5 text-[9px]'
                    "
                  >
                    {{ toRoman(tank.tier) }}
                  </span>
                  <span
                    :class="
                      shouldStretch
                        ? 'rounded px-2 py-0.5 text-[10px] font-bold'
                        : 'rounded px-1.5 text-[9px] font-bold'
                    "
                    :style="{
                      color: getWn8Color(tank.wn8),
                      backgroundColor: getWn8Color(tank.wn8) + '15',
                    }"
                  >
                    {{ tank.wn8.toFixed(0) }}
                  </span>
                </div>
              </div>

              <div
                :class="
                  shouldStretch
                    ? 'flex h-full min-w-[60px] flex-col items-end justify-center gap-1'
                    : 'flex min-w-[50px] flex-col items-end gap-0'
                "
              >
                <div
                  :class="
                    shouldStretch ? 'text-sm font-bold' : 'text-xs font-bold'
                  "
                  :style="{ color: getWrColor(tank.winRate) }"
                >
                  {{ tank.winRate.toFixed(0) }}%
                </div>
                <div
                  :class="
                    shouldStretch
                      ? 'text-background-light-500 text-[10px]'
                      : 'text-background-light-500 text-[9px]'
                  "
                >
                  {{ tank.battles }} battles
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <div
          v-else
          :class="shouldStretch ? 'flex h-full flex-col gap-2' : 'space-y-3'"
        >
          <div
            v-for="tank in paginatedTanks"
            :key="tank.id"
            :class="[
              'group bg-background-dark-400 hover:bg-background-dark-500 hover:border-primary-dark relative flex items-center gap-3 overflow-hidden rounded-lg border border-transparent p-2 transition-all',
              shouldStretch ? 'min-h-0 flex-1' : '',
            ]"
          >
            <div
              class="bg-background-dark-500 relative flex h-full w-full max-w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded"
            >
              <img
                :src="tank.image"
                :alt="tank.name"
                class="relative z-10 h-full w-full object-contain"
                loading="lazy"
              />
            </div>

            <div
              :class="[
                'z-10 min-w-0 flex-grow',
                shouldStretch ? 'flex h-full flex-col justify-center py-1' : '',
              ]"
            >
              <div class="mb-1 flex items-start justify-between">
                <h4
                  class="group-hover:text-primary-light truncate text-sm leading-tight font-bold text-white transition-colors"
                >
                  {{ tank.name }}
                </h4>
                <span
                  v-if="tank.isPremium"
                  class="ml-1 rounded bg-yellow-400/10 px-1.5 py-0.5 text-[9px] font-bold text-yellow-400"
                  >PREM</span
                >
              </div>

              <div class="flex items-center gap-2">
                <span
                  class="text-background-light-500 border-background-dark-500 rounded border px-2 py-0.5 text-[10px]"
                >
                  {{ toRoman(tank.tier) }}
                </span>
                <span
                  class="rounded px-2 py-0.5 text-[10px] font-bold"
                  :style="{
                    color: getWn8Color(tank.wn8),
                    backgroundColor: getWn8Color(tank.wn8) + '15',
                  }"
                >
                  {{ tank.wn8.toFixed(0) }}
                </span>
              </div>
            </div>

            <div
              class="flex h-full min-w-[60px] flex-col items-end justify-center gap-1"
            >
              <div
                class="text-sm font-bold"
                :style="{ color: getWrColor(tank.winRate) }"
              >
                {{ tank.winRate.toFixed(0) }}%
              </div>
              <div class="text-background-light-500 text-[10px]">
                {{ tank.battles }} battles
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="recentData.tanks.length === 0"
          class="text-background-light-500 py-4 text-center text-xs"
        >
          No battles in this period.
        </div>
      </div>

      <!-- Pagination Controls -->
      <div
        v-if="totalPages > 1"
        class="border-background-dark-400 mt-3 flex items-center justify-between border-t pt-3"
      >
        <button
          @click="prevPage"
          :disabled="!canGoPrev"
          class="hover:bg-background-dark-500 flex items-center rounded px-2 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          :class="
            canGoPrev
              ? 'text-background-light-300'
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
                : 'text-background-light-400 hover:bg-background-dark-500'
            "
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="nextPage"
          :disabled="!canGoNext"
          class="hover:bg-background-dark-500 flex items-center rounded px-2 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          :class="
            canGoNext
              ? 'text-background-light-300'
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

    <!-- Loading State for list -->
    <div
      v-else
      class="text-background-light-500 flex flex-grow items-center justify-center text-xs"
    >
      Loading tank data...
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tank {
  id: number
  name: string
  tier: number
  image: string
  battles: number
  winRate: number
  wn8: number
  dpg: number
  isPremium: boolean
}

interface RecentStats {
  overall: {
    battles: number
    winRate: number
    wn8: number
    avgDamage: number
    survived: number
    label: string
  }
  tanks: Tank[]
}

interface Props {
  recentData: RecentStats | null | undefined
}

const props = defineProps<Props>()

// Pagination setup
const currentPage = ref(0)
const tanksPerPage = 7
const hasPaginated = ref(false)

// Computed properties for pagination
const paginatedTanks = computed(() => {
  if (!props.recentData?.tanks) return []

  // For SSR and first page, always show first tanks
  if (import.meta.server || currentPage.value === 0) {
    return props.recentData.tanks.slice(0, tanksPerPage)
  }

  // For client-side pagination on subsequent pages
  const startIndex = currentPage.value * tanksPerPage
  return props.recentData.tanks.slice(startIndex, startIndex + tanksPerPage)
})

const totalPages = computed(() => {
  if (!props.recentData?.tanks) return 0
  return Math.ceil(props.recentData.tanks.length / tanksPerPage)
})

const canGoNext = computed(() => currentPage.value < totalPages.value - 1)
const canGoPrev = computed(() => currentPage.value > 0)

// Only stretch cards if there are 5 or more items on current page
const shouldStretch = computed(() => paginatedTanks.value.length >= 5)

// Pagination functions
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

// Helper functions (copied from WoTWidget)
const getWrColor = (wr: number) => {
  if (wr >= 60) return '#a855f7'
  if (wr >= 54) return '#2dd4bf'
  if (wr >= 49) return '#22c55e'
  if (wr >= 46) return '#eab308'
  return '#ef4444'
}

const getWn8Color = (wn8: number) => {
  if (wn8 >= 2900) return '#a855f7'
  if (wn8 >= 2000) return '#2dd4bf'
  if (wn8 >= 1600) return '#22c55e'
  if (wn8 >= 900) return '#eab308'
  return '#ef4444'
}

const toRoman = (num: number) => {
  const roman: Record<number, string> = {
    10: 'X',
    9: 'IX',
    8: 'VIII',
    7: 'VII',
    6: 'VI',
    5: 'V',
    4: 'IV',
    3: 'III',
    2: 'II',
    1: 'I',
  }
  return roman[num] || num.toString()
}

// Reset pagination when data changes
watch(
  () => props.recentData,
  () => {
    currentPage.value = 0
    hasPaginated.value = false
  },
)
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-background-dark-500);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-background-dark-700);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.7;
}
</style>
