<script>
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';
	import Modal from '../modal.svelte';
	export let open = false;
	export let update = () => {};
	let username = '';
	let password = '';
	let role = '';
	let creating = false;
	const addAdmin = async (e) => {
		e.preventDefault();
		creating = true;
		const res = await fetch('/api/admin/manage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password,
				role
			})
		});
		if (res.status != 200) {
			const body = await res.json();
			alert(body.message);
			creating = false;
			return;
		}
		creating = false;
		username = '';
		password = '';
		role = '';
		update();
		open = false;
	};
</script>

<Modal bind:open>
	<h1>Create Admin</h1>
	<form method="post" on:submit={addAdmin}>
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
		<Button text="Create" maxWidth={'500px'} loading={creating} />
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
		margin: 20px 0;
	}
</style>
