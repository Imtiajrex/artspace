// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { error } from '@sveltejs/kit';
import getDB from '$lib/server/db';

export async function GET({ params }) {
	try {
		const { id } = params;
		const db = await getDB();
		const [rows] = await db.execute(
			'SELECT * FROM ratings join users on users.id = ratings.user_id where ratings.art_id = ?',
			[id]
		);
		db.end();
		return new Response(JSON.stringify(rows));
	} catch (e) {
		console.log(e.message);
		throw error(500, e.message);
	}
}

export async function POST({ params, request }) {
	try {
		const { id } = params;
		const db = await getDB();
		const { user_id, rating } = await request.json();
		const [rows] = await db.execute('SELECT * FROM ratings WHERE user_id = ? AND art_id = ?', [
			user_id,
			id
		]);
		if (rows.length > 0) {
			await db.execute('UPDATE ratings SET rating = ? WHERE user_id = ? AND art_id = ?', [
				rating,
				user_id,
				id
			]);
		} else {
			await db.execute('INSERT INTO ratings (user_id, art_id, rating) VALUES (?, ?, ?)', [
				user_id,
				id,
				rating
			]);
		}
		db.end();
		return new Response(
			JSON.stringify({
				status: 'success',
				message: 'Rating added'
			})
		);
	} catch (err) {
		console.log(err.message);
		throw error(500, err.message);
	}
}
