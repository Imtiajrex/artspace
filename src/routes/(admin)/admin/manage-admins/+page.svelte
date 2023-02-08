<script>
	import PageLinks from '$lib/components/admin/dashboard/page-links.svelte';
	import AddAdmin from '$lib/components/admin/manage/add-admin.svelte';
	import Delete from '$lib/components/admin/manage/delete.svelte';
	import EditAdmin from '$lib/components/admin/manage/edit-admin.svelte';
	import Button from '$lib/components/button.svelte';
	import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	const data = [{ username: '@imtiajrex', role: 'Moderator', createdAt: '2021-08-01' }];
	let addOpen = false;
	let editOpen = false;
	let deleteOpen = false;

	const getAdmins = async () => {
		const res = await fetch('/api/admin/manage');
		const data = await res.json();
		return data;
	};

	onMount(() => {
		getAdmins().then((data) => {
			console.log(data);
		});
	});
</script>

<div class="container">
	<AddAdmin bind:open={addOpen} />
	<EditAdmin bind:open={editOpen} />
	<Delete bind:open={deleteOpen} />
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
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Username</th>
					<th>Role</th>
					<th>Created At</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data as { username, role, createdAt }, i}
					<tr>
						<td>{i + 1}</td>
						<td>{username}</td>
						<td>{role}</td>
						<td>{createdAt}</td>
						<td>
							<button on:click={() => (deleteOpen = true)}>
								<IconTrash />
							</button>
							<button on:click={() => (editOpen = true)}>
								<IconPencil />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.admin-container {
		margin-top: 60px;
	}
	table {
		width: 100%;
		margin-top: 40px;
		background-color: var(--bg);
		border-radius: 7px;
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
