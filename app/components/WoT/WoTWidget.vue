<script setup lang="ts">
import TopTanksCard from './TopTanksCard.vue'

// --- State for Filter ---
const selectedFilter = ref('100') // Default

// Options for the dropdown
const filterOptions = [
  { label: '10 Battles', value: '10' },
  { label: '50 Battles', value: '50' },
  { label: '100 Battles', value: '100' },
  { label: '500 Battles', value: '500' },
  { label: '1000 Battles', value: '1000' },
  { label: '24 Hours', value: '1d' },
  { label: '30 Days', value: '30d' },
  { label: '60 Days', value: '60d' }, // Tomato api usually caps at 60
]

// 1. Fetch Official Profile (Static)
const { data: profile } = await useAsyncData('wot-profile', () => $fetch('/api/wargaming/wot-account'))

// 2. Fetch Recent Stats (Dynamic based on selectedFilter)
const { data: recent, status, refresh } = await useAsyncData(
  'wot-recent',
  () => $fetch('/api/wargaming/wot-recent', {
    query: { filter: selectedFilter.value }
  }),
  {
    watch: [selectedFilter] // Automatically refetch when filter changes
  }
)

const { data: graphData } = await useAsyncData('wot-graph', () => $fetch('/api/wargaming/wot-graph'))

// --- Helpers ---
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

const formatNumber = (num: number) => {
  return num.toLocaleString()
}
</script>

