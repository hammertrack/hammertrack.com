<script lang="ts">
  import { type CbParam } from '~/actions'
  import { navbar } from '~/stores/navbar'

  function handleClick(action: (modifier: CbParam) => void) {
    action({ shift: false, ctrl: true })
  }
</script>

<nav>
  <ul class="l-nav">
    {#each $navbar.left as { action, label, keyLabel, title }}
      <li {title} on:click={() => handleClick(action)}>
        {label} <span>{keyLabel}</span>
      </li>
    {/each}
  </ul>
  <ul class="r-nav">
    {#each $navbar.right as { action, label, keyLabel, title }}
      <li {title} on:click={() => handleClick(action)}>
        {label} <span>{keyLabel}</span>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  nav ul {
    display: flex;
  }

  nav ul span {
    font-weight: 100;
  }

  nav li {
    padding: 0px 8px;
    background-color: var(--c-primary);
    color: var(--c-secondary);
    cursor: pointer;
  }

  nav li:hover {
    background-color: var(--c-alt);
  }

  nav li + li {
    margin-left: var(--gap);
  }
</style>
