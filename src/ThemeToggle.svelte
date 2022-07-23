<script>
  import { getContext } from "svelte";
  let { toggle, current } = getContext("theme");
</script>

<button on:click={toggle} title="Toggle Theme" data-test="toggle-theme">
  <slot>{$current}</slot>
</button>

<style>
  button {
    border: none;
    background: none;
    font-weight: 600;
    cursor: pointer;
  }
</style>
