<script>
	import PageLinks from '$lib/components/admin/dashboard/page-links.svelte';
	import PostCard from '$lib/components/admin/moderation/post-card.svelte';
	let posts = [
		{
			id: 1,
			title: 'Post 1',
			image: 'https://source.unsplash.com/random',
			flagged: true
		},
		{
			id: 1,
			title: 'Post 1',
			image: 'https://source.unsplash.com/random',
			flagged: true
		},
		{
			id: 1,
			title: 'Post 1',
			image: 'https://source.unsplash.com/random',
			flagged: true
		},
		{
			id: 1,
			title: 'Post 1',
			image: 'https://source.unsplash.com/random',
			flagged: true
		},
		{
			id: 1,
			title: 'Post 1',
			image: 'https://source.unsplash.com/random',
			flagged: true
		}
	];
</script>

<div class="container">
	<PageLinks page="posts" />
	<div class="moderations">
		{#each posts as post}
			<PostCard {...post} />
		{/each}
	</div>
</div>

<style>
	.moderations {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
		margin-top: 40px;
	}
</style>
