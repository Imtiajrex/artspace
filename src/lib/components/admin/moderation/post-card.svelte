<script>
	import { IconCheck, IconX } from '@tabler/icons-svelte';
	import ModerationBtn from './moderation-btn.svelte';

	export let id = 0;
	export let image = '';
	export let flagged = true;

	let status = 'pending';
</script>

<div class="post-card">
	<img src={image} />
	<div class="btns">
		<ModerationBtn bind:status />
		<ModerationBtn bind:status approval={false} />
	</div>
</div>

<style>
	.post-card {
	}
	img {
		border-radius: 12px;
		object-fit: cover;
		width: 100%;
		height: 250px;
	}
	button {
		padding: 10px 20px;
		border-radius: 12px;
		border: none;
		margin: 10px;
	}
	.btns {
		display: flex;

		justify-content: center;
		align-items: center;
	}
</style>
