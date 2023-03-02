<script>
	import { IconLogout, IconUser } from '@tabler/icons-svelte';

	import Logo from '../logo.svelte';
	const logout = () => {
		localStorage.removeItem('token');
		window.location.href = '/admin/login';
	};
</script>

<div class="navbar">
	<Logo link="/admin" />
	<div class="right">
		<a href="#" on:click={logout}> <IconLogout /></a>
		<a href="/admin/profile"> <IconUser /></a>
	</div>
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
	.right {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 10px;
	}
</style>
