<script>
	import Header from '$lib/components/home/header.svelte';
	import Posts from '$lib/components/home/posts.svelte';
	let search = '';
	let reload = false;
</script>

<Header bind:search bind:reload />
<Posts bind:search bind:reload />
