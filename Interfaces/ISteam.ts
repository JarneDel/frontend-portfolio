export interface SteamGame {
  id: string
  name: string
  playtime2weeks?: number
  playtimeForever: number
  iconUrl: string
  logoUrl: string
  lastPlayed?: number
}

export interface CurrentGame {
  id: string
  name: string
  isPlaying: boolean
  iconUrl?: string
}

export interface PlayerInfo {
  personaname: string
  avatar: string
  profileurl: string
  personastate: PlayerState
}

export interface PlatformStats {
  totalLinuxPlaytime: number
  totalWindowsPlaytime: number
  linuxGamesCount: number
  windowsGamesCount: number
}

export interface SteamData {
  recentGames: SteamGame[]
  mostPlayedGames: SteamGame[]
  lastPlayedGame: SteamGame | null
  platformStats: PlatformStats
}

export enum PlayerState {
  Offline = 0,
  Online = 1,
  Busy = 2,
  Away = 3,
  Snooze = 4,
  LookingToTrade = 5,
  LookingToPlay = 6,
}

// Steam API Response Types (for server-side use)
export interface SteamApiGame {
  appid: number
  name: string
  playtime_2weeks?: number
  playtime_forever: number
  img_icon_url: string
  img_logo_url: string
  rtime_last_played?: number
}

export interface SteamApiOwnedGame {
  appid: number
  name: string
  playtime_forever: number
  playtime_linux_forever?: number
  playtime_windows_forever?: number
  img_icon_url: string
  img_logo_url: string
  has_community_visible_stats?: boolean
  rtime_last_played: number
}

export interface SteamApiPlayer {
  steamid: string
  personaname: string
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  personastate: PlayerState
  gameid?: string
  gameextrainfo?: string
}

export interface SteamApiRecentGamesResponse {
  response: {
    total_count: number
    games?: SteamApiGame[]
  }
}

export interface SteamApiPlayerSummaryResponse {
  response: {
    players: SteamApiPlayer[]
  }
}

export interface SteamApiOwnedGamesResponse {
  response: {
    game_count: number
    games?: SteamApiOwnedGame[]
  }
}
