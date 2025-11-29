// server/api/wot-stats.ts
export interface TankData {
  id: number
  name: string
  tier: number
  type: string
  nation: string
  image: string
  isPremium: boolean
  stats: {
    battles: number
    wins: number
    winRate: string
    // Removed lastPlayed because PC API doesn't support it
  }
}

// --- 2. Internal Wargaming JSON Types ---
// Based on the JSON you provided
interface WotTankStatRaw {
  tank_id: number
  mark_of_mastery: number
  all: {
    spotted: number
    battles: number
    wins: number
    losses: number
    damage_dealt: number
    damage_received: number
    frags: number
    xp: number
    survived_battles: number
  }
  // Note: last_battle_time does NOT exist here in the PC API
}

interface WotStatsResponse {
  status: string
  data: {
    [accountId: string]: WotTankStatRaw[]
  }
}

interface WotPediaResponse {
  status: string
  data: {
    [tankId: string]: {
      name: string
      tier: number
      type: string
      nation: string
      is_premium: boolean
      images: {
        big_icon: string
        contour_icon: string
      }
    }
  }
}
// --- Handler ---

export default defineEventHandler(async (event): Promise<TankData[]> => {
  const config = useRuntimeConfig()

  const apiKey = config.wargamingId.trim() as string
  const accountId = config.accountId.trim() as string
  const region = config.wargamingRegion || 'eu'

  const baseUrl = `https://api.worldoftanks.${region}/wot`

  try {
    // 1. Fetch User's Tank Stats
    // We removed 'last_battle_time' from fields because it causes errors on PC API
    const statsResponse = await $fetch<WotStatsResponse>(
      `${baseUrl}/tanks/stats/`,
      {
        query: {
          application_id: apiKey,
          account_id: accountId,
          fields: 'tank_id,all.battles,all.wins', // Simplified fields
        },
      },
    )

    if (statsResponse.status !== 'ok' || !statsResponse.data[accountId]) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch WOT Stats',
      })
    }

    const allTanks = statsResponse.data[accountId]

    // 2. Sort by "Most Played" (Battles)
    // Since we don't have dates, we show your favorite tanks instead.
    const topTanks = allTanks
      .sort((a, b) => b.all.battles - a.all.battles)
      .slice(0, 6)

    // 3. Extract IDs to fetch Encyclopedia details
    const tankIds = topTanks.map(t => t.tank_id).join(',')

    // 4. Fetch Tank Encyclopedia (Images, Names)
    const pediaResponse = await $fetch<WotPediaResponse>(
      `${baseUrl}/encyclopedia/vehicles/`,
      {
        query: {
          application_id: apiKey,
          tank_id: tankIds,
          fields: 'name,images,tier,type,tank_id,nation,is_premium',
        },
      },
    )

    const tankDetails = pediaResponse.data

    // 5. Merge and Transform
    const mergedData: TankData[] = topTanks
      .map(stat => {
        const details = tankDetails[stat.tank_id]

        // Skip tanks not found in encyclopedia (rare/removed tanks)
        if (!details) return null

        // Calculate Win Rate safely
        const winRate =
          stat.all.battles > 0
            ? ((stat.all.wins / stat.all.battles) * 100).toFixed(1)
            : '0.0'

        return {
          id: stat.tank_id,
          name: details.name,
          tier: details.tier,
          type: details.type,
          nation: details.nation,
          isPremium: details.is_premium,
          image: details.images.big_icon || details.images.contour_icon,
          stats: {
            battles: stat.all.battles,
            wins: stat.all.wins,
            winRate: winRate,
          },
        }
      })
      .filter((item): item is TankData => item !== null)

    return mergedData
  } catch (error) {
    console.error('WOT API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching World of Tanks data',
    })
  }
})
