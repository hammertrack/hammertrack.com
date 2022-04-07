export enum Keys {
  enter = 'Enter',
  t = 't',
  a = 'a',
  s = 's',
  n = 'n',
  f = 'f',
  N1 = '1',
  N2 = '2',
  N3 = '3',
  N4 = '4',
  N5 = '5',
  N6 = '6',
  N7 = '7',
  bksp = 'Backspace',
}

export type CbParam = {
  shift: boolean
  ctrl: boolean
}
export type KeyBindingsParams = {
  mapTo: Keys
  cb: (modifiers: CbParam) => void
}

export type Handler = (modifiers: CbParam, evt: KeyboardEvent) => void
export type Mappings = Record<Keys, Handler>
export type MappingsParam = {
  [Property in Keys]?: Handler
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const cachedMappings: Mappings = Object.entries(Keys).reduce(
  (obj, entries) => ({ ...obj, [entries[1]]: noop }),
  {} as Mappings
)

// map is an action to map global mappings to handlers. The mapping will last
// the same as the life cycle of element where it is applied.
export function globalKeyBindings(node: HTMLElement, mappings: MappingsParam) {
  function handleKeydown(evt: KeyboardEvent) {
    const fn = cachedMappings[<Keys>evt.key]
    if (typeof fn === 'function') {
      fn({ shift: evt.shiftKey, ctrl: evt.ctrlKey }, evt)
    }
  }
  for (const key in mappings) {
    const fn = mappings[<Keys>key]
    if (typeof fn !== 'function') {
      throw TypeError(`Expected mapping value ${key} to be a function`)
    }
    cachedMappings[<Keys>key] = fn
  }
  document.addEventListener('keydown', handleKeydown)
  return {
    destroy() {
      document.removeEventListener('keydown', handleKeydown)
    },
  }
}

// keyBinding maps a key locally to the node where it the action is applied.
// Multiple keyBinding actions can be used.
export function keyBinding(node: HTMLElement, params: KeyBindingsParams) {
  const { mapTo, cb } = params
  function handleKeydown(evt: KeyboardEvent) {
    if (mapTo !== evt.key) {
      return
    }
    cb({ shift: evt.shiftKey, ctrl: evt.ctrlKey })
  }
  node.addEventListener('keydown', handleKeydown)
  return {
    destroy() {
      node.removeEventListener('keydown', handleKeydown)
    },
  }
}
