<script lang="ts">
  let { type, title, name, value = $bindable() } = $props();

  let localVal: string;
</script>

<div class="form-input-div">
  <input
    {type}
    {name}
    placeholder={title}
    bind:value={localVal}
    onchange={() => (value = localVal)}
    class="form-input"
    id={name}
  />
  <label for={name}>{title}</label>
</div>

<style>
  .form-input {
    border-radius: 5px;
    border: solid white 1px;

    height: 4vh;
    width: 20vw;

    background-color: transparent;
    color: white;
  }

  .form-input-div {
    position: relative;
  }

  .form-input::placeholder {
    opacity: 0;
  }

  .form-input-div label {
    position: absolute;
    top: 0.7rem;
    left: 3.5rem;

    pointer-events: none;

    padding: 0 0.5rem;

    font-size: 1rem;

    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;

    background-color: var(--card);
  }

  .form-input:focus ~ label,
  .form-input:not(:placeholder-shown) ~ label {
    top: -0.6rem;
    font-size: 0.8rem;
  }
</style>
