<script lang="ts">
  import { afterUpdate } from 'svelte'

  import { streamers } from './stores'

  export let name: string
  export let flashing: boolean

  function handleRemove(key: string) {
    streamers.remove(key)
  }

  afterUpdate(() => {
    console.log('updating %s', name)
  })
</script>

<article class={'streamer'} class:active={flashing}>
  {name} <button on:click={() => handleRemove(name)}>Remove</button>
</article>

<style>
  .streamer.active {
    background-color: red;
  }
</style>
