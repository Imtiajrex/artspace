<script>
	import Card from './card.svelte';

	let posts = [
		{
			image:
				'https://plus.unsplash.com/premium_photo-1669752004585-7e5cfdcbee30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
			rating: 4.5,
			comments: 10,
			id: 'sdkfiow'
		},
		{
			image:
				'https://images.unsplash.com/photo-1578301978018-3005759f48f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
			rating: 5,
			comments: 10,
			id: 'sdkfiow'
		},
		{
			image:
				'https://images.unsplash.com/photo-1559102877-4a2cc0e37fce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
			rating: 5,
			comments: 10,
			id: 'sdkfiow'
		},
		{
			image:
				'https://images.unsplash.com/photo-1585644198527-05519fdeaf98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
			rating: 5,
			comments: 10,
			id: 'sdkfiow'
		}
	];
	posts = posts.concat(posts);
</script>

<div class="posts container">
	{#each posts as post}
		<Card {...post} />
	{/each}
</div>

<style>
	.posts {
		columns: 4;
		column-gap: 20px;
		margin-top: 20px;
	}
	@media screen and (max-width: 1200px) {
		.posts {
			columns: 3;
		}
	}
	@media screen and (max-width: 650px) {
		.posts {
			columns: 2;
		}
	}
	@media screen and (max-width: 450px) {
		.posts {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style>
