<script>
	import PageLinks from '$lib/components/admin/dashboard/page-links.svelte';
	import Button from '$lib/components/button.svelte';
	import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-svelte';
	const data = [{ username: '@imtiajrex', role: 'Moderator', createdAt: '2021-08-01' }];
</script>

<div class="container">
	<PageLinks page="admin" />
	<div class="admin-container">
		<Button text="Add admin" Icon={IconPlus} maxWidth={'250px'} />
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
							<button>
								<IconTrash />
							</button>
							<button>
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
</style>
