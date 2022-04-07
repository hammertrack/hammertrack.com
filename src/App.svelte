<script lang="ts">
  import { Router, Route } from 'svelte-navigator'

  import Search from '~/components/Search'
  import Results from '~/components/Results'
  import Nav, { createMappingsConfig } from '~/components/Nav'

  import { globalKeyBindings } from '~/actions/keyBindings'
  import Footer from '~/components/Footer'

  export let url = ''
</script>

<app use:globalKeyBindings={createMappingsConfig()}>
  <Nav />
  <section>
    <Router {url}>
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
    <Footer />
  </section>
</app>

<style>
  :global(:root) {
    --c-primary: #abffc3;
    --c-alt: #d9f4e1;
    --c-alt-2: #fff;
    --c-alt-3: #93cbff;
    --c-secondary: #333;
    --c-secondary-2: #3d3d3d;
    --c-error: #ffada8;
    --gap: 10px;
    --frame-border: 2px;
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
    color: var(--c-primary);
  }

  :global(#app) {
    border: var(--frame-border) solid var(--c-primary);
    position: absolute;
    inset: var(--gap);
    padding: var(--gap);
  }

  :global(input) {
    outline: none;
    border: none;
  }

  :global(button) {
    outline: none;
  }

  :global(ul) {
    list-style: none;
    padding: 0;
  }

  main {
    grid-area: content;
  }

  section {
    height: calc(100% - var(--gap));
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1.9fr 0.1fr;
    grid-template-areas:
      'content'
      'statusbar';
  }
</style>
