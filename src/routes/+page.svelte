<script>
	import Header from '$lib/components/home/header.svelte';
	import Posts from '$lib/components/home/posts.svelte';
	let search = '';
</script>

<Header bind:search />
<Posts bind:search />
