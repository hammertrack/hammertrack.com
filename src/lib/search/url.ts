import { extractPageFromPath } from '~/lib/utils'
import { SearchModes, HTURL, routeToModes } from './constants'
import { type Cursor } from './fetch'

const BASE_URL = HTURL.Base + HTURL.API
const CHAN_URL = BASE_URL + HTURL.ChannelEndpoint
const USER_URL = BASE_URL + HTURL.UserEndpoint

export type BanRequest = {
  username: string
  mode: SearchModes
  after?: Cursor
}

export function getURL(req: BanRequest): string {
  let url = ''
  switch (req.mode) {
    case SearchModes.Channel:
      url += CHAN_URL
      break
    case SearchModes.User:
      url += USER_URL
      break
    default:
      url += CHAN_URL
  }
  url += `/${req.username}`
  if (req.after) {
    url += `?after=${req.after}`
  }
  return url
}

export function extractModeFromPath(path: string): SearchModes {
  return routeToModes[extractPageFromPath(path)]
}
