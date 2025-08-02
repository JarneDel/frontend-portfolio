import type {
  SteamData,
  SteamApiRecentGamesResponse,
  SteamApiOwnedGamesResponse,
  SteamApiGame,
  SteamApiOwnedGame,
} from '~~/Interfaces/ISteam'

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
    if (recentGamesResult.status === 'rejected' || ownedGamesResult.status === 'rejected') {
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

    // Get top 10 most played games (sorted by playtime_forever)
    const mostPlayedGames = ownedGames
      .filter((game) => game.playtime_forever > 0) // Only include games that have been played
      .sort((a, b) => b.playtime_forever - a.playtime_forever) // Sort by playtime descending
      .slice(0, 24) 

    // Format the response
    return {
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
    }
  } catch (error) {
    console.error('Steam API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch Steam data',
    })
  }
})
