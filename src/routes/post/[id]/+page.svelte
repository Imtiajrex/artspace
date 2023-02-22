<script>
	//@ts-nocheck
	import {IconChevronDown, IconChevronUp,IconStar,IconMessageCircle} from '@tabler/icons-svelte';

	let username = 'username';
	let id = 'id';
	let image = 'image';
	let rating = 0;
	let comments = 30;
	let tags=['Abstract', 'Flower', 'Colorful','Painting'];

let showcomments = false;

let commentsIconColor='#D9D9D9';

function togglecomments() {
	showcomments = !showcomments;
	commentsIconColor='#EA8C58';
}

import { createEventDispatcher } from 'svelte';

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

<div class="allContainer">
	<div class="wrapper">
		<div class="btns">
			<div>
				<button class="btn">
					<IconChevronUp size={25} color="#D9D9D9"/>
				</button>
			</div>
			<div>
				<button class="btn">
					<IconChevronDown size={25} color="#D9D9D9"/>
				</button>
			</div>
		</div>
		<div class="pcontainer">
			<div class="post">
				<a href="username">
					@{username}
				</a>	
				<div>
					<img src="https://source.unsplash.com/random" alt="art">
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
				<button class="btn">
					<IconStar size={25} color="#D9D9D9"/>
				</button>
			</div>
			<div>
				<button class="btn" on:click={togglecomments}>
					<span><IconMessageCircle size={25} color="{commentsIconColor}"/></span>
				</button>
			</div>
		</div>
	</div>
	<div class="tags">
		<h1>Tags</h1>
		<div class="grid">
			{#each tags as tag}
			  <div class="cell">{tag}</div>
			{/each}
		  </div>
	</div>
	
	<div class="comments {showcomments ? 'show' : ''}">
		<h1>Feedbacks</h1>
		<div class="enterfeedbacks">
  			<input type="text" class="feedbacks" placeholder="Enter Your Feedback"/>
		</div>	
		  
		  
	</div>
	
</div>


<style>
	.pcontainer{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.post {
		margin-inline: auto;
	}
	.wrapper{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right:400px;
	}

	img{
		border-radius: 10px;
		margin:  20px 20px 20px 20px ;
		max-height: 500px;
		max-width: 1000px;
		
	}

	a{
		padding-left: 20px;
		color: #FFFFFF;
		font-family: Roboto;
		font-size: 20;
	}
	.btn{
		background-color:#222222 ;
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
  h1{
	margin: 20px 20px 20px 20px;
	font-family: Roboto;
  }
  p{
	margin: 20px 20px 20px 20px;
	font-family: Roboto;
	font-size: 16;
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
	font-size:medium;
	background-color: #111111;
	color: #FFFFFF;
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

  .enterfeedbacks{
	position: fixed;  
	left: 20px;  
	bottom: 20px;  
	right: 20px;   
	width: 95%;  
  }

  .feedbacks{
	height: 50px;
	width: 100%;
	border-radius: 10px;
	background-color:#111111;
	border: 0;
	padding-right: 20px;
  }
</style>
