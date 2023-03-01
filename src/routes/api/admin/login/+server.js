// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getUser } from '$lib/server/adminTokenChecker';
import getDB from '$lib/server/db';
import { error } from '@sveltejs/kit';
import sha256 from 'crypto-js/sha256';
export async function POST({ url, request }) {
	const { username, password } = await request.json();
	if (!username || !password) throw error(400, 'Missing fields');

	let hashedPassword = sha256(password).toString();
	const db = await getDB();
	const [rows] = await db.execute('SELECT * FROM admins WHERE username = ? AND password = ?', [
		username,
		hashedPassword
	]);
	if (rows.length == 0) throw error(400, 'Invalid credentials');

	db.end();
	const user = getUser(rows[0].admin_id);
	return new Response(
		JSON.stringify({
			status: 'success',
			message: 'Logged In',
			token: user.admin_id,
			role: user.role
		})
	);
}
