<script>
  let matrixWidth = 4;
  let matrixHeight = 4;
  let kernelWidth = 3;
  let kernelHeight = 3;
  let padding = 0;

  $: matrix = Array(matrixHeight)
    .fill(1)
    .map(() => Array(matrixWidth).fill(1));
  $: kernel = Array(kernelHeight)
    .fill(1)
    .map(() => Array(kernelWidth).fill(1));

  $: result = conv_2d(kernel, matrix, padding);

  function uniform_array(len, value) {
    let arr = new Array(len);
    for (let i = 0; i < len; ++i)
      arr[i] = Array.isArray(value) ? [...value] : value;
    return arr;
  }

  function conv_2d(kernel, array, padding = 0) {
    // source: https://stackoverflow.com/questions/64669531/2d-convolution-for-javascript-arrays
    let result = uniform_array(array.length, uniform_array(array[0].length, 0));
    let kRows = kernel.length;
    let kCols = kernel[0].length;
    let rows = array.length;
    let cols = array[0].length;
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
    return result;
  }
</script>

<main>
  <div class="container">
    <h5 style="grid-area: matrix-title">Matrix</h5>
    <h5 style="grid-area: kernel-title">Kernel</h5>
    <h5 style="grid-area: result-title">Result</h5>
    <div style="grid-area: matrix-size">
      <input
        type="number"
        bind:value={matrixWidth}
        style="width: 3em;"
        onclick="select()"
      />
      <span>x</span>
      <input
        type="number"
        bind:value={matrixHeight}
        style="width: 3em;"
        onclick="select()"
      />
    </div>
    <div style="grid-area: kernel-size">
      <input
        type="number"
        bind:value={kernelWidth}
        style="width: 3em;"
        onclick="select()"
      />
      <span>x</span>
      <input
        type="number"
        bind:value={kernelHeight}
        style="width: 3em;"
        onclick="select()"
      />
    </div>
    <div style="grid-area: result-size">{result[0].length}x{result.length}</div>
    <div style="grid-area: matrix">
      {#each matrix as row, i}
        <div
          style="display: flex; flex-direction: row; justify-content: center;"
        >
          {#each row as _, j}
            <input
              type="number"
              bind:value={matrix[i][j]}
              style="width: 3em;"
              onclick="select()"
            />
          {/each}
        </div>
      {/each}
    </div>
    <div style="grid-area: kernel">
      {#each kernel as row, i}
        <div
          style="display: flex; flex-direction: row; justify-content: center;"
        >
          {#each row as _, j}
            <input
              type="number"
              bind:value={kernel[i][j]}
              style="width: 3em;"
              onclick="select()"
            />
          {/each}
        </div>
      {/each}
    </div>
    <div style="grid-area: result">
      {#each result as row}
        <div
          style="display: flex; flex-direction: row; justify-content: center;"
        >
          {#each row as field}
            <input
              type="number"
              value={field}
              style="width: 3em;"
              onclick="select()"
              readonly="true"
            />
          {/each}
        </div>
      {/each}
    </div>
    <div style="grid-area: padding">
      <div>Padding</div>
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
    grid-gap: .5em;
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
