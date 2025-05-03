<script lang="ts">
  let { children } = $props();
</script>

<div class="bg"></div>
{@render children()}

<style>
  @import "./global.css";

  .bg {
    position: absolute;

    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;
    background: var(--bg);
    overflow: hidden;
    z-index: -10;
  }

  :global(body) {
    min-height: 100vh;
  }
</style>
