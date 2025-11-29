<script setup lang="ts">
import { getWrColor, getWn8Color } from '~/utils/wot'

defineProps<{
  profile: any
  recent: any
  status: string
  filterOptions: { label: string, value: string }[]
}>()

const selectedFilter = defineModel<string>('filter')
</script>

<template>
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
            <div class="text-[10px] text-background-light-500 mb-1 uppercase tracking-wide font-semibold">WNX</div>
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
</template>
