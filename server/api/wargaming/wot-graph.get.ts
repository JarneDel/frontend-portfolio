// server/api/wot-graph.ts
export interface GraphDataPoint {
  date: string
  fullDate: string
  wn8: number
  battles: number
  winRate: number
}

export default defineEventHandler(async (event): Promise<GraphDataPoint[]> => {
  const config = useRuntimeConfig()

  console.log(config, config.accountId)
  const accountId = config.accountId || '522903268'
  const region = config.wargamingRegion || 'eu'
  console.log(accountId, region, 'wargaming region')

  // Fetch session history (last 60 days usually available on this endpoint)
  const url = `https://api.tomato.gg/api/player/sessions/${region}/${accountId}`

  try {
    const response = await $fetch<any>(url)
    const sessions = response.data.sesday || []

    // Transform for the frontend
    // We sort by timestamp just in case, though usually it's sorted
    return sessions
      .map((s: any) => ({
        date: new Date(s.timestamp).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }), // e.g. "Oct 24"
        fullDate: s.timestamp,
        wn8: s.wnx || s.wn8,
        battles: s.battles,
        winRate: s.winrate,
      }))
      .filter((s: any) => s.battles > 3)
  } catch (error) {
    console.error('Tomato.gg Graph API Error:', error)
    return []
  }
})
