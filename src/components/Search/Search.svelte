<script lang="ts">
  import { navigate } from 'svelte-navigator'
  import { modeToRoutes, SearchModes } from '~/lib/search'

  let input: string
  let mode = SearchModes.Channel
  const { User, Channel } = SearchModes

  function handleSearch() {
    if (!input) {
      return
    }
    navigate(`${modeToRoutes[mode]}/${input}`, { replace: true })
  }

  function switchMode(target: SearchModes) {
    mode = target
  }
</script>

<input type="text" bind:value={input} />
<button class:active={mode == Channel} on:click={() => switchMode(Channel)}>
  Channel
</button>
<button class:active={mode == User} on:click={() => switchMode(User)}>
  User
</button>
<button on:click={handleSearch}>Run search</button>

<style>
  button.active {
    background-color: black;
    color: white;
  }
</style>
