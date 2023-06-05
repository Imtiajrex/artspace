<script>
	import { goto } from '$app/navigation';

	// @ts-nocheck
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	let username = '';
	let password = '';
	let email = '';
	let loading = false;
	const handleClick = async (e) => {
		loading = true;
		e.preventDefault();
		const res = await fetch('/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password,
				email
			})
		});
		if (res.status != 200) {
			const body = await res.json();

			loading = false;
			alert(body.message);
			return;
		}
		const body = await res.json();
		localStorage.setItem('user_id', body.user_id);

		loading = false;
		goto('/');
	};
</script>

<div class="wrapper">
	<form class="container" on:submit={handleClick}>
		<h1>Join Artspace</h1>
		<Input label="Username" name="username" type="text" bind:value={username} />
		<Input label="Email" name="email" type="email" bind:value={email} />
		<Input label="Password" name="password" type="password" bind:value={password} />
		<Button text="Sign up" maxWidth="250px" {loading} />
		<br />
		<p>Already have an account?<a href="/login">Login</a></p>
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
