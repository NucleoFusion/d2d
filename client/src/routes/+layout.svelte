<script lang="ts">
  let { children } = $props();
   
const bubbleCount = 6;

  
  function randomBubble(i: number) {
   
    function seededRandom(seed: number) {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    }
    const size = seededRandom(i + 1) * 180 + 120; 
    const top = seededRandom(i + 2) * 100; 
    const left = seededRandom(i + 3) * 100; 
    const blur = seededRandom(i + 4) * 30 + 70; 
    const colors = [
      "--color-text-accent",
      "--color-accent-primary",
      "--color-text-accent",
      "--color-text-accent",
      " --color-border"
    ];
    const color = colors[i % colors.length];
    return { size, top, left, blur, color };
  }

 
  const bubbles = Array.from({ length: bubbleCount }, (_, i) => randomBubble(i));
</script>

<div class="bg">
{#each bubbles as bubble, i (i)}
    <div
      class="bubble"
      style="
        width: {bubble.size}px;
        height: {bubble.size}px;
        top: {bubble.top}%;
        left: {bubble.left}%;
        background: var({bubble.color});
        filter: blur({bubble.blur}px);
      "
    ></div>
  {/each}
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
    border-radius: 50%;
    opacity: 0.8;
    transition: filter 0.5s, opacity 0.5s;
    will-change: filter, opacity;
  }
</style>
