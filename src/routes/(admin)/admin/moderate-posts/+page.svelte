<script>
	// @ts-nocheck

	import PageLinks from '$lib/components/admin/dashboard/page-links.svelte';
	import PostCard from '$lib/components/admin/moderation/post-card.svelte';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	let posts = [];

	let loading = false;
	onMount(() => {
		getPosts();
	});
	const getPosts = async () => {
		loading = true;
		try {
			const res = await fetch('/api/admin/moderate');
			if (res.status !== 200) throw new Error(res.statusText);
			const responseData = await res.json();
			console.log(responseData);
			posts = responseData;
		} catch (e) {
			console.log(e.message);
			alert(e.message);
		}
		loading = false;
	};
</script>

<div class="container">
	<PageLinks page="posts" />
	<div class="moderations">
		{#if loading}
			<div class="loader-container">
				<Circle size={25} color="white" />
			</div>
		{:else}
			{#each posts as post}
				<PostCard {...post} />
			{/each}
		{/if}
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
