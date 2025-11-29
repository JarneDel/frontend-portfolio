export interface RecentStats {
  overall: {
    battles: number
    winRate: number
    wn8: number
    avgDamage: number
    survived: number
    label: string
    kd: number
    damageRatio: number
    avgFrags: number
    avgTier: number
  }
  tanks: {
    id: number
    name: string
    tier: number
    image: string
    battles: number
    winRate: number
    wn8: number
    dpg: number // Damage Per Game
    isPremium: boolean
  }[]
}

export default defineEventHandler(async (event): Promise<RecentStats> => {
  const config = useRuntimeConfig()
  const accountId = config.wargamingAccountId?.trim() || '522903268'
  const region = 'eu'

  // Get filter from frontend (e.g., "100", "30d", "1d")
  // Default to "100" battles if not provided
  const query = getQuery(event)
  const filter = (query.filter as string) || '100'

  // Configure what we ask from Tomato.gg
  // We request all the buckets we might need so we can switch easily
  // Note: 1000 is usually the max 'recent' battle count supported.
  const daysParam = '1,30,60' // 90d often defaults to 60d in this API
  const battlesParam = '10,50,100,500,1000'

  const url = `https://api.tomato.gg/api/player/recents/${region}/${accountId}?cache=false&days=${daysParam}&battles=${battlesParam}`

  try {
    const response = await $fetch<any>(url)

    let recentData = null
    let filterLabel = ''

    // Logic to find the correct data slice in the JSON
    if (filter.includes('d')) {
      // Time based (e.g., "30d")
      const days = filter.replace('d', '')
      // Fallback: If 90d requested but not available, try 60
      const key = response.data.days[days] ? days : '60'
      recentData = response.data.days[key]
      filterLabel = `Last ${key} Days`
    } else {
      // Battle count based (e.g., "100")
      // Fallback: If 5000 requested, use 'overall' or max available '1000'
      if (filter === '5000') {
        // 5000 isn't a "recent" snapshot, usually treated as Overall
        recentData = response.data.overall
        // Mock the specific structure if it's overall
        recentData.tankStats = [] // Overall tank stats are heavy, skipping for this view or map properly if needed
        filterLabel = 'Overall (5k+)'
      } else {
        const key = response.data.battles[filter] ? filter : '100'
        recentData = response.data.battles[key]
        filterLabel = `Last ${key} Battles`
      }
    }

    if (!recentData) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Data slice not found',
      })
    }

    // 1. Format Overall Stats
    const overall = {
      battles: recentData.overall?.battles || recentData.battles,
      winRate: recentData.overall?.winrate || recentData.winrate,
      wn8:
        recentData.overall?.wnx ||
        recentData.wnx ||
        recentData.overall?.wn8 ||
        recentData.wn8,
      avgDamage: recentData.overall?.dpg || recentData.dpg,
      survived: recentData.overall?.survival || recentData.survival || 0,
      label: filterLabel,
      kd: recentData.overall?.kd || recentData.kd || 0,
      damageRatio: recentData.overall?.dmgRatio || recentData.dmgRatio || 0,
      avgFrags: recentData.overall?.frags || recentData.frags || 0,
      avgTier: recentData.overall?.tier || recentData.tier || 0,
    }

    // 2. Format Top Tanks
    // Handle cases where tankStats might be missing (e.g. sometimes in overall data depending on endpoint)
    const rawTanks = recentData.tankStats || []

    const tanks = rawTanks
      .sort((a: any, b: any) => b.battles - a.battles)
      .slice(0, 30)
      .map((t: any) => ({
        id: t.id,
        name: t.name,
        tier: t.tier,
        image: convertToHttps(t.bigImage || t.image),
        battles: t.battles,
        winRate: t.winrate,
        wn8: t.wnx || t.wn8,
        dpg: t.dpg,
        isPremium: t.isPrem,
      }))
      .filter((t: any) => t.battles > (overall.battles < 100 ? 0 : 3))

    return { overall, tanks }
  } catch (error) {
    console.error('Tomato.gg API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch stats',
    })
  }
})


const convertToHttps = (url: string): string => {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://')
  }
  return url
}