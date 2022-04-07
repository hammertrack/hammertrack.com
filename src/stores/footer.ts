import { writable } from 'svelte/store'

export interface Status {
  message: string
  type: 'info' | 'error'
}

const initialStatus: Status = {
  message: 'run a search to start',
  type: 'info',
}

export const status = writable(initialStatus)
