<script lang="ts">
	export let text = 'Click Me';
	export let onClick = () => {};
	export let outline = false;
	export let maxWidth = '350px';
	export let fontSize = '20px';
	export let link = '';
	export let Icon: any = null;
</script>

{#if link.length > 0}
	<a
		href={link}
		style={`max-width:${maxWidth};font-size:${fontSize}`}
		class={`button ${outline && 'outline'}`}
		on:click={onClick}
	>
		{text}
	</a>
{:else}
	<button
		style={`max-width:${maxWidth};font-size:${fontSize}`}
		class={`button ${outline && 'outline'}`}
		on:click={onClick}
	>
		{#if Icon}
			<span class="icon">
				<Icon size={20} />
			</span>
		{/if}
		{text}
	</button>
{/if}

<style>
	.button {
		width: 100%;
		border: none;
		background-color: var(--primary);
		padding: 20px;
		font-weight: bold;
		font-size: 20px;
		border-radius: 12px;
		cursor: pointer;
		transition: 0.1s ease-in-out;
		font-weight: bold;
		text-align: center;
		color: black;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.button:hover,
	.button:focus {
		transform: translate(0, -4px);
	}
	.button:active {
		scale: 0.95;
	}
	.outline {
		background-color: transparent;
		color: var(--primary);
		border: 2px solid var(--primary);
	}
	.outline:hover {
		background-color: var(--primary);
		color: black;
	}
	.icon {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
		border: 2px solid black;
		border-radius: 50%;
	}
</style>
