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
  $: result = conv_2d(kernel, matrix, addPadding, padding);

  function initMatrix(width, height, value) {
    return width > 0 && height > 0
      ? Array(Math.floor(height))
          .fill(value)
          .map(() => Array(Math.floor(width)).fill(value))
      : [[]];
  }

  function conv_2d(kernel, array, addPadding, padding = 0) {
    // source: https://stackoverflow.com/questions/64669531/2d-convolution-for-javascript-arrays
    let kRows = kernel.length;
    let kCols = kernel[0].length;
    let rows = array.length;
    let cols = array[0].length;
    let result = initMatrix(cols, rows, 0);
    // find center position of kernel (half of kernel size)
    let kCenterX = Math.floor(kCols / 2);
    let kCenterY = Math.floor(kRows / 2);

    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        for (let m = 0; m < kRows; ++m) {
          for (let n = 0; n < kCols; ++n) {
            // index of input signal, used for checking boundary
            let ii = i + (m - kCenterY);
            let jj = j + (n - kCenterX);
            // ignore input samples which are out of bound
            if (ii >= 0 && ii < rows && jj >= 0 && jj < cols) {
              result[i][j] += array[ii][jj] * kernel[m][n];
            } else {
              result[i][j] += padding * kernel[m][n];
            }
          }
        }
      }
    }

    if (!addPadding && kCenterX > 0 && kCenterY > 0)
      result =
        kRows >= rows || kCols >= cols
          ? [[]]
          : result
              .slice(kCenterY, -kCenterY)
              .map((r) => r.slice(kCenterX, -kCenterX));

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
