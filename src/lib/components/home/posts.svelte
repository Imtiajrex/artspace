<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import Card from './card.svelte';
	export let search;
	export let reload;
	let loading = true;

	let arts = [];
	let mounted = false;
	const getArts = async () => {
		loading = true;
		try {
			const res = await fetch('/api/arts/');
			if (res.status !== 200) throw new Error(res.statusText);
			const responseData = await res.json();
			arts = responseData;
		} catch (e) {
			console.log(e.message);
			alert(e.message);
		}
		loading = false;

		reload = false;
	};
	const searchArts = async () => {
		loading = true;
		try {
			const res = await fetch(`/api/arts/${search}`);
			if (res.status !== 200) throw new Error(res.statusText);
			const responseData = await res.json();
			arts = responseData;
		} catch (e) {
			console.log(e.message);
			alert(e.message);
		}
		loading = false;
	};
	$: {
		if (reload) {
			getArts();
		}
	}
	$: {
		if (mounted) {
			if (search && search.length > 0) searchArts();
			else getArts();
		}
	}
	onMount(() => {
		getArts();
		mounted = true;
	});
</script>

{#if loading}
	<div class="loading">
		<Circle color="var(--primary)" size={30} />
	</div>
{:else}
	<div class="posts container">
		{#each arts as art}
			<Card {...art} />
		{/each}
	</div>
{/if}

<style>
	:global(.loading) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 50vh;
	}
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
