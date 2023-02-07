<script>
	import Button from '$lib/components/button.svelte';
	import { Icon123, IconUser } from '@tabler/icons-svelte';
	export let Icon = IconUser;
	export let name = 'Users';
	export let numbers = '100+';
</script>

<div class="card">
	<div class="icon">
		<Icon color="#111" />
	</div>
	<div>
		<h3>{numbers}</h3>
		<p>{name}</p>
	</div>
</div>

<style>
	.card {
		display: flex;
		padding: 20px;
		width: max-content;
		border-radius: 14px;
		background: var(--bg);
		min-width: 220px;
		align-items: center;
	}
	.icon {
		margin-right: 15px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: var(--primary);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	h3 {
		font-size: 25px;
		font-weight: bold;
	}
	p {
		font-size: 15px;
		color: #a1a1a1;
	}
</style>
