import { writable, type Writable } from 'svelte/store'
import { tweened, type Tweened } from 'svelte/motion'
import { cubicOut } from 'svelte/easing'

export interface FetchWithProgressStore<T> extends Writable<T> {
  fetch(url: string): Promise<void>
}

async function http<T>(
  url: string,
  progressFunc: (received: number) => void
): Promise<T> {
  const decoder = new TextDecoder()
  const resp = await fetch(url)
  if (resp.body == null) {
    throw new TypeError('response.body is null')
  }
  // note: in the future it would be better to use resp.body.pipeThrough but
  // firefox does not support it
  const reader = resp.body.getReader()
  const contentLen = resp.headers.get('Content-Length')
  if (contentLen == null) {
    throw new TypeError('Content-Length header is null')
  }

  let [end, result, received] = [false, '', 0]
  // note: in the future it would be better to use Promise.any with a timeout to
  // prevent any chance of infinite loop but opera does not support it
  while (!end) {
    const { done, value } = await reader.read()
    end = done

    if (!value) {
      continue
    }
    received += value.byteLength
    result += decoder.decode(value, { stream: true })
    progressFunc((received / +contentLen) * 100)
  }
  return <T>JSON.parse(result)
}

function createProgressFunc(progressStore: Writable<number>) {
  return (received: number) => {
    progressStore.set(received)
  }
}

// fetchWithProgress is a store that takes an initial value of type `T` and
// returns three stores: one with the results, a second one with the progress of the
// fetch operation and a third one with a boolean that will be equal to `true`
// during the fetching process
//
// The results store has a `fetch(url: string)` method to fetch for the results
// and the progress store will be updated automatically while fetching.
//
// If a format function is passed down as a second argument to
// fetchWithProgress, the results will be formatted with the provided function
// before setting the value in the store
//
// Wrap the results.fetch() method in a try..catch block for handling the
// parsing and network errors.
export function fetchWithProgress<T>(
  initial: T,
  formatFunc?: (resp: unknown) => T
): [FetchWithProgressStore<T>, Tweened<number>, Writable<boolean>] {
  const results = writable(initial)
  const progress = tweened(0, {
    duration: 800,
    easing: cubicOut,
  })
  const isFetching = writable(false)
  const { set, update, subscribe } = results
  return [
    {
      set,
      update,
      subscribe,
      fetch: async (url) => {
        isFetching.set(true)
        let raw: T = await http<T>(url, createProgressFunc(progress))
        if (typeof formatFunc === 'function') {
          raw = formatFunc(raw)
        }
        set(raw)
        isFetching.set(false)
      },
    },
    progress,
    isFetching,
  ]
}
