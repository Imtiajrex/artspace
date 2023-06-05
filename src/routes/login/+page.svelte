<script>
	import { goto } from '$app/navigation';

	// @ts-nocheck
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	let username = '';
	let password = '';
	let loading = false;
	const handleClick = async (e) => {
		loading = true;
		e.preventDefault();
		const res = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});
		if (res.status != 200) {
			loading = true;
			const body = await res.json();
			alert(body.message);
			return;
		}
		const body = await res.json();
		localStorage.setItem('user_id', body.user_id);
		loading = true;
		goto('/');
	};
</script>

<div class="wrapper">
	<form class="container" on:submit={handleClick}>
		<h1>Welcome back, Login to Artspace</h1>
		<Input label="Username" name="username" type="text" bind:value={username} />
		<Input label="Password" name="password" type="password" bind:value={password} />
		<Button text="Sign In" maxWidth="250px" {loading} />
		<br />
		<p>Don't have an account?<a href="/signup">Register</a></p>
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
		width: 60%;
		margin-top: 0;
	}
	h1 {
		color: white;
		font-weight: bold;
		text-align: center;
		margin-bottom: 3rem;
		font-size: 45px;
	}
	.a {
		color: var(--primary);
	}
	button {
		margin-inline: auto;
	}
</style>
