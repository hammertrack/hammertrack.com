<script lang="ts">
  import { navigate, useFocus } from 'svelte-navigator'
  import { modeToRoutes, SearchModes } from '~/lib/search'

  let input: string
  let mode = SearchModes.Channel
  const { User, Channel } = SearchModes

  const focus = useFocus()

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

<input
  bind:value={input}
  use:focus
  class="search-input"
  type="text"
  autocorrect="off"
  spellcheck="false"
  title="Type a twitch channel or user to search the database for bans"
/>
<button class:active={mode == Channel} on:click={() => switchMode(Channel)}>
  Channel
</button>
<button class:active={mode == User} on:click={() => switchMode(User)}>
  User
</button>
<button on:click={handleSearch}>Run search</button>

<style>
  .search-input {
    background-color: var(--c-primary);
  }
  button.active {
    background-color: black;
    color: white;
  }
</style>
