export enum Keys {
  Enter = 'Enter',
}

export type CbParam = {
  shift: boolean
  ctrl: boolean
}
export type KeyBindingsParams = {
  mapTo: Keys
  cb: (modifiers: CbParam) => void
}

export function keyBindings(node: HTMLElement, params: KeyBindingsParams) {
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
