<script>
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';
	import Modal from '../modal.svelte';
	export let open = false;
	let role = '';
	const addAdmin = async (e) => {
		e.preventDefault();
	};
</script>

<Modal bind:open>
	<h1>Create Admin</h1>
	<form method="post" on:submit={addAdmin}>
		<Input label="Username" />
		<Input label="Password" />
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
		<Button text="Create" maxWidth={'500px'} />
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
		margin: 20px 0;
	}
</style>
