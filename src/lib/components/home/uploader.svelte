<script>
	// @ts-nocheck

	import Modal from '../admin/modal.svelte';
	import Button from '../button.svelte';
	import Input from '../input.svelte';

	export let open = false;
	export let reload;
	let uploading = false;
	let tag = '';
	let tags = [];
	const uploadArt = async () => {
		uploading = true;
		const data = {};
		data['art'] = avatar;
		data['tags'] = tags;
		const res = await fetch('/api/arts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (res.status != 200) {
			const body = await res.json();
			alert(body.message);
		} else {
			alert('Shared Your Art Successfully');
			avatar = '';
			tags = [];
			files = [];
		}

		uploading = false;
		open = false;
		reload = true;
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
	const handleTags = () => {
		if (!tags.some((t) => t == tag)) {
			tags = [...tags, tag];
		} else {
			alert('Already has same tag');
		}

		tag = '';
	};
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
				accept=".png,.jpg,.webp"
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
		<form on:submit|preventDefault={handleTags}>
			<Input label="Tags" bind:value={tag} />
			<div class="tags">
				{#each tags as tag}
					<button
						type="button"
						on:click={() => {
							tags = tags.filter((t) => t != tag);
						}}
					>
						{tag}
					</button>
				{/each}
			</div>
		</form>
		<Button text="Upload" maxWidth={'500px'} loading={uploading} />
	</form>
</Modal>

<style>
	.tags {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		margin: 20px 0;
	}
	button {
		padding: 10px 25px;
		background-color: var(--bg);
		border-radius: 25px;
		color: white;
		cursor: pointer;
	}
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
