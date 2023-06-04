<script>
	// @ts-nocheck
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	let username = '';
	let password = '';
	let email = '';
	const handleClick = async (e) => {
		e.preventDefault();
		const res = await fetch('/api/login', {
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
			alert(body.message);
			return;
		}
		window.location.href = '/login';
	};
</script>

<div class="wrapper">
	<form class="container" on:submit={handleClick}>
		<h1>Welcome back, Login to Artspace</h1>
		<Input label="Username" name="username" type="text" bind:value={username} />
		<Input label="Email" name="email" type="email" bind:value={email} />
		<Input label="Password" name="password" type="password" bind:value={password} />
		<Button text="Sign In" maxWidth="250px" />
		<br>
		<p>Don't have an account?<a href="signup">Register</a></p>
	</form>
	<img src="BG image.png" alt="">
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
		justify-content: left;
		margin-top:0;
		margin-right: 20px;
		
	}
	.img{
        width: 40%;


	}
	h1 {
		color: white;
		font-weight: bold;
		text-align: center;
		margin-bottom: 3rem;
		font-size: 45px;
	}
	.a{
		color:var(--primary);
	}
	button {
		margin-inline: auto;
	}
</style>