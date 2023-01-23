<script>
	import Logo from '../logo.svelte';
	import SearchBar from '../search-bar.svelte';
	import User from './user.svelte';
</script>

<header class="container">
	<Logo />
	<SearchBar />
	<User />
</header>

<style>
	header {
		background-color: var(--dark-bg);
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		gap: 20px;
	}
</style>
