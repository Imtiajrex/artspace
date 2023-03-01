<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Modal from '../modal.svelte';
	export let open = false;
	export let onEdit = () => {};
	let username = '';
	let password = '';
	export let id = 15;
	let updating = false;
	const handleSubmit = async () => {
		updating = true;
		const res = await fetch(`/api/admin/profile/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});
		if (res.ok) {
			username = '';
			password = '';
			open = false;
			onEdit();
		} else {
			const body = await res.json();
			alert(body.message);
		}
		updating = false;
	};
</script>

<Modal bind:open>
	<h1>Edit Profile</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<Input label="Username" bind:value={username} />
		<Input label="Password" type="password" bind:value={password} />
		<Button text="Update" maxWidth={'500px'} loading={updating} />
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
		margin: 20px 0;
	}
</style>
