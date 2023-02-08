<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';
	import Modal from '../modal.svelte';
	export let open = false;
	export let id = '';
	let username = '';
	let password = '';
	let role = '';
	let gettingData = false;
	let updating = false;
	export let update = () => {};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		editAdmin();
	};
	const editAdmin = async () => {
		if (id == '') return;

		updating = true;
		const res = await fetch(`/api/admin/manage/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password,
				role
			})
		});
		id = '';
		if (res.status != 200) {
			const body = await res.json();
			alert(body.message);
			updating = false;
			return;
		}
		update();
		username = '';
		password = '';
		role = '';
		updating = false;
		open = false;
	};
	const getAdminData = async () => {
		console.log('ran');
		once = true;
		if (typeof id != 'number') {
			alert('No id provided');
			open = false;
			gettingData = false;
			return;
		}
		gettingData = true;
		const res = await fetch('/api/admin/manage/' + id);
		const data = await res.json();
		if (data.length === 0) {
			alert('No admin found with that id');
			open = false;
			gettingData = false;
			return;
		}
		username = data[0].username;
		role = data[0].role;
		gettingData = false;
		console.log(gettingData, updating);
	};
	let once = false;
	$: {
		if (open) {
			if (!once) getAdminData();
		} else {
			once = false;
		}
	}
</script>

<Modal bind:open>
	<h1>Edit Admin</h1>
	<form method="put" on:submit={editAdmin}>
		<Input disabled={gettingData} label="Username" bind:value={username} />
		<Input disabled={gettingData} label="Password" type="password" bind:value={password} />
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
			disabled={gettingData}
		/>
		<Button
			loading={updating || gettingData}
			text="Update"
			maxWidth={'500px'}
			onClick={handleSubmit}
		/>
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
		margin: 20px 0;
	}
</style>
