// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { adminTokenChecker } from '$lib/server/adminTokenChecker';
import getDB from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function GET({ params, request }) {
	if (!adminTokenChecker(request, ['Admin', 'Moderator'])) throw error(401, 'Unauthorized');
	try {
		const { id } = params;
		const db = await getDB();
		const [users] = await db.execute('SELECT COUNT(*) as count FROM users');
		const [arts] = await db.execute('SELECT COUNT(*) as count FROM arts');
		const [moderation] = await db.execute('SELECT COUNT(*) as count FROM arts where flagged = 1');
		db.end();
		return new Response(
			JSON.stringify({
				users: users[0].count,
				arts: arts[0].count,
				moderation: moderation[0].count
			})
		);
	} catch (e) {
		console.log(e.message);
		throw error(500, e.message);
	}
}
