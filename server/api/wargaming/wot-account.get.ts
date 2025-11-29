// --- Types for the Frontend ---
export interface WotAccountData {
  nickname: string
  rating: number // global_rating
  createdAt: string
  lastBattle: string
  stats: {
    battles: number
    winRate: string
    avgDamage: number
    avgXp: number
    hitRatio: number
    frags: number
    treesCut: number
  }
}

// --- Internal API Types ---
interface WotAccountResponse {
  status: string
  data: {
    [accountId: string]: {
      nickname: string
      global_rating: number
      created_at: number
      last_battle_time: number
      statistics: {
        all: {
          battles: number
          wins: number
          damage_dealt: number
          battle_avg_xp: number
          hits_percents: number
          frags: number
          survived_battles: number
        }
        trees_cut: number
      }
    }
  }
}

interface WotRatingResponse {
  status: string
  meta: {
    count: number
  }
  data: {
    [accountId: string]: {
      rating: number
      account_id: number
    }
  }
}

export default defineEventHandler(async (event): Promise<WotAccountData> => {
  const config = useRuntimeConfig()
  const apiKey = config.wargamingId as string
  const accountId = config.accountId as string
  const region = config.wargamingRegion || 'eu'

  const baseUrl = `https://api.worldoftanks.${region}/wot`

  try {
    // Fetch both account info and WTR rating in parallel
    const [accountResponse, ratingResponse] = await Promise.all([
      $fetch<WotAccountResponse>(
        `${baseUrl}/account/info/`,
        {
          query: {
            application_id: apiKey,
            account_id: accountId,
            // We limit fields to save bandwidth, though not strictly necessary
            fields:
              'nickname,global_rating,created_at,last_battle_time,statistics.all,statistics.trees_cut',
          },
        },
      ),
      $fetch<WotRatingResponse>(
        `${baseUrl}/account/wtr/`,
        {
          query: {
            application_id: apiKey,
            account_id: accountId,
          },
        },
      )
    ])

    const userData = accountResponse.data[accountId]
    const ratingData = ratingResponse.data[accountId]

    if (!userData) {
      throw createError({ statusCode: 404, statusMessage: 'Player not found' })
    }

    const stats = userData.statistics.all

    // calculations
    const winRate =
      stats.battles > 0 ? ((stats.wins / stats.battles) * 100).toFixed(2) : '0'
    const avgDamage =
      stats.battles > 0 ? Math.round(stats.damage_dealt / stats.battles) : 0

    return {
      nickname: userData.nickname,
      rating: ratingData?.rating || userData.global_rating, // Use WTR rating if available, fallback to global_rating
      createdAt: new Date(userData.created_at * 1000).toLocaleDateString(),
      lastBattle: new Date(
        userData.last_battle_time * 1000,
      ).toLocaleDateString(),
      stats: {
        battles: stats.battles,
        winRate: winRate,
        avgDamage: avgDamage,
        avgXp: stats.battle_avg_xp,
        hitRatio: stats.hits_percents,
        frags: stats.frags,
        treesCut: userData.statistics.trees_cut || 0,
      },
    }
  } catch (error) {
    console.error('WOT Account API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch account info',
    })
  }
})
