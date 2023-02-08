<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';
	import Modal from '../modal.svelte';
	export let open = false;
	let username = '';
	let password = '';
	let role = '';
	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log('username: ', username);
	};
	const editAdmin = async (e) => {
		e.preventDefault();
	};
</script>

<Modal bind:open>
	<h1>Edit Admin</h1>
	<form method="put" on:submit={editAdmin}>
		<Input label="Username" bind:value={username} />
		<Input label="Password" type="password" bind:value={password} />
		<Select
			options={[
				{
					label: 'Admin',
					value: 'admin'
				},
				{
					label: 'User',
					value: 'user'
				}
			]}
			label="Role"
			bind:value={role}
		/>
		<Button text="Update" maxWidth={'500px'} onClick={handleSubmit} />
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
		margin: 20px 0;
	}
</style>
