<script>
  export let matrixWidth = 3;
  export let matrixHeight = 3;
</script>

<div>
  <input type="number" min="1" bind:value={matrixWidth} onclick="select()" />
  <span>&times;</span>
  <input type="number" min="1" bind:value={matrixHeight} onclick="select()" />
</div>

<style>
  input {
    width: 3em;
  }
</style>
