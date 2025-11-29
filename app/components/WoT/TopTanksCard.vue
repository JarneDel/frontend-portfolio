<template>
  <div class="lg:col-span-1 bg-background-dark-300 rounded-xl p-4 shadow-lg border border-background-dark-400 flex flex-col h-full max-h-[600px] lg:max-h-full">
    <div class="flex justify-between items-center mb-4 pb-2 border-b border-background-dark-400">
      <h3 class="text-xs font-bold text-background-light-500 uppercase tracking-wider">Top Tanks</h3>
      <!-- Dynamic label based on selection -->
      <div class="flex items-center space-x-2">
        <span class="text-[10px] bg-background-dark-500 px-2 py-0.5 rounded text-background-light-400">{{ recentData?.overall.label || 'Loading...' }}</span>
        <div
          v-if="totalPages > 1"
          class="flex items-center space-x-1 text-xs text-background-light-500"
        >
          <span>{{ currentPage + 1 }}/{{ totalPages }}</span>
        </div>
      </div>
    </div>

    <div v-if="recentData" class="flex-grow flex flex-col">
      <!-- Tanks List with Pagination -->
      <div class="flex-grow overflow-y-auto pr-1 custom-scrollbar">
        <Transition v-if="hasPaginated" name="fade" mode="out-in">
          <div :key="currentPage" :class="shouldStretch ? 'h-full flex flex-col gap-2' : 'space-y-3'">
            <div v-for="tank in paginatedTanks" :key="tank.id" 
                 :class="[
                   'group relative bg-background-dark-400 rounded-lg p-3 flex items-center gap-3 overflow-hidden hover:bg-background-dark-500 transition-all border border-transparent hover:border-primary-dark',
                   shouldStretch ? 'flex-1 min-h-0' : ''
                 ]">
              
            <div class="max-w-20 h-full w-full flex-shrink-0 bg-background-dark-500 rounded flex items-center justify-center overflow-hidden relative">
                 <img :src="tank.image" :alt="tank.name" class="w-full h-full object-contain z-10 relative" loading="lazy" />
              </div>

              <div :class="[
                'flex-grow min-w-0 z-10',
                shouldStretch ? 'flex flex-col justify-center h-full py-1' : ''
              ]">
                <div :class="shouldStretch ? 'flex justify-between items-start mb-1' : 'flex justify-between items-center'">
                  <h4 :class="shouldStretch ? 'text-sm font-bold text-white truncate group-hover:text-primary-light transition-colors leading-tight' : 'text-xs font-bold text-white truncate group-hover:text-primary-light transition-colors'">
                    {{ tank.name }}
                  </h4>
                  <span v-if="tank.isPremium" :class="shouldStretch ? 'text-[9px] font-bold text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded ml-1' : 'text-[8px] font-bold text-yellow-400 bg-yellow-400/10 px-1 rounded ml-1'">PREM</span>
                </div>
                
                <div :class="shouldStretch ? 'flex items-center gap-2 mt-auto' : 'flex items-center gap-2 mt-0.5'">
                  <span :class="shouldStretch ? 'text-[10px] text-background-light-500 px-2 py-0.5 rounded border border-background-dark-500' : 'text-[9px] text-background-light-500 px-1.5 rounded border border-background-dark-500'">
                    {{ toRoman(tank.tier) }}
                  </span>
                  <span :class="shouldStretch ? 'text-[10px] px-2 py-0.5 rounded font-bold' : 'text-[9px] px-1.5 rounded font-bold'" :style="{ color: getWn8Color(tank.wn8), backgroundColor: getWn8Color(tank.wn8) + '15' }">
                    {{ tank.wn8.toFixed(0) }}
                  </span>
                </div>
              </div>

              <div :class="shouldStretch ? 'flex flex-col items-end justify-center gap-1 min-w-[60px] h-full' : 'flex flex-col items-end gap-0 min-w-[50px]'">
                 <div :class="shouldStretch ? 'text-sm font-bold' : 'text-xs font-bold'" :style="{ color: getWrColor(tank.winRate) }">
                   {{ tank.winRate.toFixed(0) }}%
                 </div>
                 <div :class="shouldStretch ? 'text-[10px] text-background-light-500' : 'text-[9px] text-background-light-500'">
                   {{ tank.battles }} battles
                 </div>
              </div>
            </div>
          </div>
        </Transition>
        <div v-else :class="shouldStretch ? 'h-full flex flex-col gap-2' : 'space-y-3'">
          <div v-for="tank in paginatedTanks" :key="tank.id" 
               :class="[
                 'group relative bg-background-dark-400 rounded-lg p-2 flex items-center gap-3 overflow-hidden hover:bg-background-dark-500 transition-all border border-transparent hover:border-primary-dark',
                 shouldStretch ? 'flex-1 min-h-0' : ''
               ]">
            
            <div class="max-w-20 h-full w-full flex-shrink-0 bg-background-dark-500 rounded flex items-center justify-center overflow-hidden relative">
               <img :src="tank.image" :alt="tank.name" class="w-full h-full object-contain z-10 relative" loading="lazy" />
            </div>

            <div :class="[
              'flex-grow min-w-0 z-10',
              shouldStretch ? 'flex flex-col justify-center h-full py-1' : ''
            ]">
              <div class="flex justify-between items-start mb-1">
                <h4 class="text-sm font-bold text-white truncate group-hover:text-primary-light transition-colors leading-tight">
                  {{ tank.name }}
                </h4>
                <span v-if="tank.isPremium" class="text-[9px] font-bold text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded ml-1">PREM</span>
              </div>
              
              <div class="flex items-center gap-2 mt-auto">
                <span class="text-[10px] text-background-light-500 px-2 py-0.5 rounded border border-background-dark-500">
                  {{ toRoman(tank.tier) }}
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded font-bold" :style="{ color: getWn8Color(tank.wn8), backgroundColor: getWn8Color(tank.wn8) + '15' }">
                  {{ tank.wn8.toFixed(0) }}
                </span>
              </div>
            </div>

            <div class="flex flex-col items-end justify-center gap-1 min-w-[60px] h-full">
               <div class="text-sm font-bold" :style="{ color: getWrColor(tank.winRate) }">
                 {{ tank.winRate.toFixed(0) }}%
               </div>
               <div class="text-[10px] text-background-light-500">
                 {{ tank.battles }} battles
               </div>
            </div>
          </div>
        </div>
        
        <div v-if="recentData.tanks.length === 0" class="text-center text-xs text-background-light-500 py-4">
          No battles in this period.
        </div>
      </div>

      <!-- Pagination Controls -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-between border-t border-background-dark-400 pt-3 mt-3"
      >
        <button
          @click="prevPage"
          :disabled="!canGoPrev"
          class="flex items-center rounded px-2 py-1 text-xs font-medium transition-colors hover:bg-background-dark-500 disabled:cursor-not-allowed disabled:opacity-50"
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
          class="flex items-center rounded px-2 py-1 text-xs font-medium transition-colors hover:bg-background-dark-500 disabled:cursor-not-allowed disabled:opacity-50"
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
    <div v-else class="flex-grow flex items-center justify-center text-xs text-background-light-500">
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
  if (wn8 >= 900)  return '#eab308'
  return '#ef4444'
}

const toRoman = (num: number) => {
  const roman: Record<number, string> = { 10: 'X', 9: 'IX', 8: 'VIII', 7: 'VII', 6: 'VI', 5: 'V', 4: 'IV', 3: 'III', 2: 'II', 1: 'I' }
  return roman[num] || num.toString()
}

// Reset pagination when data changes
watch(() => props.recentData, () => {
  currentPage.value = 0
  hasPaginated.value = false
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-background-dark-500); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--color-background-dark-700); }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.7;
}
</style>