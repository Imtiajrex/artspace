<script>
	// @ts-nocheck

	import Modal from '../admin/modal.svelte';
	import Button from '../button.svelte';
	import Input from '../input.svelte';

	export let open = false;
	let uploading = false;
	let tag = '';
	let tags = [];
	const uploadArt = async () => {
		uploading = true;
		const data = {};
		const imgData = imgBase64.split(',');
		data['art'] = imgData[1];
		data['tags'] = tags;
		const res = await fetch('/api/art/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (res.status != 200) {
			const body = await res.json();
			alert(body.message);
		}
		uploading = false;
	};
	let fileInput;
	let files;
	let avatar;

	function getBase64(image) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
	}
</script>

<Modal bind:open>
	<h1>Share Your Art</h1>
	<form method="post" on:submit|preventDefault={uploadArt}>
		<div class="input-container">
			<label for={'upload'}> Your Art </label>
			{#if avatar}
				<img src={avatar} alt="Your Art" />
			{/if}
			<input
				class="hidden"
				id="upload"
				type="file"
				accept=".png,.jpg"
				bind:files
				bind:this={fileInput}
				on:change={() => getBase64(files[0])}
			/>
		</div>
		<Button
			text="Select Image"
			type="button"
			maxWidth={'500px'}
			outline
			onClick={() => fileInput.click()}
		/>
		<Input label="Tags" bind:value={tag} />
		<Button text="Upload" maxWidth={'500px'} loading={uploading} />
	</form>
</Modal>

<style>
	h1 {
		text-align: center;
		margin: 20px 0;
	}
	img {
		width: 250px;
		height: 250px;
		object-fit: cover;
		border-radius: 12px;
	}
	.input-container {
		display: flex;
		flex-direction: column;
		margin-top: 25px;
		margin-bottom: 25px;
	}
	label {
		margin-bottom: 0.5rem;
		font-size: 18px;
		font-weight: bold;
		color: var(--primary-text);
	}
	.hidden {
		display: none;
	}
</style>
