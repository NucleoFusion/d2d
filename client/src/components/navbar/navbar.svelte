<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import profile from "$lib/assets/profile.png";

  let mounted = false;
  onMount(() => (mounted = true));

  //TODO: Redirect
  //TODO: Responsivity
  //TODO: Pallete and Format change to new theme
</script>

{#if mounted}
  <div transition:fly={{ y: -200, duration: 500 }} class="navbar">
    <div>
      <button>
        <!-- <img -->
        <!--   width="48" -->
        <!--   height="48" -->
        <!--   src="https://img.icons8.com/fluency-systems-filled/48/test-account.png" -->
        <!--   alt="test-account" -->
        <!-- /> -->
        <img src={profile} alt="profile icon" />
      </button>
    </div>
    <ul>
      <li>
        <button>Posts</button>
      </li>
      <li>
        <button>Forums</button>
      </li>
      <li>
        <button>About</button>
      </li>
    </ul>
  </div>
{/if}

<style>
  .navbar {
    width: 50vw;
    height: 10vh;

    font-size: 1.1rem;

    color: var(--text);

    background-color: var(--mantle);

    margin-top: -10px;
    margin-left: 25vw;

    border: solid var(--border) 1px;

    border-radius: 20px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;

    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 1fr;
    gap: 2vw;

    justify-content: center;
    align-items: center;
    text-align: center;
  }

  ul {
    list-style-type: none;

    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;

    justify-content: center;
    align-items: center;
    text-align: center;

    height: 100%;
  }

  li > button {
    width: 7vw;
    height: 4vh;

    font-size: 1rem;

    background-color: transparent;

    border: solid 1px var(--border);
    border-radius: 5px;

    color: var(--text);

    transition: all 0.3s ease;
  }

  li > button:hover {
    background-color: var(--text);

    border: solid 1px var(--border);

    color: var(--mantle);
  }

  button:has(img) {
    background-color: transparent;
    border: none;

    /*  filter: invert(75%) sepia(1%) saturate(4425%) hue-rotate(172deg)
      brightness(79%) contrast(78%); */
  }

  button:hover {
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    li > button {
      width: 8vw;
    }
  }
</style>
