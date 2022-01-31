<script>
  export let matrixWidth = 3;
  export let matrixHeight = 3;
</script>

<div>
  <input type="number" bind:value={matrixWidth} onclick="select()" />
  <span>x</span>
  <input type="number" bind:value={matrixHeight} onclick="select()" />
</div>

<style>
  input {
    width: 3em;
  }
</style>
