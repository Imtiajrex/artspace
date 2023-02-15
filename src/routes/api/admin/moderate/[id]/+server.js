// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import getDB from '$lib/server/db';

export async function POST({ params, request }) {
	console.log('post');
	const { id, status } = await request.json();

	const db = await getDB();
	console.log(status, id);
	if (status) {
		await db.execute('UPDATE arts SET flagged = ? WHERE art_id = ?', [0, id]);
	} else {
		await db.execute('DELETE FROM arts WHERE art_id = ?', [id]);
	}
	db.end();
	return new Response(JSON.stringify({ status: 'success', message: 'Moderated Post' }));
}
