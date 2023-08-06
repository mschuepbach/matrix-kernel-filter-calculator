<script>
	import github from '$lib/images/github.svg';
	import { ThemeWrapper } from 'svelte-themer';
	import ThemeToggle from './ThemeToggle.svelte';
	import './styles.css';
	import { themes } from './themes';
</script>

<ThemeWrapper {themes} key="kernel-filter-calculator__theme">
	<div class="container">
		<header><h1>Matrix Kernel Filter Calculator</h1></header>
		<main>
			<slot />
		</main>
		<footer>
			<div class="left"><ThemeToggle /></div>
			<div class="center">
				<a
					href="https://github.com/mschuepbach/matrix-kernel-filter-calculator"
					target="_blank"
					title="GitHub Repository"
				>
					<img src={github} alt="GitHub Repository" width="32px" />
				</a>
			</div>
			<div class="right" />
		</footer>
	</div>
</ThemeWrapper>

<style>
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
		flex-grow: 1;
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
