import type {
  SteamData,
  SteamApiRecentGamesResponse,
  SteamApiOwnedGamesResponse,
  SteamApiGame,
  SteamApiOwnedGame,
} from '~~/Interfaces/ISteam'

const CACHE_KEY = 'steam-data'
const CACHE_TTL = 15 * 60 // 15 minutes in seconds

export default defineEventHandler(async (event): Promise<SteamData> => {
  const config = useRuntimeConfig()

  const steamApiKey = config.steamApiKey as string
  const steamId = config.steamId as string

  if (!steamApiKey || !steamId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Steam API key or Steam ID not configured',
    })
  }

  // Try to get cached data first
  try {
    const cachedData = await useStorage('cache').getItem<{
      data: SteamData
      timestamp: number
    }>(CACHE_KEY)

    if (cachedData && cachedData.timestamp) {
      const isExpired = (Date.now() - cachedData.timestamp) / 1000 > CACHE_TTL
      
      if (!isExpired) {
        return cachedData.data
      }
    }
  } catch (error) {
    console.warn('Cache read error:', error)
  }

  try {
    // Fetch both API endpoints in parallel for better performance
    const [recentGamesResult, ownedGamesResult] = await Promise.allSettled([
      fetch(
        `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&format=json&count=10`,
      ),
      fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`,
      ),
    ])

    // Check if all requests were successful
    if (
      recentGamesResult.status === 'rejected' ||
      ownedGamesResult.status === 'rejected'
    ) {
      throw createError({
        statusCode: 502,
        statusMessage: 'Failed to fetch Steam API data',
      })
    }

    const recentGamesResponse = recentGamesResult.value
    const ownedGamesResponse = ownedGamesResult.value

    if (!recentGamesResponse.ok || !ownedGamesResponse.ok) {
      throw createError({
        statusCode: 502,
        statusMessage: 'Failed to fetch Steam API data',
      })
    }

    const recentGamesData: SteamApiRecentGamesResponse =
      await recentGamesResponse.json()
    const ownedGamesData: SteamApiOwnedGamesResponse =
      await ownedGamesResponse.json()

    const recentGames: SteamApiGame[] = recentGamesData.response.games || []
    const ownedGames: SteamApiOwnedGame[] = ownedGamesData.response.games || []

    const ignoredGames = new Set([
      268850, // EVGA Precision X1
      431960, // Wallpaper Engine
      282660, // Easy eSports
    ]);

    // Get top 10 most played games (sorted by playtime_forever)
    const mostPlayedGames = ownedGames
      .filter(game => game.playtime_forever > 0 && !ignoredGames.has(game.appid)) // Only include games that have been played
      .sort((a, b) => b.playtime_forever - a.playtime_forever) // Sort by playtime descending
      .slice(0, 40)

    // get last played game (sorted by rtime_last_played)
    const lastPlayedGame = [...ownedGames].sort((a, b) => {
      const aLastPlayed = a.rtime_last_played || 0
      const bLastPlayed = b.rtime_last_played || 0

      return bLastPlayed - aLastPlayed
    })[0]

    // Calculate platform statistics
    const platformStats = ownedGames.reduce(
      (stats, game) => {
        const linuxPlaytime = game.playtime_linux_forever || 0
        const windowsPlaytime = game.playtime_windows_forever || 0

        stats.totalLinuxPlaytime += linuxPlaytime
        stats.totalWindowsPlaytime += windowsPlaytime

        if (linuxPlaytime > 0) stats.linuxGamesCount++
        if (windowsPlaytime > 0) stats.windowsGamesCount++

        return stats
      },
      {
        totalLinuxPlaytime: 0,
        totalWindowsPlaytime: 0,
        linuxGamesCount: 0,
        windowsGamesCount: 0,
      }
    )

    // Format the response
    const steamData: SteamData = {
      recentGames: recentGames.map((game: SteamApiGame) => ({
        id: game.appid.toString(),
        name: game.name,
        playtime2weeks: game.playtime_2weeks,
        playtimeForever: game.playtime_forever,
        iconUrl: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
        logoUrl: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`,
        lastPlayed: game.rtime_last_played,
      })),
      mostPlayedGames: mostPlayedGames.map((game: SteamApiOwnedGame) => ({
        id: game.appid.toString(),
        name: game.name,
        playtimeForever: game.playtime_forever,
        iconUrl: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
        logoUrl: `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`,
      })),
      lastPlayedGame: lastPlayedGame
        ? {
            id: lastPlayedGame.appid.toString(),
            name: lastPlayedGame.name,
            playtimeForever: lastPlayedGame.playtime_forever,
            iconUrl: `https://media.steampowered.com/steamcommunity/public/images/apps/${lastPlayedGame.appid}/${lastPlayedGame.img_icon_url}.jpg`,
            logoUrl: `https://media.steampowered.com/steamcommunity/public/images/apps/${lastPlayedGame.appid}/${lastPlayedGame.img_logo_url}.jpg`,
            lastPlayed: lastPlayedGame.rtime_last_played,
          }
        : null,
      platformStats,
    }

    // Cache the result
    try {
      await useStorage('cache').setItem(CACHE_KEY, {
        data: steamData,
        timestamp: Date.now(),
      })
    } catch (error) {
      console.warn('Cache write error:', error)
    }

    return steamData
  } catch (error) {
    console.error('Steam API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch Steam data',
    })
  }
})
