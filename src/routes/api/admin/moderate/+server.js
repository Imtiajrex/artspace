// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { error } from '@sveltejs/kit';
import getDB from '$lib/server/db';

export async function GET({ url }) {
	try {
		const db = await getDB();
		const [rows] = await db.execute('SELECT * FROM arts where flagged = 1');
		db.end();
		return new Response(JSON.stringify(rows));
	} catch (e) {
		throw error(500, e.message);
	}
}
