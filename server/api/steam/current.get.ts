import type {
  CurrentGame,
  PlayerInfo,
  SteamApiPlayerSummaryResponse,
  SteamApiPlayer,
} from '~/../../Interfaces/ISteam'

export default defineEventHandler(async (event): Promise<{ currentGame: CurrentGame | null; playerInfo: PlayerInfo }> => {
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
    // Fetch current player summary (includes current game if playing)
    const playerSummaryResponse = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}&format=json`,
    )

    if (!playerSummaryResponse.ok) {
      throw createError({
        statusCode: 502,
        statusMessage: 'Failed to fetch Steam API data',
      })
    }

    const playerSummaryData: SteamApiPlayerSummaryResponse =
      await playerSummaryResponse.json()

    const player: SteamApiPlayer | undefined = playerSummaryData.response.players[0]

    // Format the response
    return {
      currentGame: player?.gameid
        ? {
            id: player.gameid,
            name: player.gameextrainfo || 'Unknown Game',
            isPlaying: true,
          }
        : null,
      playerInfo: {
        personaname: player?.personaname || 'Unknown Player',
        avatar: player?.avatarmedium || '',
        profileurl: player?.profileurl || '',
        personastate: player?.personastate || 0,
      },
    }
  } catch (error) {
    console.error('Steam Current Game API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch current Steam game data',
    })
  }
})
