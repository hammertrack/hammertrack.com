<script lang="ts">
  import { Router, Route } from 'svelte-navigator'

  import Search from '~/components/Search'
  import Results from '~/components/Results'
  import Nav, { createMappingsConfig, item } from './components/Nav'

  import { globalKeyBindings } from './actions/keyBindings'
  import { navbar } from './stores/navbar'
  import { NavbarNames } from './navigating'

  export let url = ''

  navbar.set({
    left: [],
    right: [item(NavbarNames.Tracking), item(NavbarNames.About)],
  })
</script>

<app use:globalKeyBindings={createMappingsConfig()}>
  <Router {url}>
    <Nav />
    <main>
      <Route path="/">
        <Search />
      </Route>
      <Route path="u/:search" let:params>
        <Results username={params.search} />
      </Route>
      <Route path="c/:search" let:params>
        <Results username={params.search} />
      </Route>
      <Route path="/*">
        <h1>404</h1>
      </Route>
    </main>
  </Router>
</app>

<style>
  :global(:root) {
    --c-primary: #abffc3;
    --c-alt: #93cbff;
    --c-alt-2: #fff;
    --c-secondary: #333;
    --c-secondary-2: #3d3d3d;
    --c-error: #ffada8;
  }

  :global(*) {
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    margin: 0;
  }

  :global(html),
  :global(body) {
    height: 100vh;
    background-color: var(--c-secondary);
  }

  :global(#app) {
    border: 2px solid var(--c-primary);
    position: absolute;
    inset: 10px;
    padding: 10px;
  }

  :global(input) {
    outline: none;
    border: none;
  }

  :global(button) {
    outline: none;
  }
</style>
