<script>
	import { IconPlus } from '@tabler/icons-svelte';
	import Logo from '../logo.svelte';
	import SearchBar from '../search-bar.svelte';
	import Uploader from './uploader.svelte';
	import User from './user.svelte';
	let uploader = false;
	const openUploader = () => {
		uploader = true;
	};
</script>

<header class="container">
	<Logo />
	<SearchBar />
	<div>
		<button on:click={openUploader}>
			<IconPlus size={20} />
		</button>
		<User />
	</div>
</header>

<Uploader
	bind:open={uploader}
	on:close={() => {
		uploader = false;
	}}
/>

<style>
	header {
		background-color: var(--dark-bg);
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		gap: 20px;
	}
	div {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	button {
		background-color: var(--primary);
		border: none;
		cursor: pointer;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
	}
</style>
