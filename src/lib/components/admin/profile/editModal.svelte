<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Modal from '../modal.svelte';
	export let open = false;
	let username = '';
	let password = '';
	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log('username: ', username);
	};
</script>

<Modal bind:open>
	<h1>Edit Profile</h1>
	<form>
		<Input label="Username" bind:value={username} />
		<Input label="Password" type="password" bind:value={password} />
		<Button text="Update" maxWidth={'500px'} onClick={handleSubmit} />
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
		margin: 20px 0;
	}
</style>