<template>
  <div v-if="profile" class="w-full mx-auto font-sans text-background-light-200">
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      
      <!-- LEFT COLUMN -->
      <div class="lg:col-span-2 flex flex-col gap-4">
        
        <!-- HEADER ROW (Combined Profile & Recent) -->
        <div class="bg-background-dark-300 rounded-xl p-6 shadow-lg border border-background-dark-400">
          <div class="flex flex-col md:flex-row gap-6">
            
            <!-- Profile Section -->
            <div class="flex md:flex-col items-center md:justify-center gap-4 md:w-48 md:border-r border-background-dark-400 md:pr-6 pb-4 md:pb-0 border-b md:border-b-0 shrink-0">
              <div class="relative">
                <div class="w-20 h-20 rounded-full bg-background-dark-500 flex items-center justify-center overflow-hidden border-2 border-primary-dark shadow-md">
                  <svg class="w-10 h-10 text-primary-dark" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <span class="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-background-dark-300 rounded-full"></span>
              </div>
              <div class="text-center">
                <h2 class="text-2xl font-bold text-white leading-tight mb-1">{{ profile.nickname }}</h2>
                <div class="text-xs font-medium text-background-light-500 uppercase tracking-wide bg-background-dark-500 px-3 py-1 rounded-full inline-block">
                  WTR: <span class="text-primary-dark font-bold">{{ profile.rating }}</span>
                </div>
              </div>
            </div>

            <!-- Recent Stats Section -->
            <div class="flex-1 flex flex-col">
              
              <!-- Header with Dropdown -->
              <div class="flex justify-between items-center mb-6">
                <div class="flex flex-col">
                  <div class="text-sm font-bold text-background-light-500 uppercase tracking-wider">Recent Performance</div>
                  <div v-if="status === 'pending'" class="text-[10px] text-primary-dark animate-pulse">Updating...</div>
                  <div v-else class="text-[10px] text-background-light-500">{{ recent?.overall.label }}</div>
                </div>

                <div class="relative">
                  <select 
                    v-model="selectedFilter" 
                    class="appearance-none bg-background-dark-500 text-xs text-white pl-3 pr-8 py-1.5 rounded-md border border-background-dark-400 hover:border-primary-dark focus:outline-none focus:ring-1 focus:ring-primary-dark cursor-pointer transition-colors"
                  >
                    <option v-for="opt in filterOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                  </select>
                  <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-background-light-500">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              
              <!-- Stats Grid -->
              <div v-if="recent" class="grid grid-cols-4 gap-y-6 gap-x-2 text-center">
                <!-- Row 1 -->
                <div>
                  <div class="text-[10px] text-background-light-500 mb-1 uppercase tracking-wide font-semibold">WN8</div>
                  <div class="font-bold text-2xl transition-all duration-300" :style="{ color: getWn8Color(recent.overall.wn8) }">
                    {{ recent.overall.wn8.toFixed(0) }}
                  </div>
                </div>
                <div>
                  <div class="text-[10px] text-background-light-500 mb-1 uppercase tracking-wide font-semibold">Win Rate</div>
                  <div class="font-bold text-2xl transition-all duration-300" :style="{ color: getWrColor(recent.overall.winRate) }">
                    {{ recent.overall.winRate.toFixed(1) }}%
                  </div>
                </div>
                <div>
                  <div class="text-[10px] text-background-light-500 mb-1 uppercase tracking-wide font-semibold">Battles</div>
                  <div class="font-bold text-2xl text-white transition-all duration-300">
                    {{ recent.overall.battles }}
                  </div>
                </div>
                <div>
                  <div class="text-[10px] text-background-light-500 mb-1 uppercase tracking-wide font-semibold">DPG</div>
                  <div class="font-bold text-2xl text-white transition-all duration-300">
                    {{ recent.overall.avgDamage.toLocaleString() }}
                  </div>
                </div>

                <!-- Row 2 -->
                <div>
                  <div class="text-[10px] text-background-light-500 mb-1 uppercase tracking-wide font-semibold">K/D</div>
                  <div class="font-bold text-xl text-white transition-all duration-300">
                    {{ recent.overall.kd.toFixed(2) }}
                  </div>
                </div>
                <div>
                  <div class="text-[10px] text-background-light-500 mb-1 uppercase tracking-wide font-semibold">Dmg Ratio</div>
                  <div class="font-bold text-xl text-white transition-all duration-300">
                    {{ recent.overall.damageRatio.toFixed(2) }}
                  </div>
                </div>
                <div>
                  <div class="text-[10px] text-background-light-500 mb-1 uppercase tracking-wide font-semibold">Frags</div>
                  <div class="font-bold text-xl text-white transition-all duration-300">
                    {{ recent.overall.avgFrags.toFixed(1) }}
                  </div>
                </div>
                <div>
                  <div class="text-[10px] text-background-light-500 mb-1 uppercase tracking-wide font-semibold">Survival</div>
                  <div class="font-bold text-xl text-white transition-all duration-300">
                    {{ recent.overall.survived.toFixed(1) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="graphData && graphData.length > 0" class="bg-background-dark-300 rounded-xl p-4 shadow-lg border border-background-dark-400 h-64">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-xs font-bold text-background-light-500 uppercase tracking-wider">WN8 Evolution</h3>
            <span class="text-[10px] text-background-light-500">Last 30 Sessions</span>
          </div>
          <div class="h-[calc(100%-1.5rem)]">
            <WotWn8Chart :data="graphData" />
          </div>
        </div>

        <!-- MAIN STATS GRID (Lifetime/Profile Data from Wargaming) -->
        <div class="bg-background-dark-300 rounded-xl p-4 flex flex-col gap-4 shadow-lg border border-background-dark-400 flex-grow">
          <div class="flex justify-between items-center border-b border-background-dark-400 pb-2">
            <div class="text-xs font-bold text-background-light-500 uppercase tracking-wider">Lifetime Statistics</div>
            <div class="text-[10px] bg-background-dark-500 px-2 py-0.5 rounded text-background-light-400">All Time</div>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 h-full">
            <div class="bg-background-dark-400 rounded-lg p-3 flex flex-col justify-between hover:bg-background-dark-500 transition-colors group">
              <div class="w-8 h-8 rounded bg-background-dark-500 group-hover:bg-background-dark-400 flex items-center justify-center text-xl mb-2">⚔️</div>
              <div>
                <div class="text-white font-bold text-lg">{{ formatNumber(profile.stats.battles) }}</div>
                <div class="text-xs text-background-light-500">Total Battles</div>
              </div>
            </div>
            <div class="bg-background-dark-400 rounded-lg p-3 flex flex-col justify-between hover:bg-background-dark-500 transition-colors group">
              <div class="w-8 h-8 rounded bg-background-dark-500 group-hover:bg-background-dark-400 flex items-center justify-center text-xl mb-2">🏆</div>
              <div>
                <div class="text-white font-bold text-lg" :style="{ color: getWrColor(parseFloat(profile.stats.winRate)) }">{{ profile.stats.winRate }}%</div>
                <div class="text-xs text-background-light-500">Win Rate</div>
              </div>
            </div>
            <div class="bg-background-dark-400 rounded-lg p-3 flex flex-col justify-between hover:bg-background-dark-500 transition-colors group">
              <div class="w-8 h-8 rounded bg-background-dark-500 group-hover:bg-background-dark-400 flex items-center justify-center text-xl mb-2">💥</div>
              <div>
                <div class="text-white font-bold text-lg">{{ formatNumber(profile.stats.avgDamage) }}</div>
                <div class="text-xs text-background-light-500">Avg Damage</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN (Recent Tanks List) -->
      <TopTanksCard :recent-data="recent" />

    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-background-dark-500); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--color-background-dark-700); }
</style>