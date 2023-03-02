<script>
	import Navbar from '$lib/components/admin/navbar.svelte';
	import '../../app.css';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!localStorage.getItem('token')) window.location.replace('/admin/login');
	});
</script>

<div>
	<Navbar />
	<slot />
</div>

<style>
	div {
		background-color: var(--dark-bg);
		min-height: 100vh;
		padding-top: 20px;
	}
</style>
