<script lang="ts">
  import { onMount } from 'svelte'
  import { useLocation } from 'svelte-navigator'

  import { fetchWithProgress } from '~/lib/fetch-progress'
  import { getURL, format, type Ban, extractModeFromPath } from '~/lib/search'
  import { Navs } from '~/navigating'
  import { status } from '~/stores/footer'
  import { navbar } from '~/stores/navbar'
  import { getNav } from '../Nav'

  const location = useLocation()
  const initialResults: Ban[] = []
  export let username: string
  $: mode = extractModeFromPath($location.pathname)

  const [results, progress, isFetching] = fetchWithProgress(
    initialResults,
    format
  )

  function handleError(e: Error) {
    let msg = ''
    if (e.message.includes('NetworkError')) {
      if (!navigator.onLine) {
        msg = `ERR: No internet connection`
      } else {
        msg = 'ERR: There was a network error'
      }
    } else if (e instanceof SyntaxError) {
      msg = 'ERR: Unexpected server response error'
    } else {
      msg = 'ERR: Unexpected error'
    }
    console.log(e)
    status.set({
      message: msg,
      type: 'error',
    })
  }

  navbar.set({
    left: [getNav(Navs.Search)],
    right: [getNav(Navs.Tracking), getNav(Navs.About)],
  })

  onMount(async () => {
    try {
      status.set({ message: 'running search..', type: 'info' })
      await results.fetch(getURL({ username, mode }))
      status.set({
        message: 'filter with [1],[2] keys or click on each filter button',
        type: 'info',
      })
    } catch (e) {
      handleError(<Error>e)
    }
  })
</script>

<h1>Results for {username}</h1>
{#if $isFetching}
  <progress max="100" value={$progress} />
{/if}
<ul>
  {#each $results as row}
    <li>
      ch: {row.channel} usr: {row.username} substatus: {row.subscribed} @: {row.at}
    </li>
  {/each}
</ul>
