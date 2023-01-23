<script>
	import '../app.css';
</script>

<div>
	<slot />
</div>

<style>
	div {
		background-color: var(--dark-bg);
		min-height: 100vh;
		padding-top: 20px;
	}
</style>
