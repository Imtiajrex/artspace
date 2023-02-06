<script>
	import StatCard from '$lib/components/admin/dashboard/StatCard.svelte';
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Logo from '$lib/components/logo.svelte';
	import { IconMoodAngry, IconPaint, IconUser } from '@tabler/icons-svelte';
	let name = 'Imtiajrex';
</script>

<div class="navbar">
	<Logo />
	<IconUser />
</div>
<div class="container">
	<h1>Welcome {name}</h1>
	<p>Admin Dashboard</p>
</div>
<div class="card-container">
	<StatCard name="Users" />
	<StatCard name="Arts" numbers="500+" Icon={IconPaint} />
	<StatCard name="Moderation Needed" numbers="500+" Icon={IconMoodAngry} />
</div>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}
	.container {
		margin-top: 5vh;
	}
	h1 {
		margin-bottom: 20px;
		font-size: 40px;
		font-weight: regular;
	}
	p {
		color: #a1a1a1;
		font-size: 20px;
	}
	.card-container {
		padding: 20px;
		margin-top: 40px;
		display: flex;
		gap: 20px;
	}
</style>
