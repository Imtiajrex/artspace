<script>
	import Navbar from '$lib/components/admin/navbar.svelte';
	import '../../app.css';
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
