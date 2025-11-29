<script setup lang="ts">
import TopTanksCard from './TopTanksCard.vue'
import ProfileCard from './ProfileCard.vue'
import EvolutionCard from './EvolutionCard.vue'
import LifetimeStatsCard from './LifetimeStatsCard.vue'
import RecentMatchesCard from './RecentMatchesCard.vue'

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
</script>

<template>
  <div v-if="profile" class="w-full mx-auto font-sans text-background-light-200">
    
    <div class="flex flex-col gap-4">
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <!-- LEFT COLUMN -->
        <div class="lg:col-span-2 flex flex-col gap-4">
          
          <!-- HEADER ROW (Combined Profile & Recent) -->
          <ProfileCard 
            :profile="profile" 
            :recent="recent" 
            :status="status" 
            :filter-options="filterOptions"
            v-model:filter="selectedFilter"
          />
        
          <!-- MAIN STATS GRID (Lifetime/Profile Data from Wargaming) -->
          <LifetimeStatsCard :profile="profile" />
          <EvolutionCard :graph-data="graphData" />

        </div>

        <!-- RIGHT COLUMN (Recent Tanks List) -->
        <TopTanksCard :recent-data="recent" />

      </div>

      <!-- BOTTOM ROW (Recent Matches) -->
      <RecentMatchesCard />
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-background-dark-500); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--color-background-dark-700); }
</style>