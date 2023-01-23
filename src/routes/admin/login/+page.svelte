<script>
	// @ts-nocheck
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	let username = '';
	let password = '';
	const handleClick = (e) => {
		e.preventDefault();
		console.log(username, password);
	};
</script>

<div class="wrapper">
	<form class="container">
		<h1>Admin Sign In</h1>
		<Input label="Username" name="username" type="text" bind:value={username} />
		<Input label="Password" name="password" type="password" bind:value={password} />
		<Button text="Sign In" onClick={handleClick} />
	</form>
</div>

<style>
	.wrapper {
		min-height: 100vh;
		width: 100%;
		background-color: var(--dark-bg);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		max-width: 450px;
		width: 100%;
	}
	h1 {
		color: white;
		font-weight: bold;
		text-align: center;
		margin-bottom: 3rem;
		font-size: 45px;
	}
</style>
