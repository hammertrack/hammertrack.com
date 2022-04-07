import { navigate } from 'svelte-navigator'
import { Keys, type CbParam } from './actions'

function handleTrackingChannels(modifiers: CbParam) {
  if (!modifiers.ctrl) {
    return
  }
  navigate('/tracked', { replace: true })
}

function handleAbout(modifiers: CbParam) {
  if (!modifiers.ctrl) {
    return
  }
  navigate('/about', { replace: true })
}

function handleSearch(modifiers: CbParam) {
  if (!modifiers.ctrl) {
    return
  }
  navigate('/', { replace: true })
}

export enum Navs {
  Search = 'search',
  Tracking = 'tracking',
  About = 'about',
}

export const NavbarItems = [
  {
    name: Navs.Search,
    title: 'Start a new search',
    label: 'New search',
    keyLabel: '[^S]',
    action: handleSearch,
    mapping: Keys.s,
  },
  {
    name: Navs.Tracking,
    title: 'See the list of tracked channels',
    label: 'Tracked channels',
    keyLabel: '[^T]',
    action: handleTrackingChannels,
    mapping: Keys.t,
  },
  {
    name: Navs.About,
    label: 'About',
    keyLabel: '[^A]',
    action: handleAbout,
    mapping: Keys.a,
  },
]
