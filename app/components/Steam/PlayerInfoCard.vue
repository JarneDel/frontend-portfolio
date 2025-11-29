<template>
  <div
    class="col-span-2 row-span-1 rounded-xl bg-background-dark-300 p-4 transition-colors duration-200 border border-background-dark-400 shadow-lg"
    style="grid-column: span 2;"
  >
    <div class="flex items-center space-x-3">
      <BaseImage
        :src="playerInfo.avatar"
        :alt="playerInfo.personaname"
        class="h-12 w-12 rounded-full"
        loading="lazy"
        placeholder="/images/placeholder-full.webp"
      />
      <div>
        <p class="text-lg font-bold text-white">
          {{ playerInfo.personaname }}
        </p>
        <p class="text-sm text-background-light-500">
          {{ getPlayerStatus(playerInfo.personastate) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlayerState, type PlayerInfo } from '~~/Interfaces/ISteam'
import BaseImage from '../Styled/baseImage.vue'

interface Props {
  playerInfo: PlayerInfo
}

defineProps<Props>()

function getPlayerStatus(state: PlayerState): string {
  const statuses: Record<PlayerState, string> = {
    [PlayerState.Offline]: 'Offline',
    [PlayerState.Online]: 'Online',
    [PlayerState.Busy]: 'Busy',
    [PlayerState.Away]: 'Away',
    [PlayerState.Snooze]: 'Snooze',
    [PlayerState.LookingToTrade]: 'Looking to trade',
    [PlayerState.LookingToPlay]: 'Looking to play',
  }
  return statuses[state] || 'Unknown'
}
</script>
