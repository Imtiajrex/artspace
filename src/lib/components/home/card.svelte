<script lang="ts">
	import { IconStar, IconMessageCircle } from '@tabler/icons-svelte';
	export let img: string;
	export let rating: number;
	export let feedbacks: number;
	export let art_id: string;
	let loaded = false;
</script>

<a href="/post/{art_id}" class="card">
	<div class="img-container" class:pulse={!loaded}>
		<img
			src={img}
			alt={'Post'}
			on:load={() => {
				loaded = true;
			}}
		/>
	</div>
	<div class="card-content">
		<span>
			<IconStar size={15} />
			{rating}
		</span>
		<span>
			<IconMessageCircle size={15} />
			{feedbacks}
		</span>
	</div>
</a>

<style>
	img {
		width: 100%;
		border-radius: 16px;
		object-fit: contain;
	}
	.img-container {
		width: 100%;
		border-radius: 16px;
		min-height: 80px;
	}
	.pulse {
		animation: pulse 1s infinite;
		background-color: var(--bg);
	}
	@keyframes pulse {
		0% {
			background-color: var(--bg);
		}
		50% {
			background-color: var(--dark-bg);
		}
		100% {
			background-color: var(--bg);
		}
	}
	.card {
		break-inside: avoid;
		cursor: pointer;
		margin-bottom: 20px;
		display: block;
		width: 100%;
		max-width: 350px;
		transition: 0.2s ease-in-out;
	}
	.card:hover {
		transform: scale(1.01) rotate(0.5deg);
	}
	.card-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
	}
	span {
		display: flex;
		align-items: center;
		font-size: 12px;
		gap: 5px;
		color: var(--primary);
	}
</style>
