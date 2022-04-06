<script lang="ts">
  import { Router, Route } from 'svelte-navigator'

  import Search from '~/components/Search'
  import Results from '~/components/Results'

  export let url = ''
</script>

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
