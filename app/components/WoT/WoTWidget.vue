<script setup lang="ts">
// --- State for Filter ---
const selectedFilter = ref('100')

const filterOptions = [
  { label: '10 Battles', value: '10' },
  { label: '50 Battles', value: '50' },
  { label: '100 Battles', value: '100' },
  { label: '500 Battles', value: '500' },
  { label: '1000 Battles', value: '1000' },
  { label: '24 Hours', value: '1d' },
  { label: '30 Days', value: '30d' },
  { label: '60 Days', value: '60d' },
]

// 1. Profile: Keep this BLOCKING (await) if it's fast (<100ms),
// so the layout skeleton (sidebar/header) exists immediately.
// If it's slow, change to useLazyAsyncData.
const { data: profile } = await useAsyncData(
  'wot-profile',
  () => $fetch('/api/wargaming/wot-account'),
  {
    server: true,
  },
)

const {
  data: recent,
  status: recentStatus,
  refresh,
} = await useLazyAsyncData(
  'wot-recent',
  () =>
    $fetch('/api/wargaming/wot-recent', {
      query: { filter: selectedFilter.value },
    }),
  {
    watch: [selectedFilter],
    server: false,
  },
)

const { data: graphData, status: graphStatus } = await useAsyncData(
  'wot-graph',
  () => $fetch('/api/wargaming/wot-graph'),
  {
    server: true,
  },
)
</script>

<template>
  <div
    v-if="profile"
    class="text-background-light-200 mx-auto w-full font-sans"
  >
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <!-- LEFT COLUMN -->
        <div class="flex flex-col gap-4 lg:col-span-2">
          <!-- Pass loading status to ProfileCard so it can show a spinner/opacity change -->
          <ProfileCard
            :profile="profile"
            :recent="recent"
            :status="recentStatus"
            :filter-options="filterOptions"
            v-model:filter="selectedFilter"
          />

          <!-- Lifetime is static (from profile), so it renders immediately -->
          <LifetimeStatsCard :profile="profile" />

          <!-- Pass loading status or handle v-if here -->
          <EvolutionCard
            :graph-data="graphData"
            :loading="graphStatus === 'pending'"
          />
        </div>

        <!-- RIGHT COLUMN -->
        <!-- Use a guard or pass loading prop. If recent is null, show fallback -->
        <TopTanksCard v-if="recentStatus === 'success'" :recent-data="recent" />
        <div
          v-else
          class="bg-background-dark-300 h-96 animate-pulse rounded-xl"
        >
          <!-- Simple Skeleton for TopTanks -->
        </div>
      </div>

      <!-- BOTTOM ROW (Recent Matches) -->
      <!-- This component handles its OWN internal lazy loading (see below) -->
      <RecentMatchesCard />
    </div>
  </div>
</template>
