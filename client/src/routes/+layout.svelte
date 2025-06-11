<script lang="ts">
  let { children } = $props();
</script>

<div class="bg"></div>

{@render children()}

<style>
  @import "./global.css";

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    overflow: hidden;
    background-color: var(--color-bg-primary);
    background-image: var(--bg-noise), var(--bg-radial-gradient);
  }
  bg::before {
   content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(138, 99, 210, 0.1) 0%, transparent 25%),
    radial-gradient(circle at 80% 70%, rgba(209, 99, 169, 0.1) 0%, transparent 25%);
  pointer-events: none;
  z-index: -1;
}
</style>
