<script>
	// @ts-nocheck

	import PageLinks from '$lib/components/admin/dashboard/page-links.svelte';
	import StatCard from '$lib/components/admin/dashboard/StatCard.svelte';
	import Button from '$lib/components/button.svelte';
	import { IconMoodAngry, IconPaint, IconUser } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	let name = 'Imtiajrex';

	let loading = true;
	onMount(() => {
		getData();
	});
	let data = {};
	const getData = async () => {
		loading = true;
		const token = localStorage.getItem('token');
		const res = await fetch('/api/admin/dashboard', {
			headers: {
				'access-token': token
			}
		});
		data = await res.json();
		loading = false;
	};
</script>

<div class="container">
	<h1>Welcome {name}</h1>
	<p>Admin Dashboard</p>
	<div class="card-container">
		<StatCard name="Users" numbers={data.users} />
		<StatCard name="Arts" numbers={data.arts} Icon={IconPaint} />
		<StatCard name="Moderation Needed" numbers={data.moderation} Icon={IconMoodAngry} />
	</div>
	<PageLinks />
</div>

<style>
	.container {
		margin-top: 5vh;
	}
	h1 {
		margin-bottom: 20px;
		font-size: 40px;
		font-weight: 400;
	}
	p {
		color: #a1a1a1;
		font-size: 20px;
	}
	.card-container {
		margin-top: 40px;
		display: flex;
		gap: 20px;
	}
</style>
