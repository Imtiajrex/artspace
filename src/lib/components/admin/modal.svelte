<script>
	import { IconX } from '@tabler/icons-svelte';

	export let open = false;
	export let size = '500px';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if open}
	<div class="modal">
		<div class="backdrop" on:click={() => (open = false)} />
		<div class="modal-content" style="max-width:{size}">
			<button on:click={() => (open = false)}>
				<IconX />
			</button>
			<slot />
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}
	.backdrop {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(25px);
		z-index: -10;
	}
	.modal-content {
		position: relative;
		background-color: var(--dark-bg);
		padding: 40px;
		border-radius: 7px;
		max-width: 500px;
		width: 100%;
	}
	button {
		position: absolute;
		top: 40px;
		right: 40px;
		background-color: transparent;
		border: none;
		cursor: pointer;
		color: white;
	}
	button:focus,
	button:hover {
		color: var(--primary);
	}
</style>
