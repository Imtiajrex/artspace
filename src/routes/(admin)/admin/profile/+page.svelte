<script>
	// @ts-nocheck

	import PageLinks from '$lib/components/admin/dashboard/page-links.svelte';
	import EditModal from '$lib/components/admin/profile/editModal.svelte';
	import Button from '$lib/components/button.svelte';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	let data = {};
	let loading = true;
	onMount(() => {
		getData();
	});
	const getData = async () => {
		loading = true;
		const res = await fetch('/api/admin/profile/15');
		data = await res.json();
		loading = false;
	};
	let editOpen = false;
</script>

<div class="container">
	<EditModal onEdit={getData} bind:open={editOpen} />
	<PageLinks />
	<div class="info ">
		{#if loading}
			<div class="loading-container">
				<Circle color="white" size={22} />
			</div>
		{:else}
			<div class="info-card">
				<h4>Username</h4>
				<h2>@{data.username}</h2>
			</div>
			<div class="info-card">
				<h4>Role</h4>
				<h2>{data.role}</h2>
			</div>
		{/if}
	</div>
	<Button text="Edit Profile" onClick={() => (editOpen = true)} />
</div>

<style>
	.info {
		display: flex;
		gap: 40px;
		margin: 60px 0;
	}
	h4 {
		font-size: 18px;
		font-weight: 400;
	}
	h2 {
		font-size: 25px;
		font-weight: 700;
		margin-top: 10px;
	}
</style>
