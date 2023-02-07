<script>
	import { IconUser } from '@tabler/icons-svelte';

	import Logo from '../logo.svelte';
</script>

<div class="navbar">
	<Logo link="/admin" />
	<a href="/admin/profile"> <IconUser /></a>
</div>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;

		padding: 20px;
		max-width: 1400px;
		width: 100%;
		margin-inline: auto;
	}
</style>
