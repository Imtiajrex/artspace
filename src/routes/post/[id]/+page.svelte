<script>
	//@ts-nocheck
	import Header from '$lib/components/home/header.svelte';
	import {
		IconChevronDown,
		IconChevronUp,
		IconStar,
		IconMessageCircle
	} from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	export let data;
	let post;
	let loading;
	const getPost = async () => {
		loading = true;
		let res = await fetch('/api/art/' + data.id);
		const value = await res.json();
		post = value.post;
		tags = value.tags;
		loading = false;
		console.log(post);
	};
	onMount(() => {
		getPost();
		getFeedbacks();
		getRatings();
	});
	const getFeedbacks = async () => {
		let res = await fetch('/api/comments/' + data.id);
		const value = await res.json();
		feedbacks = value;
		console.log(feedbacks);
	};
	const getRatings = async () => {
		let res = await fetch('/api/ratings/' + data.id);
		const value = await res.json();
		ratings = value;
		const myRating = ratings.find((rating) => {
			return rating.user_id == localStorage.getItem('user_id');
		});
		if (myRating) {
			rating = myRating.rating;
		}
		console.log(ratings);
	};
	let username = 'username';
	let rating = 0;
	let comments = 30;
	let tags = [];
	let feedbacks = [];
	let ratings = [];

	let showcomments = false;

	let commentsIconColor = '#D9D9D9';

	function togglecomments() {
		showcomments = !showcomments;
		if (showcomments) {
			commentsIconColor = '#EA8C58';
		} else {
			commentsIconColor = '#D9D9D9';
		}
	}

	let showratings = false;

	let starIconColor = '#D9D9D9';

	function toggleratings() {
		showratings = !showratings;
		if (showratings) {
			starIconColor = '#EA8C58';
		} else {
			starIconColor = '#D9D9D9';
		}
	}
	const giveRating = async (rating) => {
		const user_id = localStorage.getItem('user_id');
		let res = await fetch('/api/ratings/' + data.id, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				rating: rating,
				user_id: user_id,
				art_id: data.id
			})
		});
		await res.json();
		getRatings();
	};
	const giveFeedback = async (rating) => {
		const user_id = localStorage.getItem('user_id');
		let res = await fetch('/api/comments/' + data.id, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				feedback,
				user_id: user_id
			})
		});
		await res.json();
		getFeedbacks();

		feedback = '';
	};
	function setRating(newRating) {
		if (newRating === rating) {
			rating = 0;
		} else {
			rating = newRating;
		}
		giveRating(rating);
	}
	let feedback = '';
</script>

