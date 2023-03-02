<script>
	//@ts-nocheck
	import {
		IconChevronDown,
		IconChevronUp,
		IconStar,
		IconMessageCircle
	} from '@tabler/icons-svelte';
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
	});
	let username = 'username';
	let id = 'id';
	let image = 'image';
	let rating = 0;
	let comments = 30;
	let tags = [];
	let feedbacks;

	let showcomments = false;

	let commentsIconColor = '#D9D9D9';

	function togglecomments() {
		showcomments = !showcomments;
		if(showcomments){
			commentsIconColor='#EA8C58';
		}
		else{
			commentsIconColor='#D9D9D9';
		}
	}

	let showratings = false;

	let starIconColor = '#D9D9D9';

	function toggleratings() {
		showratings = !showratings;
		if(showratings){
			starIconColor='#EA8C58';
		}
		else{
			starIconColor='#D9D9D9';
		}
	}

		import { createEventDispatcher, onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import { each } from 'svelte/internal';

	const dispatch = createEventDispatcher();

	function setRating(newRating) {
		if (newRating === rating) {
			rating = 0;
		} else {
			rating = newRating;
		}

		dispatch('ratingChanged', rating);
	}
</script>

{#if loading}
	<div class="loading">
		<Circle color="var(--primary)" size={30} />
	</div>
{:else}
	<div class="allContainer">
		<div class="wrapper">
			<div class="btns">
				<div>
					<button class="btn">
						<IconChevronUp size={25} color="#D9D9D9" />
					</button>
				</div>
				<div>
					<button class="btn">
						<IconChevronDown size={25} color="#D9D9D9" />
					</button>
				</div>
			</div>
			<div class="pcontainer">
				<div class="post">
					<a href="username">
						@{username}
					</a>
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
					</button>
				</div>
				<div>
					<button class="btn" on:click={togglecomments}>
						<span><IconMessageCircle size={25} color={commentsIconColor} /></span>
					</button>
				</div>
			</div>
		</div>
		<div class="tags">
			<h1>Tags</h1>
			<div class="grid">
				{#each tags as tag}
					<div class="cell">{tag.tag}</div>
				{/each}
			</div>
		</div>

		<div class="comments {showcomments ? 'show' : ''}">
			<h1>Feedbacks</h1>
			<div class="enterfeedbacks">
				<input type="text" class="feedbacks" placeholder="Enter Your Feedback" />
			</div>
		</div>

	<div class="starRatings {showratings ? 'show' : ''}">
		<h1>Ratings</h1>
	</div>
	
</div>


<style>
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
		margin-right: 400px;
	}

	img {
		border-radius: 10px;
		margin: 20px 20px 20px 20px;
		max-height: 500px;
		max-width: 600px;
	}

	a {
		padding-left: 20px;
		color: #ffffff;
		font-family: Roboto;
		font-size: 20;
	}
	.btn {
		background-color: #222222;
		border-radius: 50%;
		border: 0cm;
		padding: 0%;
		margin: 0;
		width: 35px;
		height: 35px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.tags {
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
		transform: translateX(0);
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
	.cell {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		padding: 10px;
		font-family: Roboto;
		font-size: medium;
		background-color: #111111;
		color: #ffffff;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		margin-left: 20px;
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
		color: #FFFFFF;
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

  .ratings{
	padding: 20px;
	font-family: Roboto;
	color: #FFFFFF;
	font-size: 14;
  }
</style>
