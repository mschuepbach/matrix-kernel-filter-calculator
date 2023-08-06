<script>
  import ThemeWrapper from "./../node_modules/svelte-themer/components/ThemeWrapper.svelte";
  import Matrix from "./Matrix.svelte";
  import MatrixSizeInput from "./MatrixSizeInput.svelte";
  import { themes } from "./themes";
  import ThemeToggle from "./ThemeToggle.svelte";

  let matrixWidth = 5;
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

<ThemeWrapper {themes} key="kernel-filter-calculator__theme">
  <div class="container">
    <header><h1>Matrix Kernel Filter Calculator</h1></header>
    <main>
      <h5 style="grid-area: matrix-title">Matrix</h5>
      <h5 style="grid-area: kernel-title">Kernel</h5>
      <h5 style="grid-area: result-title">Result</h5>
      <div style="grid-area: matrix-size" data-test="matrix-size">
        <MatrixSizeInput bind:matrixWidth bind:matrixHeight />
      </div>
      <div style="grid-area: kernel-size" data-test="kernel-size">
        <MatrixSizeInput
          bind:matrixWidth={kernelWidth}
          bind:matrixHeight={kernelHeight}
        />
      </div>
      <div style="grid-area: result-size">
        {result[0].length} &times; {result.length}
      </div>
      <div style="grid-area: matrix" data-test="matrix">
        <Matrix bind:matrix />
      </div>
      <div style="grid-area: kernel" data-test="kernel">
        <Matrix bind:matrix={kernel} />
      </div>
      <div style="grid-area: result" data-test="result">
        <Matrix matrix={result} readonly="true" />
      </div>
      <div style="grid-area: padding">
        <label>
          <input
            type="checkbox"
            bind:checked={addPadding}
            data-test="padding"
          />
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
    </main>
    <footer>
      <div class="left"><ThemeToggle /></div>
      <div class="center">
        <a
          href="https://github.com/mschuepbach/matrix-kernel-filter-calculator"
          target="_blank"
          title="GitHub Repository"
        >
          <img src="./GitHub-Mark.svg" alt="GitHub Repository" width="32px" />
        </a>
      </div>
      <div class="right" />
    </footer>
  </div>
</ThemeWrapper>

<style>
  :global(html) {
    background-color: var(--theme-colors-background, initial);
    color: var(--theme-colors-text, initial);
  }

  :global(input) {
    color: var(--theme-colors-text, initial);
    border-color: var(--theme-colors-input-border, initial);
    background-color: var(--theme-colors-input-background, initial);
  }

  :global(button) {
    color: var(--theme-colors-text, initial);
  }

  h5 {
    margin: 1em 0 0;
  }

  .container {
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  header {
    margin-bottom: 1em;
  }

  main {
    display: grid;
    margin-bottom: auto;
    grid-template-areas:
      "matrix-title kernel-title result-title"
      "matrix-size kernel-size result-size"
      "matrix kernel result"
      "padding padding padding";
    grid-gap: 0.8em;
    align-items: center;
  }

  @media (max-width: 960px) {
    main {
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

  footer {
    display: flex;
    margin-top: 1em;
    text-align: left;
  }

  .left,
  .right {
    flex: 1;
  }
</style>
