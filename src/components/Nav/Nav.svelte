<script lang="ts">
  import { type CbParam } from '~/actions'
  import { navbar } from '~/stores/navbar'

  function handleClick(action: (modifier: CbParam) => void) {
    action({ shift: false, ctrl: true })
  }
</script>

<nav>
  <ul class="l-nav">
    {#each $navbar.left as { action, label }}
      <li on:click={() => handleClick(action)}>
        {label}
      </li>
    {/each}
  </ul>
  <ul class="r-nav">
    {#each $navbar.right as { action, label }}
      <li on:click={() => handleClick(action)}>
        {label}
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav li {
    background-color: var(--c-primary);
  }
</style>
