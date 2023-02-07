<script>
	import PageLinks from '$lib/components/admin/dashboard/page-links.svelte';
	import StatCard from '$lib/components/admin/dashboard/StatCard.svelte';
	import Button from '$lib/components/button.svelte';
	import { IconMoodAngry, IconPaint, IconUser } from '@tabler/icons-svelte';
	let name = 'Imtiajrex';
</script>

<div class="container">
	<h1>Welcome {name}</h1>
	<p>Admin Dashboard</p>
	<div class="card-container">
		<StatCard name="Users" />
		<StatCard name="Arts" numbers="500+" Icon={IconPaint} />
		<StatCard name="Moderation Needed" numbers="500+" Icon={IconMoodAngry} />
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
