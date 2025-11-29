<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'

const { data: matches, status } = await useLazyAsyncData(
  'wot-matches',
  () => $fetch('/api/wargaming/wot-matches'),
  {
    server: false,
  },
)

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
  <div
    class="bg-background-dark-300 border-background-dark-400 flex h-full max-h-[800px] flex-col rounded-xl border p-4 shadow-lg"
  >
    <div
      class="border-background-dark-400 mb-2 flex items-center justify-between border-b pb-2"
    >
      <h3
        class="text-background-light-500 text-xs font-bold tracking-wider uppercase"
      >
        Recent Matches
      </h3>
      <div
        class="bg-background-dark-500 text-background-light-400 rounded px-2 py-0.5 text-[10px]"
      >
        Last 20
      </div>
    </div>

    <div class="custom-scrollbar flex-grow space-y-2 overflow-y-auto pr-1">
      <!-- === LOADING SKELETON === -->
      <!-- This shows while the API is taking 600ms -->
      <template v-if="status != 'success'">
        <div
          v-for="n in 10"
          :key="n"
          class="bg-background-dark-400/50 border-background-dark-500 flex animate-pulse items-center gap-3 rounded-lg border-l-4 p-2"
        >
          <div
            class="bg-background-dark-500 h-14 w-24 flex-shrink-0 rounded"
          ></div>
          <div class="flex w-28 flex-col gap-2">
            <div class="bg-background-dark-500 h-3 w-3/4 rounded"></div>
            <div class="bg-background-dark-500 h-2 w-1/2 rounded"></div>
          </div>
          <div class="bg-background-dark-500 ml-auto h-8 w-16 rounded"></div>
        </div>
      </template>

      <!-- === ERROR STATE === -->
      <div
        v-else-if="status === 'error'"
        class="py-8 text-center text-xs text-red-400"
      >
        Unable to load matches.
      </div>

      <!-- === DATA STATE === -->
      <template v-else>
        <!-- Your original list logic goes here -->
        <div
          v-for="(match, index) in matches"
          :key="index"
          class="bg-background-dark-400 hover:bg-background-dark-500 flex items-center gap-3 overflow-hidden rounded-lg border-l-4 p-2 transition-colors"
          :class="
            match.result === 'win' ? 'border-l-green-500' : 'border-l-red-500'
          "
        >
          <!-- Tank Image with Map Background -->
          <div
            class="bg-background-dark-500 border-background-dark-300 group relative flex h-14 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded border"
            :title="match.map"
          >
            <!-- Map Background -->
            <img
              :src="match.mapImage"
              :alt="match.map"
              class="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity group-hover:opacity-60"
              loading="lazy"
            />

            <!-- Tank Image -->
            <img
              :src="match.tankImage"
              :alt="match.tankName"
              class="relative z-10 h-full w-full scale-110 object-contain drop-shadow-lg"
              loading="lazy"
            />

            <!-- Tier -->
            <div
              class="absolute right-0 bottom-0 z-20 rounded-tl bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm"
            >
              {{ toRoman(match.tier) }}
            </div>

            <!-- Premium Badge -->
            <div
              v-if="match.isPremium"
              class="absolute top-0 left-0 z-20 rounded-br bg-yellow-500/20 px-1 text-[8px] font-bold text-yellow-400 backdrop-blur-sm"
            >
              PREM
            </div>
          </div>

          <!-- Tank & Map Info -->
          <div class="flex w-28 flex-shrink-0 flex-col">
            <div
              class="truncate text-sm font-bold text-white"
              :title="match.tankName"
            >
              {{ match.tankName }}
            </div>
            <div class="text-background-light-400 truncate text-xs">
              {{ match.map }}
            </div>
          </div>

          <!-- Result & Duration -->
          <div class="flex w-16 flex-shrink-0 flex-col items-center">
            <span
              :class="
                match.result === 'win' ? 'text-green-400' : 'text-red-400'
              "
              class="text-xs font-bold uppercase"
              >{{ match.result }}</span
            >
            <span class="text-background-light-500 text-xs">{{
              formatDuration(match.duration)
            }}</span>
          </div>

          <!-- Primary Stats (Dmg, Assist, Blocked) -->
          <div class="flex flex-shrink-0 items-center gap-3">
            <div class="flex w-12 flex-col items-center">
              <span class="text-background-light-500 text-[10px] uppercase"
                >Dmg</span
              >
              <span class="font-mono text-sm font-bold text-white">{{
                formatNumber(match.damage)
              }}</span>
            </div>
            <div class="flex w-10 flex-col items-center">
              <span class="text-background-light-500 text-[10px] uppercase"
                >Ast</span
              >
              <span class="font-mono text-sm font-bold text-white">{{
                formatNumber(match.assist)
              }}</span>
            </div>
            <div class="flex w-10 flex-col items-center">
              <span class="text-background-light-500 text-[10px] uppercase"
                >Blk</span
              >
              <span class="font-mono text-sm font-bold text-white">{{
                formatNumber(match.blocked)
              }}</span>
            </div>
          </div>

          <!-- WN8 -->
          <div class="flex w-10 flex-shrink-0 flex-col items-center">
            <span class="text-background-light-500 text-[10px] uppercase"
              >WN8</span
            >
            <span
              class="font-mono text-sm font-bold"
              :style="{ color: getWn8Color(match.wn8) }"
              >{{ match.wn8 }}</span
            >
          </div>

          <!-- Secondary Stats (XP, Credits, Kills) -->
          <div
            class="border-background-dark-300 flex flex-shrink-0 items-center gap-3 border-l pl-3"
          >
            <div class="flex w-8 flex-col items-center" title="Base XP">
              <span class="text-background-light-500 text-[10px]">XP</span>
              <span class="text-xs font-bold text-white">{{
                formatNumber(match.xp)
              }}</span>
            </div>
            <div class="flex w-12 flex-col items-center" title="Net Credits">
              <span class="text-background-light-500 text-[10px]">Creds</span>
              <span
                class="text-xs font-bold"
                :class="match.credits >= 0 ? 'text-gray-200' : 'text-red-400'"
                >{{ formatNumber(match.credits) }}</span
              >
            </div>
            <div class="flex w-6 flex-col items-center" title="Frags">
              <span class="text-background-light-500 text-[10px]">Kills</span>
              <span class="text-xs font-bold text-white">{{
                match.frags
              }}</span>
            </div>
          </div>

          <!-- Tertiary Stats (Spots, Shots, MoE) - Hidden on smaller screens if needed, but showing here -->
          <div
            class="border-background-dark-300 hidden flex-shrink-0 items-center gap-3 border-l pl-3 xl:flex"
          >
            <div class="flex w-6 flex-col items-center" title="Spots">
              <span class="text-background-light-500 text-[10px]">Spot</span>
              <span class="text-xs font-bold text-white">{{
                match.spots
              }}</span>
            </div>
            <div
              class="flex w-10 flex-col items-center"
              title="Penetrations / Shots"
            >
              <span class="text-background-light-500 text-[10px]">Hits</span>
              <span class="text-xs font-bold text-white"
                >{{ match.penetrations }}/{{ match.shots }}</span
              >
            </div>
            <div
              class="flex w-12 flex-col items-center"
              title="Mark of Excellence"
            >
              <span class="text-background-light-500 text-[10px]">MoE</span>
              <div class="flex items-center gap-0.5">
                <span class="text-xs font-bold text-white"
                  >{{ match.moe.toFixed(1) }}%</span
                >
                <span
                  v-if="match.moeDiff !== 0"
                  class="text-[10px]"
                  :class="getMoEColor(match.moeDiff)"
                >
                  {{ match.moeDiff > 0 ? '↑' : '↓' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Time Ago -->
          <div
            class="text-background-light-500 ml-auto pl-2 text-xs whitespace-nowrap"
          >
            {{ formatTime(match.date) }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

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
</style>
