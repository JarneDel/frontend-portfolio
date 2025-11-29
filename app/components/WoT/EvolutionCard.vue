<script setup lang="ts">
import WotWn8Chart from './WotWn8Chart.vue'

defineProps<{
  graphData: any[] | null | undefined
}>()
</script>

<template>
  <div v-if="graphData && graphData.length > 0" class="bg-background-dark-300 rounded-xl p-4 shadow-lg border border-background-dark-400 h-64">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-xs font-bold text-background-light-500 uppercase tracking-wider">WNX Evolution</h3>
      <span class="text-[10px] text-background-light-500">Last 30 Sessions</span>
    </div>
    <div class="h-[calc(100%-1.5rem)]">
      <WotWn8Chart :data="graphData" />
    </div>
  </div>
</template>
