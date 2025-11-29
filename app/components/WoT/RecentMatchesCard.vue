<script setup lang="ts">
import { getWrColor, getWn8Color, toRoman, formatNumber } from '~/utils/wot'
import { useTimeAgo } from '@vueuse/core'

const { data: matches } = await useAsyncData('wot-matches', () => $fetch('/api/wargaming/wot-matches'))

const formatTime = (dateStr: string) => {
  return useTimeAgo(new Date(dateStr)).value
}

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const getMoEColor = (diff: number) => {
  return diff >= 0 ? 'text-green-400' : 'text-red-400'
}
</script>

<template>
  <div class="bg-background-dark-300 rounded-xl p-4 shadow-lg border border-background-dark-400 h-full max-h-[800px] flex flex-col">
    <div class="flex justify-between items-center border-b border-background-dark-400 pb-2 mb-2">
      <h3 class="text-xs font-bold text-background-light-500 uppercase tracking-wider">Recent Matches</h3>
      <div class="text-[10px] bg-background-dark-500 px-2 py-0.5 rounded text-background-light-400">Last 20</div>
    </div>

    <div class="overflow-y-auto custom-scrollbar flex-grow pr-1 space-y-2">
      <div 
        v-for="(match, index) in matches" 
        :key="index"
        class="bg-background-dark-400 rounded-lg p-2 flex items-center gap-3 hover:bg-background-dark-500 transition-colors border-l-4 overflow-hidden"
        :class="match.result === 'win' ? 'border-l-green-500' : 'border-l-red-500'"
      >
        <!-- Tank Image with Map Background -->
        <div class="relative w-24 h-14 flex-shrink-0 bg-background-dark-500 rounded overflow-hidden flex items-center justify-center border border-background-dark-300 group" :title="match.map">
          <!-- Map Background -->
          <img :src="match.mapImage" :alt="match.map" class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" loading="lazy" />
          
          <!-- Tank Image -->
          <img :src="match.tankImage" :alt="match.tankName" class="relative z-10 w-full h-full object-contain drop-shadow-lg scale-110" loading="lazy" />
          
          <!-- Tier -->
          <div class="absolute bottom-0 right-0 z-20 bg-black/80 text-[10px] px-1.5 py-0.5 text-white font-bold rounded-tl backdrop-blur-sm">
            {{ toRoman(match.tier) }}
          </div>
          
          <!-- Premium Badge -->
          <div v-if="match.isPremium" class="absolute top-0 left-0 z-20 bg-yellow-500/20 text-yellow-400 text-[8px] px-1 font-bold rounded-br backdrop-blur-sm">PREM</div>
        </div>

        <!-- Tank & Map Info -->
        <div class="flex flex-col w-28 flex-shrink-0">
          <div class="text-white font-bold text-sm truncate" :title="match.tankName">{{ match.tankName }}</div>
          <div class="text-xs text-background-light-400 truncate">{{ match.map }}</div>
        </div>

        <!-- Result & Duration -->
        <div class="flex flex-col items-center w-16 flex-shrink-0">
          <span :class="match.result === 'win' ? 'text-green-400' : 'text-red-400'" class="uppercase font-bold text-xs">{{ match.result }}</span>
          <span class="text-xs text-background-light-500">{{ formatDuration(match.duration) }}</span>
        </div>

        <!-- Primary Stats (Dmg, Assist, Blocked) -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <div class="flex flex-col items-center w-12">
            <span class="text-[10px] text-background-light-500 uppercase">Dmg</span>
            <span class="text-white font-bold text-sm font-mono">{{ formatNumber(match.damage) }}</span>
          </div>
          <div class="flex flex-col items-center w-10">
            <span class="text-[10px] text-background-light-500 uppercase">Ast</span>
            <span class="text-white font-bold text-sm font-mono">{{ formatNumber(match.assist) }}</span>
          </div>
          <div class="flex flex-col items-center w-10">
            <span class="text-[10px] text-background-light-500 uppercase">Blk</span>
            <span class="text-white font-bold text-sm font-mono">{{ formatNumber(match.blocked) }}</span>
          </div>
        </div>

        <!-- WN8 -->
        <div class="flex flex-col items-center w-10 flex-shrink-0">
          <span class="text-[10px] text-background-light-500 uppercase">WN8</span>
          <span class="font-bold text-sm font-mono" :style="{ color: getWn8Color(match.wn8) }">{{ match.wn8 }}</span>
        </div>

        <!-- Secondary Stats (XP, Credits, Kills) -->
        <div class="flex items-center gap-3 flex-shrink-0 border-l border-background-dark-300 pl-3">
          <div class="flex flex-col items-center w-8" title="Base XP">
            <span class="text-[10px] text-background-light-500">XP</span>
            <span class="text-white font-bold text-xs">{{ formatNumber(match.xp) }}</span>
          </div>
          <div class="flex flex-col items-center w-12" title="Net Credits">
            <span class="text-[10px] text-background-light-500">Creds</span>
            <span class="font-bold text-xs" :class="match.credits >= 0 ? 'text-gray-200' : 'text-red-400'">{{ formatNumber(match.credits) }}</span>
          </div>
          <div class="flex flex-col items-center w-6" title="Frags">
            <span class="text-[10px] text-background-light-500">Kills</span>
            <span class="text-white font-bold text-xs">{{ match.frags }}</span>
          </div>
        </div>

        <!-- Tertiary Stats (Spots, Shots, MoE) - Hidden on smaller screens if needed, but showing here -->
        <div class="items-center gap-3 flex-shrink-0 border-l border-background-dark-300 pl-3 hidden xl:flex">
           <div class="flex flex-col items-center w-6" title="Spots">
            <span class="text-[10px] text-background-light-500">Spot</span>
            <span class="text-white font-bold text-xs">{{ match.spots }}</span>
          </div>
           <div class="flex flex-col items-center w-10" title="Penetrations / Shots">
            <span class="text-[10px] text-background-light-500">Hits</span>
            <span class="text-white font-bold text-xs">{{ match.penetrations }}/{{ match.shots }}</span>
          </div>
           <div class="flex flex-col items-center w-12" title="Mark of Excellence">
            <span class="text-[10px] text-background-light-500">MoE</span>
            <div class="flex items-center gap-0.5">
              <span class="text-white font-bold text-xs">{{ match.moe.toFixed(1) }}%</span>
              <span v-if="match.moeDiff !== 0" class="text-[10px]" :class="getMoEColor(match.moeDiff)">
                {{ match.moeDiff > 0 ? '↑' : '↓' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Time Ago -->
        <div class="ml-auto text-xs text-background-light-500 whitespace-nowrap pl-2">
          {{ formatTime(match.date) }}
        </div>
      </div>
      
      <div v-if="!matches || matches.length === 0" class="text-center py-8 text-background-light-500 text-xs">
        No recent matches found.
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-background-dark-500); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--color-background-dark-700); }
</style>
