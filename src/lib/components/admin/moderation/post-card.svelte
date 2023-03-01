<script>
	// @ts-nocheck

	import ModerationBtn from './moderation-btn.svelte';

	export let art_id = 0;
	export let img = '';
	export let flagged = true;

	let status = 'pending';
	const approve = () => {
		changeStatus(1);
	};
	const decline = () => {
		changeStatus(0);
	};
	const changeStatus = async (action) => {
		const res = await fetch(`/api/admin/moderate/${art_id}`, {
			method: 'POST',
			body: JSON.stringify({
				id: art_id,
				status: action
			}),
			headers: {
				'Content-Type': 'application/json',
				'access-token': localStorage.getItem('token')
			}
		});
		console.log(res);

		flagged = Boolean(action);
		status = action ? 'approved' : 'declined';
	};
</script>

<div class="post-card">
	<img src={img} />
	<div class="btns">
		<ModerationBtn {status} onclick={approve} />
		<ModerationBtn {status} onclick={decline} approval={false} />
	</div>
</div>

<style>
	.post-card {
	}
	img {
		border-radius: 12px;
		object-fit: cover;
		width: 100%;
		height: 250px;
	}
	button {
		padding: 10px 20px;
		border-radius: 12px;
		border: none;
		margin: 10px;
	}
	.btns {
		display: flex;

		justify-content: center;
		align-items: center;
	}
</style>
