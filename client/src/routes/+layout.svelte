<script lang="ts">
  import Navbar from "../components/navbar/navbar.svelte";
  let { children } = $props();

  const bubbles = [
    { size: 220, top: 75, left: 25, blur: 100, color: "--color-text-accent" },
    { size: 180, top: 70, left: 80, blur: 90, color: "--color-text-accent" },
    { size: 150, top: 80, left: 30, blur: 90, color: "--color-text-accent" },
    { size: 200, top: 80, left: 60, blur: 90, color: "--color-text-accent" },
    { size: 170, top: 60, left: 80, blur: 90, color: "--color-text-accent" },
    { size: 140, top: 80, left: 10, blur: 90, color: "--color-text-accent" },
    { size: 140, top: 80, left: 20, blur: 90, color: "--color-text-accent" },
  ];
</script>

<div class="bg">
  {#each bubbles as bubble, i (i)}
    <div
      class="bubble"
      style="
        --bubble-width: {bubble.size}px;
        --bubble-height: {bubble.size}px;
        --bubble-top: {bubble.top}%;
        --bubble-left: {bubble.left}%;
        --bubble-bg: var({bubble.color});
        --bubble-blur: {bubble.blur}px;
      "
    ></div>
  {/each}
</div>
<div class="navbar-container">
  <Navbar />
</div>
{@render children()}

<style>
  @import "./global.css";

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    z-index: -10;
    overflow: hidden;
    background-color: var(--color-bg-primary);
    background-image: var(--bg-noise), var(--bg-radial-gradient);
    pointer-events: none;
  }

  .bubble {
    position: absolute;
    width: var(--bubble-width);
    height: var(--bubble-height);
    top: var(--bubble-top);
    left: var(--bubble-left);
    background: var(--bubble-bg);
    filter: blur(var(--bubble-blur));
    border-radius: 50%;
    opacity: 0.8;
    transition:
      filter 0.5s,
      opacity 0.5s;
    will-change: filter, opacity;
  }
  .navbar-container {
    display: flex;
    justify-content: center;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 100;
  }
</style>
