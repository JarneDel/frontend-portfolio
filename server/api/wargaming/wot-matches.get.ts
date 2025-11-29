export interface WotMatch {
  map: string
  mapImage: string
  tankName: string
  tankImage: string
  tier: number
  isPremium: boolean
  result: 'win' | 'loss' | 'draw'
  damage: number
  frags: number
  assist: number
  blocked: number
  spots: number
  xp: number
  wn8: number
  date: string
  duration: number
  credits: number
  moe: number
  moeDiff: number
  shots: number
  hits: number
  penetrations: number
}

export default defineEventHandler(async (event): Promise<WotMatch[]> => {
  const config = useRuntimeConfig()
  const accountId = config.wargamingAccountId?.trim() || '522903268'

  // This endpoint returns individual battle results (requires mod usage by the player usually, but Tomato.gg aggregates it)
  const url = `https://api.tomato.gg/api/player/combined-battles/${accountId}`

  try {
    const response = await $fetch<any>(url)
    const battles = response.data || []

    return battles.map((b: any) => ({
      map: b.map,
      mapImage: `/api/wargaming/map-proxy?name=${b.geometry_name}`,
      tankName: b.short_name || b.name,
      tankImage: convertToHttps(b.big_icon || b.image),
      tier: b.tier,
      isPremium: b.is_premium,
      result: b.won ? 'win' : 'loss', // The API usually has 'won': true/false. Draw might be inferred or just loss.
      damage: b.damage,
      frags: b.frags,
      assist: (b.spotting_assist || 0) + (b.tracking_assist || 0),
      blocked: b.damage_blocked || 0,
      spots: b.spots || 0,
      xp: b.base_xp,
      wn8: b.wn8 || 0,
      date: b.battle_time,
      duration: b.duration,
      credits: b.net_credit_earnings || b.credits_recieved || 0,
      moe: parseFloat(b.moe || '0'),
      moeDiff: parseFloat(b.moe_diff || '0'),
      shots: b.shots_fired,
      hits: b.direct_hits,
      penetrations: b.penetrations,
    })).slice(0, 20) // Limit to last 20 matches
  } catch (error) {
    console.error('Tomato.gg Matches API Error:', error)
    return []
  }
})

const convertToHttps = (url: string): string => {
  if (url && url.startsWith('http://')) {
    return url.replace('http://', 'https://')
  }
  return url
}
