<script setup lang="ts">
import { getWrColor, formatNumber } from '~/utils/wot'

defineProps<{
  profile: any
}>()
</script>

<template>
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
</template>
