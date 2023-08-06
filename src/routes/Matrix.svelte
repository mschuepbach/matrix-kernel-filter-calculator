<script>
	export let matrix = [[]];
	export let readonly = false;
</script>

<div>
	{#each matrix as row, i}
		<div class="row">
			{#each row as _, j}
				<input type="number" bind:value={matrix[i][j]} onclick="select()" {readonly} />
			{/each}
		</div>
	{/each}
</div>

<style>
	input {
		width: 3em;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
