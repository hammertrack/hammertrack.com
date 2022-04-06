export enum SearchModes {
  User = 1,
  Channel,
}

export const routeToModes: Record<string, SearchModes> = {
  c: SearchModes.Channel,
  u: SearchModes.User,
}
export const modeToRoutes: Record<SearchModes, string> = {
  [SearchModes.Channel]: 'c',
  [SearchModes.User]: 'u',
}

export const HTURL = {
  Base: import.meta.env.VITE_SERVER_BASE_URL,
  API: import.meta.env.VITE_API_BASE_URL,
  ChannelEndpoint: import.meta.env.VITE_CHANNEL_ENDPOINT,
  UserEndpoint: import.meta.env.VITE_USER_ENDPOINT,
}
