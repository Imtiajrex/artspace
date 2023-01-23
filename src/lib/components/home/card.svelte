<script lang="ts">
	import { Star, MessageCircle } from 'tabler-icons-svelte';
	export let image: string;
	export let rating: number;
	export let comments: number;
	export let id: string;
</script>

<a href="/post/{id}" class="card">
	<div class="img-container">
		<img src={image} alt={'Post'} />
	</div>
	<div class="card-content">
		<span>
			<Star size={15} />
			{rating}
		</span>
		<span>
			<MessageCircle size={15} />
			{comments}
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
		background-color: var(--bg);
		animation: pulse 1s infinite;
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
