import { writable, type Writable } from 'svelte/store'
export type GettableStore<T> = Writable<T> & {
  get(): T
}
export type Updater<T> = (oldVal: T) => T

/**
 * Improved version of a writable store. It has a get method so you can read it
 * without suscribing or using the `get()` (which suscribes and unsuscribes and
 * it is not so performant)
 */
export function gettable<T>(value: T): GettableStore<T> {
  const w = writable(value)

  function set(newVal: T) {
    return w.set((value = newVal))
  }
  function update(fn: Updater<T>) {
    w.update((oldVal: T) => (value = fn(oldVal)))
  }
  function get() {
    return value
  }
  return { set, update, subscribe: w.subscribe, get }
}
