<script>
	import Button from '$lib/components/button.svelte';
	export let page = '';
</script>

<div class="buttons">
	<Button
		maxWidth={'250px'}
		outline={page != 'admin'}
		link="/admin/manage-admins"
		text="Manage Admins"
	/>
	<Button
		maxWidth={'250px'}
		outline={page != 'posts'}
		link="/admin/moderate-posts"
		text="Moderate Posts"
	/>
</div>

<style>
	.buttons {
		margin-top: 40px;
		display: flex;
		gap: 20px;
	}
</style>
