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

export enum NavbarNames {
  Search = 'search',
  Tracking = 'tracking',
  About = 'about',
}

export const NavbarItems = [
  {
    name: NavbarNames.Search,
    label: 'New search [^S]',
    action: handleSearch,
    mapping: Keys.s,
  },
  {
    name: NavbarNames.Tracking,
    label: 'Tracked channels [^T]',
    action: handleTrackingChannels,
    mapping: Keys.t,
  },
  {
    name: NavbarNames.About,
    label: 'About [^A]',
    action: handleAbout,
    mapping: Keys.a,
  },
]
