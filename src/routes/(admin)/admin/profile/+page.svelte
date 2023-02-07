<script>
	import PageLinks from '$lib/components/admin/dashboard/page-links.svelte';
	import Button from '$lib/components/button.svelte';

	let username = 'imtiajrex';
	let role = 'Moderator';
</script>

<div class="container">
	<PageLinks />
	<div class="info ">
		<div class="info-card">
			<h4>Username</h4>
			<h2>@{username}</h2>
		</div>
		<div class="info-card">
			<h4>Role</h4>
			<h2>{role}</h2>
		</div>
	</div>
	<Button text="Edit Profile" />
</div>

<style>
	.info {
		display: flex;
		gap: 40px;
		margin: 60px 0;
	}
	h4 {
		font-size: 18px;
		font-weight: 400;
	}
	h2 {
		font-size: 25px;
		font-weight: 700;
		margin-top: 10px;
	}
</style>
