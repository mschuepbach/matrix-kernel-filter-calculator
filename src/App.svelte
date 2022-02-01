<script>
  import MatrixSizeInput from "./MatrixSizeInput.svelte";
  import Matrix from "./Matrix.svelte";

  let matrixWidth = 4;
  let matrixHeight = 4;
  let kernelWidth = 3;
  let kernelHeight = 3;
  let padding = 0;
  let addPadding = true;

  $: matrix = initMatrix(matrixWidth, matrixHeight, 1);
  $: kernel = initMatrix(kernelWidth, kernelHeight, 1);
  $: result = applyKernelFilter(matrix, kernel, addPadding, padding);

  function initMatrix(width, height, value) {
    return width > 0 && height > 0
      ? Array(Math.floor(height))
          .fill(value)
          .map(() => Array(Math.floor(width)).fill(value))
      : [[]];
  }

  function applyKernelFilter(matrix, kernel, addPadding, padding = 0) {
    let kernelHeight = kernel.length;
    let kernelWidth = kernel[0].length;
    let matrixHeight = matrix.length;
    let matrixWidth = matrix[0].length;
    let result = initMatrix(matrixWidth, matrixHeight, 0);
    let kernelCenterX = Math.floor(kernelWidth / 2);
    let kernelCenterY = Math.floor(kernelHeight / 2);

    for (let i = 0; i < matrixHeight; i++) {
      for (let j = 0; j < matrixWidth; j++) {
        for (let m = 0; m < kernelHeight; m++) {
          for (let n = 0; n < kernelWidth; n++) {
            let ii = i + (m - kernelCenterY);
            let jj = j + (n - kernelCenterX);
            if (ii >= 0 && ii < matrixHeight && jj >= 0 && jj < matrixWidth) {
              result[i][j] += matrix[ii][jj] * kernel[m][n];
            } else {
              result[i][j] += padding * kernel[m][n];
            }
          }
        }
      }
    }

    if (!addPadding && kernelCenterX > 0 && kernelCenterY > 0)
      result =
        kernelHeight >= matrixHeight || kernelWidth >= matrixWidth
          ? [[]]
          : result
              .slice(kernelCenterY, -kernelCenterY)
              .map((r) => r.slice(kernelCenterX, -kernelCenterX));

    return result;
  }
</script>

<main>
  <div class="container">
    <h5 style="grid-area: matrix-title">Matrix</h5>
    <h5 style="grid-area: kernel-title">Kernel</h5>
    <h5 style="grid-area: result-title">Result</h5>
    <div style="grid-area: matrix-size">
      <MatrixSizeInput bind:matrixWidth bind:matrixHeight />
    </div>
    <div style="grid-area: kernel-size">
      <MatrixSizeInput
        bind:matrixWidth={kernelWidth}
        bind:matrixHeight={kernelHeight}
      />
    </div>
    <div style="grid-area: result-size">{result[0].length}x{result.length}</div>
    <div style="grid-area: matrix"><Matrix bind:matrix /></div>
    <div style="grid-area: kernel"><Matrix bind:matrix={kernel} /></div>
    <div style="grid-area: result">
      <Matrix matrix={result} readonly="true" />
    </div>
    <div style="grid-area: padding">
      <label>
        <input type="checkbox" bind:checked={addPadding} />
        Padding
      </label>
      <div>
        <input
          type="number"
          bind:value={padding}
          style="width: 3em;"
          onclick="select()"
        />
      </div>
    </div>
  </div>
</main>

<style>
  main {
    text-align: center;
    margin: 0 auto;
  }

  h5 {
    margin: 1em 0 0;
  }

  .container {
    display: grid;
    grid-template-areas:
      "matrix-title kernel-title result-title"
      "matrix-size kernel-size result-size"
      "matrix kernel result"
      "padding padding padding";
    grid-gap: 0.5em;
    align-items: center;
  }

  @media (max-width: 960px) {
    .container {
      grid-template-areas:
        "matrix-title"
        "matrix-size"
        "matrix"
        "kernel-title"
        "kernel-size"
        "kernel"
        "result-title"
        "result-size"
        "result"
        "padding";
    }
  }
</style>
