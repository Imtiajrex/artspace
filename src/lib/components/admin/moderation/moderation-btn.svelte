<script>
	import { IconCheck, IconX } from '@tabler/icons-svelte';

	export let status = 'pending';
	export let approval = true;
	let Icon = approval ? IconCheck : IconX;
	let color = approval ? '#42BCAD' : '#D4155A';
	let text = approval ? 'Approve' : 'Decline';
	$: if (status != 'pending') text += 'd';
</script>

{#if status == 'pending' || (approval && status == 'approved') || (!approval && status == 'declined')}
	<button
		on:click={() => {
			status = approval ? 'approved' : 'declined';
		}}
		style="color:{color};font-size:{status != 'pending' ? '20px' : '14px'};"
		class={status == 'approved' || status == 'declined' ? 'active' : ''}
	>
		<div style="background-color:{color};{status != 'pending' ? 'margin-bottom:0;' : ''}">
			<Icon size={30} />
		</div>
		{text}
	</button>
{/if}

<style>
	button {
		border-radius: 12px;
		border: none;
		background-color: transparent;
		margin: 10px;
		cursor: pointer;
		transition: 0.15s ease-in-out;
		font-weight: 700;
	}
	button:hover,
	button:focus {
		filter: brightness(1.1);
	}
	button:active {
		filter: brightness(0.9);
	}
	div {
		margin-bottom: 10px;
		width: 50px;
		height: 50px;
		display: grid;
		border-radius: 50%;
		color: black;
		place-items: center;
	}
	.active {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-inline: auto;
		gap: 15px;
	}
</style>