<Header />
{#if loading}
	<div class="loading">
		<Circle color="var(--primary)" size={30} />
	</div>
{:else}
	<div class="allContainer">
		<div class="wrapper">
			<div class="pcontainer">
				<div class="post">
					<div>
						<img src={post?.img} alt="art" />
					</div>
					<div class="stars">
						<span class="star" on:click={() => setRating(1)}>{rating >= 1 ? '★' : '☆'}</span>
						<span class="star" on:click={() => setRating(2)}>{rating >= 2 ? '★' : '☆'}</span>
						<span class="star" on:click={() => setRating(3)}>{rating >= 3 ? '★' : '☆'}</span>
						<span class="star" on:click={() => setRating(4)}>{rating >= 4 ? '★' : '☆'}</span>
						<span class="star" on:click={() => setRating(5)}>{rating >= 5 ? '★' : '☆'}</span>
					</div>
				</div>
			</div>
			<div class="btns">
				<div>
					<button class="btn" on:click={toggleratings}>
						<IconStar size={25} color={starIconColor} />
						<a class="btn-text">
							{ratings.length}
						</a>
					</button>
				</div>
				<div>
					<button class="btn" on:click={togglecomments}>
						<span><IconMessageCircle size={25} color={commentsIconColor} /></span>
						<a class="btn-text">
							{feedbacks.length}
						</a>
					</button>
				</div>
			</div>
		</div>

		<div class="tags">
			<h1>Tags</h1>
			<div class="tags-grid">
				{#each tags as tag}
					<div class="tag">{tag.tag}</div>
				{/each}
			</div>
		</div>
		<div class="comments {showcomments ? 'show' : ''}">
			<h1>Feedbacks</h1>
			<div class="ratings">
				{#each feedbacks as feedback}
					<div class="feedback">
						<h3 class="user">
							@{feedback.username}
							<span class="badge">
								{feedback.tone}
							</span>
						</h3>
						<p class="comment">{feedback.comment}</p>
					</div>
				{/each}
			</div>
			<form class="enterfeedbacks" on:submit={giveFeedback}>
				<input
					type="text"
					class="feedbacks"
					placeholder="Enter Your Feedback"
					bind:value={feedback}
				/>
			</form>
		</div>

		<div class="starRatings {showratings ? 'show' : ''}">
			<h1>Ratings</h1>
			<div class="ratings">
				{#each ratings as rating}
					<div class="rating">
						@{rating.username} gave {rating.rating} stars
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.feedback {
		padding: 16px 16px;
		border-radius: 10px;
		background-color: #111;
	}
	.user {
		color: #fff;
		font-weight: bold;
		font-size: 14px;
		margin-bottom: 5px;
	}
	.badge {
		background-color: var(--primary);
		padding: 2px 4px;
		border-radius: 4px;
		margin-left: 10px;
		font-size: 12px;
		color: #111;
	}
	.comment {
		font-size: 16px;
	}
	.pcontainer {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.post {
		margin-inline: auto;
	}
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		border-radius: 10px;
		margin: 20px 20px 20px 20px;
		height: 500px;
		width: 600px;
		object-fit: cover;
	}

	a {
		padding-left: 20px;
		color: #ffffff;
		font-family: Roboto;
		font-size: 20;
	}
	.btn {
		background-color: #222222;
		border-radius: 8px;
		border: 0cm;
		padding: 0%;
		margin: 0;
		padding: 10px;
		margin-top: 5px;
		margin-bottom: 5px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btn-text {
		font-size: 14px;
		color: 'white';
	}
	.allContainer {
		position: relative;
		min-height: 88vh;
		max-width: 1200px;
		margin: auto auto;
	}
	.tags {
	}
	.tags-grid {
		display: flex;
		align-items: center;
		gap: 5px;
		flex-wrap: wrap;
	}
	.tag {
		padding: 10px 15px;
		font-size: 16px;
		border-radius: 25px;
		background-color: #222222;
	}
	h1 {
		margin: 20px 20px 20px 20px;
		font-family: Roboto;
	}
	.comments {
		position: fixed;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		top: 0;
		right: 0;
		bottom: 0;
		width: 400px;
		background-color: #222222;
		z-index: 1;
		transition: transform 0.3s ease-in-out;
		transform: translateX(400px);
	}
	.comments.show {
		transform: translateX(0);
	}

	.rating {
		padding: 16px 16px;
		border-radius: 10px;
		background-color: #111;
	}

	.stars {
		font-size: 30px;
		display: flex;
		justify-content: center;
	}

	.star {
		cursor: pointer;
	}

	.enterfeedbacks {
		position: fixed;
		left: 20px;
		bottom: 20px;
		right: 20px;
		width: 95%;
	}

	.feedbacks {
		padding: 10px;
		height: 50px;
		width: 100%;
		border-radius: 10px;
		color: #ffffff;
		background-color: #111111;
		border: 0;
		font-family: Roboto;
	}

	.starRatings {
		position: fixed;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		top: 0;
		right: 0;
		bottom: 0;
		width: 400px;
		background-color: #222222;
		z-index: 1;
		transition: transform 0.3s ease-in-out;
		transform: translateX(400px);
	}
	.starRatings.show {
		transform: translateX(0);
	}

	.ratings {
		padding: 20px;
		font-family: Roboto;
		color: #ffffff;
		font-size: 14;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
