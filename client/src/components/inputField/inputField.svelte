<!-- src/components/inputField/inputField.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  // Using Svelte 5 run-time props declaration
  let { type, title, name, value = $bindable() } = $props();

  // New Svelte 5 approach: using $derived to reactively compute a value.
  // This replaces the old `$: {}` reactive block.
  let showPassword = $state(false);
  const inputType = $derived(
    type === "password" ? (showPassword ? "text" : "password") : type
  );

  // Handle Font Awesome icon loading for the password toggle
  onMount(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css";
    document.head.appendChild(link);
  });
</script>

<div class="form-input-div">
  <!-- 
    The input element. The `placeholder` is an empty string to allow the `:not(:placeholder-shown)` 
    selector to work, which is a modern and clean way to handle floating labels.
  -->
  <input
    type={inputType}
    {name}
    bind:value
    placeholder=" "
    class="form-input"
    id={name}
  />

  <!-- 
    The label for the input. It will float up when the input is focused or filled.
  -->
  <label for={name}>{title}</label>

  {#if type === "password"}
    <button
      type="button"
      class="password-toggle"
      on:click={() => (showPassword = !showPassword)}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      <i
        class="fas"
        class:fa-eye={!showPassword}
        class:fa-eye-slash={showPassword}
      ></i>
    </button>
  {/if}
</div>

<style>
  /* ------------------ Component Container ------------------ */
  .form-input-div {
    position: relative;
    width: 100%;
    /* No fixed width or height, allowing it to be responsive */
  }

  /* ------------------ Input Field Styling ------------------ */
  .form-input {
    width: 100%;
    padding: 1rem 1rem 0.5rem 1rem; /* Adjust padding for better look and feel */
    font-size: 1rem;
    color: var(--color-text-primary);
    background-color: var(--color-bg-tertiary);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    transition: all 0.3s ease-in-out;
  }

  /* Hide the placeholder text by default */
  .form-input::placeholder {
    color: transparent;
  }

  /* Remove default browser outline and add a clean focus effect */
  .form-input:focus {
    outline: none;
    border-color: var(--color-accent-primary);
    box-shadow:
      0 0 0 2px var(--color-accent-primary),
      0 0 10px var(--color-accent-secondary);
  }

  /* ------------------ Floating Label Styling ------------------ */
  .form-input-div label {
    position: absolute;
    top: 50%; /* Center vertically */
    left: 1rem;
    transform: translateY(-50%);
    pointer-events: none;
    padding: 0 0.25rem;
    font-size: 1rem;
    color: var(--color-text-primary);
    opacity: 0.7;
    transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -webkit-transition: all 0.2s ease-in-out;
  }

  /* This is the magic for the floating label! */
  /* When the input is focused or has a value (not showing placeholder), move the label up and change its style */
  .form-input:focus ~ label,
  .form-input:not(:placeholder-shown) ~ label {
    top: -0.65rem;
    left: 0.75rem;
    font-size: 0.8rem;
    color: var(--color-accent-primary);
    background-color: var(
      --color-bg-secondary
    ); /* Use the card background color to prevent text overlap */
    opacity: 1;
    padding: 0 0.5rem;
  }

  /* ------------------ Password Toggle Button ------------------ */
  .password-toggle {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--color-text-primary);
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s ease-in-out;
    padding: 0.5rem;
  }

  .password-toggle:hover {
    opacity: 1;
  }
</style>
