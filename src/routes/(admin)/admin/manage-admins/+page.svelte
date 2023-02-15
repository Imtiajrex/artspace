<script>
	// @ts-nocheck

	import PageLinks from '$lib/components/admin/dashboard/page-links.svelte';
	import AddAdmin from '$lib/components/admin/manage/add-admin.svelte';
	import Delete from '$lib/components/admin/manage/delete.svelte';
	import EditAdmin from '$lib/components/admin/manage/edit-admin.svelte';
	import Button from '$lib/components/button.svelte';
	import { IconPencil, IconPlus, IconStar, IconStarFilled, IconTrash } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';

	import { Circle } from 'svelte-loading-spinners';
	let data = [];
	let addOpen = false;
	let editOpen = false;
	let deleteOpen = false;
	let id = '';
	let loading = true;

	const getAdmins = async () => {
		loading = true;
		try {
			const res = await fetch('/api/admin/manage');
			if (res.status !== 200) throw new Error(res.statusText);
			const responseData = await res.json();
			data = responseData;
		} catch (e) {
			console.log(e.message);
			alert(e.message);
		}
		loading = false;
	};

	onMount(() => {
		getAdmins();
	});
</script>

<div class="container">
	<AddAdmin bind:open={addOpen} update={getAdmins} />
	<EditAdmin bind:open={editOpen} bind:id update={getAdmins} />
	<Delete bind:open={deleteOpen} bind:id update={getAdmins} />
	<PageLinks page="admin" />
	<div class="admin-container">
		<Button
			text="Add admin"
			Icon={IconPlus}
			maxWidth={'250px'}
			onClick={() => {
				addOpen = true;
			}}
		/>
		{#if loading}
			<div class="loader-container">
				<Circle size={25} color="white" />
			</div>
		{:else}
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each data as row, i}
						<tr>
							<td>{i + 1}</td>
							<td>{row.username}</td>
							<td>{row.role}</td>
							<td>
								<button
									on:click={() => {
										deleteOpen = true;
										id = row.admin_id;
									}}
								>
									<IconTrash />
								</button>
								<button
									on:click={() => {
										editOpen = true;
										id = row.admin_id;
									}}
								>
									<IconPencil />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</div>

<style>
	:global(.loader-container) {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--bg);
		width: 100%;
		border-radius: 7px;
		margin-top: 40px;
		padding: 20px;
	}
	.admin-container {
		margin-top: 60px;
	}
	table {
		width: 100%;
		background-color: var(--bg);
		border-radius: 7px;
		margin-top: 40px;
	}
	th,
	td {
		padding: 15px 10px;
		text-align: left;
	}
	td {
		color: rgb(212, 212, 212);
	}
	button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		color: var(--primary);
		margin-right: 20px;
	}
	button:hover,
	button:focus {
		filter: brightness(1.2);
	}
	button:active {
		filter: brightness(0.9);
	}
</style>
