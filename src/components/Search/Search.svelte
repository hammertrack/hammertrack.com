<script lang="ts">
  import { navigate, useFocus } from 'svelte-navigator'
  import { modeToRoutes, SearchModes } from '~/lib/search'
  import { navbar } from '~/stores/navbar'
  import { getNav } from '~/components/Nav'
  import { Navs } from '~/navigating'
  import Frame from '../Frame'

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

  navbar.set({
    left: [],
    right: [getNav(Navs.Tracking), getNav(Navs.About)],
  })
</script>

<Frame size="dialog" title="database search">
  <input
    bind:value={input}
    use:focus
    class="search-input"
    type="text"
    autocorrect="off"
    spellcheck="false"
    title="Type a twitch channel or user to search the database for bans"
  />
  <button
    class:active={mode == Channel}
    on:click={() => switchMode(Channel)}
    title="Switch to Channel mode - search recent bans in a channel"
  >
    Channel
  </button>
  <button
    class:active={mode == User}
    on:click={() => switchMode(User)}
    title="Switch to User mode - search user's bans across all channels"
  >
    User
  </button>
  <button on:click={handleSearch} title="Execute search against database"
    >Run search</button
  >
</Frame>

<style>
  .search-input {
    background-color: var(--c-primary);
  }
  button.active {
    background-color: black;
    color: white;
  }
</style>
