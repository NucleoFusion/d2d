<script lang="ts">
  import InputField from "../../components/inputField/inputField.svelte";

  var isLogin = true;

  let email: string, password: string, name: string, dob: string;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      email,
      password,
      name,
      dob,
    };

    console.log(data);

    const fetchUrl =
      "http://localhost:5555/auth/" + (isLogin ? "login" : "register");

    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        console.log(await response.json());
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>

<!-- TODO: Set up Validations for Register -->
<!-- TODO: Setup Backend Calls and Cookie object -->

<div class="auth">
  <form onsubmit={handleSubmit}>
    <h1>
      {#if isLogin}
        Login
      {:else}
        Register
      {/if}
    </h1>
    <div class={`fields ${isLogin ? "" : "signup"}`}>
      {#if isLogin}
        <div></div>
      {:else}
        <InputField
          bind:value={name}
          name="name"
          type="text"
          title="Display Name"
        />
      {/if}
      <InputField bind:value={email} name="email" type="email" title="Email" />
      <InputField
        bind:value={password}
        name="password"
        type="password"
        title="Password"
      />
      {#if isLogin}
        <div></div>
      {:else}
        <InputField
          bind:value={dob}
          name="dob"
          type="date"
          title="Date of Birth"
        />
      {/if}

      <span>
        {#if isLogin}
          Dont have an account?<button
            class="toggle-button"
            onclick={() => (isLogin = false)}>Sign up</button
          >
        {:else}
          Already have an account? <button
            class="toggle-button"
            onclick={() => (isLogin = true)}>Log in</button
          >
        {/if}
      </span>
    </div>
    <div class="submit">
      <button type="submit">
        {#if isLogin}
          Log In
        {:else}
          Sign Up
        {/if}
      </button>
    </div>
  </form>
</div>

<style>
  .auth {
    background-color: rgba(var(--card-blur-rgba));

    width: 25vw;
    height: 60vh;

    margin: 17vh 36.25vw;

    padding: 1.5vw;

    border-radius: 10px;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .auth > form {
    background-color: var(--card);

    width: 100%;
    height: 100%;

    border-radius: 10px;

    color: white;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 2fr 1fr;
  }

  .auth > form:has(.signup) {
    grid-template-rows: auto 3fr 1fr;
  }

  .fields {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;

    justify-content: center;
    align-items: center;
  }

  .submit {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    justify-content: center;
    align-items: center;
  }

  .submit > button {
    width: 10vw;
    height: 4vh;

    margin-left: 7.5vw;

    background-color: transparent;
    border: solid white 1px;
    border-radius: 10px;

    color: white;
    font-size: 1em;

    transition: all 0.3s ease;
  }

  .submit > button:hover {
    background-color: white;
    color: var(--bg);
    cursor: pointer;
  }

  .toggle-button {
    padding: 0.5vh 0.5vw;

    background-color: transparent;
    border: none;
    border-radius: 8px;

    color: white;
    font-size: 1em;

    text-decoration: underline;

    cursor: pointer;

    transition: all 0.3s ease;
  }

  .toggle-button:hover {
    background-color: rgb(0, 0, 0, 0.2);
  }
</style>
