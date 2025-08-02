<script lang="ts">
  import { goto } from "$app/navigation";
  import InputField from "../../components/inputField/inputField.svelte";
  import { checkAuth } from "$lib/stores/auth"; // ✅ import store updater

  let isLogin = true;
  let email = "",
    password = "",
    name = "",
    confirmPassword = "";
  let errorMessage = "",
    successMessage = "";

  const runValidations = () => {
    if (!email || !password) return "Missing email or password";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email";
    if (!isLogin && (!name || !confirmPassword))
      return "Missing name or confirm password";
    if (!isLogin && password !== confirmPassword)
      return "Passwords do not match";
    return "";
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    errorMessage = "";
    successMessage = "";

    const validationError = runValidations();
    if (validationError) {
      errorMessage = validationError;
      return;
    }

    const data = { email, password, name, confirmPassword };
    const url = `http://localhost:5555/auth/${isLogin ? "login" : "register"}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        errorMessage = result?.message || "Something went wrong";
        return;
      }

      if (result.token) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userId", result.userId || "");
        checkAuth(); // ✅ update the store reactively
      }

      successMessage =
        result?.message || (isLogin ? "Logged in!" : "Registered!");
      const redirectParam =
        new URLSearchParams(window.location.search).get("redirect") || "/";
      goto(redirectParam); // ✅ redirect to original target
    } catch (err) {
      console.error(err);
      errorMessage = "Network error. Please try again.";
    }
  };
</script>

<!-- Form UI -->
<div class="auth-container">
  <div class="auth-card">
    <form on:submit|preventDefault={handleSubmit}>
      <h1>{isLogin ? "Login" : "Register"}</h1>

      <div class="fields">
        {#if !isLogin}
          <InputField
            bind:value={name}
            name="name"
            type="text"
            title="Display Name"
          />
        {/if}
        <InputField
          bind:value={email}
          name="email"
          type="email"
          title="Email"
        />
        <InputField
          bind:value={password}
          name="password"
          type="password"
          title="Password"
        />
        {#if !isLogin}
          <InputField
            bind:value={confirmPassword}
            name="confirmPassword"
            type="password"
            title="Confirm Password"
          />
        {/if}
      </div>

      <div class="message-container">
        {#if errorMessage}
          <div class="message error">{errorMessage}</div>
        {/if}
        {#if successMessage}
          <div class="message success">{successMessage}</div>
        {/if}
      </div>

      <div class="submit-and-toggle">
        <button type="submit" class="submit-button"
          >{isLogin ? "Log In" : "Sign Up"}</button
        >
        <span class="toggle-text">
          {#if isLogin}
            Don't have an account?
            <button
              type="button"
              class="toggle-button"
              on:click={() => (isLogin = false)}>Sign up</button
            >
          {:else}
            Already have an account?
            <button
              type="button"
              class="toggle-button"
              on:click={() => (isLogin = true)}>Log in</button
            >
          {/if}
        </span>
      </div>
    </form>
  </div>
</div>

<style>
  @import "../global.css";

  /* ------------------ Keyframes & Animations ------------------ */
  @keyframes glowing-border {
    0% {
      box-shadow:
        0 0 5px var(--color-accent-primary),
        0 0 10px var(--color-accent-primary),
        0 0 15px var(--color-accent-primary);
    }
    50% {
      box-shadow:
        0 0 10px var(--color-accent-secondary),
        0 0 20px var(--color-accent-secondary),
        0 0 30px var(--color-accent-secondary);
    }
    100% {
      box-shadow:
        0 0 5px var(--color-accent-primary),
        0 0 10px var(--color-accent-primary),
        0 0 15px var(--color-accent-primary);
    }
  }

  /* ------------------ General Styling & Layout ------------------ */

  /* Centering the form and applying a subtle background to the page */
  .auth-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-bg-primary);
    background-image: var(--bg-noise), var(--bg-radial-gradient);
    background-size: cover;
    font-family: "Inter", sans-serif;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  /* The main card/container for the auth form */
  .auth-card {
    max-width: 450px;
    width: 100%;
    background-color: var(--color-bg-secondary);
    border-radius: 1.5rem;
    padding: 3rem;
    box-shadow: 0 10px 40px var(--color-shadow);
    border: 1px solid var(--color-border);
    backdrop-filter: blur(20px) saturate(1.5);
    position: relative;
    z-index: 10;
    animation: glowing-border 4s infinite alternate;
  }

  /* The form itself */
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Heading style */
  h1 {
    color: var(--color-text-primary);
    font-size: 2.5rem;
    font-weight: 800;
    text-align: center;
    text-shadow: 0 2px 10px var(--color-shadow);
  }

  /* Container for input fields */
  .fields {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* ------------------ Input Field Styling ------------------ */

  /* Targeting the input element directly to improve visibility */
  :global(input) {
    background-color: var(--color-bg-tertiary);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    color: var(--color-text-primary); /* Ensuring the input text is visible */
    padding: 1rem;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;
  }

  /* Placeholder text color */
  :global(input::placeholder) {
    color: var(--color-text-primary);
    opacity: 0.7;
  }

  /* Focus and hover effects for the input fields */
  :global(input:focus) {
    outline: none;
    border-color: var(--color-accent-primary);
    box-shadow: 0 0 0 2px var(--color-accent-secondary);
  }

  /* ------------------ Button & Toggle Styling ------------------ */

  /* Container for submit button and toggle text */
  .submit-and-toggle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  /* Primary submit button */
  .submit-button {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(
      90deg,
      var(--color-accent-primary) 0%,
      var(--color-accent-secondary) 100%
    );
    color: var(--color-text-primary);
    border: none;
    border-radius: 0.75rem;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      transform 0.3s ease-in-out,
      box-shadow 0.3s ease-in-out;
    box-shadow: 0 4px 20px -5px var(--color-accent-primary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .submit-button:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 8px 25px -5px var(--color-accent-secondary);
  }

  /* Text for toggling between login/register */
  .toggle-text {
    color: var(--color-text-secondary);
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* The actual toggle button link */
  .toggle-button {
    padding: 0;
    background: none;
    border: none;
    color: var(--color-accent-secondary);
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
    position: relative;
  }

  .toggle-button:hover {
    color: var(--color-accent-primary);
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  /* ------------------ Message Styling ------------------ */
  .message-container {
    text-align: center;
    min-height: 2rem;
  }

  .message {
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 0.9rem;
    opacity: 1;
    animation: fade-in 0.5s ease-in-out;
  }

  .error {
    background-color: rgba(220, 38, 38, 0.2);
    color: #f87171;
    border: 1px solid rgba(220, 38, 38, 0.4);
  }

  .success {
    background-color: rgba(34, 197, 94, 0.2);
    color: #4ade80;
    border: 1px solid rgba(34, 197, 94, 0.4);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 600px) {
    .auth-card {
      padding: 2rem;
      border-radius: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .fields {
      gap: 1rem;
    }

    .submit-button {
      font-size: 1rem;
    }
  }
</style>
