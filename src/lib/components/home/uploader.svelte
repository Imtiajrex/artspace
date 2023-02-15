<script>
	import Modal from '../admin/modal.svelte';
	import Button from '../button.svelte';
	import Input from '../input.svelte';

	// @ts-nocheck

	export let open = false;
	let uploading = false;
	let tag = '';
	let tags = [];
	let file;
	const uploadArt = async () => {
		uploading = true;
		const res = await fetch('/api/art/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: 'test',
				description: 'test',
				tags: ['test'],
				file: 'test'
			})
		});
		console.log(res);
		if (res.status != 200) {
			const body = await res.json();
			console.log(body);
			alert(body.message);
			uploading = false;
			return;
		}
		uploading = false;
	};
</script>

<Modal bind:open>
	<h1>Share Your Art</h1>
	<form method="post" on:submit={uploadArt}>
		<Input label="Your Art" type="file" />
		<Input label="Tags" bind:value={tag} />
		<Button text="Upload" maxWidth={'500px'} loading={uploading} />
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
		margin: 20px 0;
	}
</style>
