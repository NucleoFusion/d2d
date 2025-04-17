<script lang="ts">
  import Navbar from "../components/navbar/navbar.svelte";

  let { children } = $props();
</script>

<Navbar />

{@render children()}

<style>
  @import "./global.css";

  :global(body) {
    background-color: var(--crust);

    min-height: 100vh;
  }
</style>
