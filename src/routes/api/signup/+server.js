// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import getDB from '$lib/server/db';
import { error } from '@sveltejs/kit';
import sha256 from 'crypto-js/sha256';
export async function POST({ request }) {
	const { username, password, email } = await request.json();
	if (!username || !password || !email) throw error(400, 'Missing fields');

	let hashedPassword = sha256(password).toString();
	const db = await getDB();
	const [rows] = await db.execute('SELECT * FROM users WHERE username = ? or email = ?', [
		username,
		email
	]);
	if (rows.length > 0) throw error(400, 'Username or email already exists');

	const [result] = await db.execute(
		'INSERT INTO users (username, password, email,profile_img) VALUES (?, ?, ?,?)',
		[username, hashedPassword, email, '']
	);
	const [users] = await db.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);
	const user = users[0];
	db.end();
	return new Response(
		JSON.stringify({
			status: 'success',
			message: 'Logged In',
			user_id: user.id
		})
	);
}
