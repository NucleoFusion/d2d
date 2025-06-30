<script lang="ts">
  import Footer from "../../components/footer/footer.svelte";
  import "../global.css";
  let { children } = $props();
</script>

{@render children()}
<div class="footer-container">
  <Footer />
</div>

<style>
  @import "../global.css";

  .footer-container {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 100;
  }
</style>
