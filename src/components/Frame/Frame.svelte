<script lang="ts">
  import type { WindowSize } from './frame'

  export let title: string
  export let size: WindowSize = 'full-screen'
</script>

<window class={size}>
  <header>
    <p>{title}</p>
  </header>
  <slot />
</window>

<style>
  window {
    display: block;
    border: var(--frame-border) solid var(--c-primary);
    padding: var(--gap);
  }

  window.full-screen {
    height: 100%;
  }

  window.dialog {
    position: absolute;
    inset: 30% 25%;
  }

  window header {
    background-color: var(--c-primary);
    color: var(--c-secondary);
    margin: calc(var(--gap) * -1);
  }

  window header p {
    padding: 4px;
  }

  window header p::before {
    content: '[';
  }
  window header p::after {
    content: ']';
  }
</style>
