import { writable } from 'svelte/store'
import { loadItems, type Navbar, type Nav } from './nav'

const initialNavbar: Navbar = {
  left: [],
  right: [],
}

export function createNavbarStore(items: Nav[]) {
  loadItems(items)
  return writable(initialNavbar)
}
