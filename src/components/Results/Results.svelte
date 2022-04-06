<script lang="ts">
  import { onMount } from 'svelte'
  import { useLocation } from 'svelte-navigator'

  import { fetchWithProgress } from '~/lib/fetch-progress'
  import {
    getURL,
    format,
    type Ban,
    extractModeFromPath,
    SearchModes,
  } from '~/lib/search'

  const location = useLocation()
  const initialResults: Ban[] = []
  export let username: string
  $: mode = extractModeFromPath($location.pathname)

  const [results, progress, isFetching] = fetchWithProgress(
    initialResults,
    format
  )

  function handleError(e: Error) {
    alert(e)
  }

  onMount(async () => {
    try {
      await results.fetch(getURL({ username, mode: <SearchModes>mode }))
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
