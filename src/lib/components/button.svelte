<script>
	export let text = 'Click Me';
	export let onClick = () => {};
</script>

<button on:click={onClick}>
	{text}
</button>

<style>
	button {
		width: 100%;
		border: none;
		background-color: var(--primary);
		padding: 20px;
		font-weight: bold;
		font-size: 20px;
		border-radius: 12px;
		cursor: pointer;
		transition: 0.1s ease-in-out;
	}
	button:hover,
	button:focus {
		transform: translate(0, -4px);
	}
	button:active {
		scale: 0.95;
	}
</style>
