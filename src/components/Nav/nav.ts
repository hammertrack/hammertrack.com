import { Keys, type CbParam } from '~/actions'
import type { MappingsParam } from '~/actions'

export type Nav = {
  name: string
  title: string
  label: string
  keyLabel: string
  action: (modifiers: CbParam) => void
  mapping: Keys
}

export type Navbar = {
  left: Nav[]
  right: Nav[]
}

const cachedItems: Record<string, Nav> = {}

export function getNav(name: string): Nav {
  return cachedItems[name]
}

export function loadItems(items: Nav[]) {
  for (const item of items) {
    cachedItems[item.name] = item
  }
}

export function createMappingsConfig(): MappingsParam {
  return Object.entries(cachedItems).reduce(
    (obj, [_name, nav]) => ({
      ...obj,
      [nav.mapping]: nav.action,
    }),
    {}
  )
}
