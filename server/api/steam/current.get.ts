import type {
  CurrentGame,
  PlayerInfo,
  SteamApiPlayerSummaryResponse,
  SteamApiPlayer,
  SteamApiOwnedGame,
} from '~/../../Interfaces/ISteam'
import type { Maybe } from '~/../../Interfaces/maybe'

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


    let game: Maybe<SteamApiOwnedGame> = null

    if (player?.gameid) {
        // get game icon URL
        const gameIconResponse = await fetch(
            `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`,
        )

    
        if (!gameIconResponse.ok) {
            throw createError({
                statusCode: 502,
                statusMessage: 'Failed to fetch game icon data',
            })
        }

        const gameIconData = await gameIconResponse.json()
        const ownedGames: SteamApiOwnedGame[] = gameIconData.response.games || []
        game = ownedGames.find(g => g.appid.toString() === player.gameid)
    }

    // Format the response
    return {
      currentGame: player?.gameid
        ? {
            id: player.gameid,
            name: player.gameextrainfo || 'Unknown Game',
            isPlaying: true,
            iconUrl: game
              ? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
              : '',
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
