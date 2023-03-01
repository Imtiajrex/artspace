<script>
	// @ts-nocheck
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	let username = '';
	let password = '';
	let loading = false;
	const handleClick = async (e) => {
		loading = true;
		const res = await fetch('/api/admin/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});
		const body = await res.json();
		if (res.status != 200) {
			alert(body.message);
			return;
		}
		console.log(body);
		localStorage.setItem('token', body.token);
		loading = false;
		window.location.href = '/admin';
	};
</script>

<div class="wrapper">
	<form class="container" on:submit={handleClick}>
		<h1>Admin Sign In</h1>
		<Input label="Username" name="username" type="text" bind:value={username} />
		<Input label="Password" name="password" type="password" bind:value={password} />
		<Button text="Sign In" maxWidth="500px" {loading} />
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
	button {
		margin-inline: auto;
	}
</style>
