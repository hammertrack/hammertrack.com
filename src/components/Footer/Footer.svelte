<script lang="ts">
  import { Version, Name } from '~/lib/constants'
  import { status } from '~/stores/footer'
</script>

<footer>
  <p
    class="status"
    class:error={$status.type === 'error'}
    title="Status information"
  >
    {$status.message}
  </p>
  <section class="client-info">
    <p>{Name}</p>
    <p>client+v{Version}</p>
  </section>
</footer>

<style>
  footer {
    grid-area: statusbar;
    border-top: var(--frame-border) solid var(--c-primary);
    margin: 0 calc(var(--gap) * -1);
    align-self: end;
    display: flex;
    justify-content: space-between;
  }

  footer p {
    padding: 2px var(--gap);
  }

  footer p.error {
    color: var(--c-error);
  }

  footer .status::after {
    content: '.';
  }

  footer .client-info {
    display: flex;
  }

  footer .client-info p + p {
    border-left: var(--frame-border) solid var(--c-primary);
    margin-left: var(--gap);
  }
</style>
