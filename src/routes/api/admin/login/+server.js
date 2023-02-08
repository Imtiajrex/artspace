// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import getDB from '$lib/server/db';
import { error } from '@sveltejs/kit';
import sha256 from 'crypto-js/sha256';
export async function POST({ url, request }) {
	const { username, password } = await request.json();
	try {
		if (!username || !password) throw error(400, 'Missing fields');

		let hashedPassword = sha256(password).toString();
		const db = await getDB();
		const [rows] = await db.execute('SELECT * FROM admins WHERE username = ? AND password = ?', [
			username,
			hashedPassword
		]);
		if (rows.length == 0) throw error(400, 'Invalid credentials');

		db.end();
		return new Response(JSON.stringify({ status: 'success', message: 'Logged In' }));
	} catch (e) {
		console.log(e);
		throw error(e.status, e.body.message);
	}
}
