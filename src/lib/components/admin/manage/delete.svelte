<script>
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Modal from '../modal.svelte';
	export let open = false;
	const deleteAdmin = async () => {};
</script>

<Modal bind:open size={'650px'}>
	<h1>Delete Admin</h1>
	<p>Are you sure you want to delete this admin?</p>
	<div class="btns">
		<Button
			text="Cancel"
			maxWidth="200px"
			style="background-color:#222222;color:white;padding:5px;font-size:18px;"
		/>
		<Button text="Delete" maxWidth="200px" style="background-color:#D4155A;" />
	</div>
</Modal>

<style>
	.btns {
		display: flex;
		gap: 20px;
		margin-top: 40px;
		justify-content: flex-end;
	}
	p {
		margin: 20px 0;
	}
</style>
