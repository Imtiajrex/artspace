<script>
	// @ts-ignore
	import { IconSearch } from '@tabler/icons-svelte';
</script>

<div>
	<span>
		<IconSearch size={16} />
	</span>
	<input type="text" placeholder="Search For Arts" />
</div>

<style>
	div {
		max-width: 750px;
		width: 100%;
		background-color: var(--bg);
		border-radius: 65px;
		overflow: hidden;
		position: relative;
	}
	span {
		position: absolute;
		top: 50%;
		left: 20px;
		transform: translateY(-50%);
	}
	input {
		width: 100%;
		padding: 14px;
		border: none;
		padding-inline: 25px;
		padding-left: 45px;
		border-radius: 65px;
		background-color: var(--bg);
		color: var(--primary-text);
		font-size: 14px;
	}
</style>
