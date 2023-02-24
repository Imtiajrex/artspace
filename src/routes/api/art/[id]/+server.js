// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { error } from '@sveltejs/kit';
import getDB from '$lib/server/db';

export async function GET({ params }) {
	try {
		const { id } = params;
		const db = await getDB();
		const [rows] = await db.execute(
			'SELECT arts.img,arts.art_id,arts.user_id FROM arts where arts.art_id = ?',
			[id]
		);
		console.log(rows);
		db.end();
		return new Response(JSON.stringify(rows[0]));
	} catch (e) {
		console.log(e.message);
		throw error(500, e.message);
	}
}
