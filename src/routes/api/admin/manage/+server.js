// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { error } from '@sveltejs/kit';
import getDB from '$lib/server/db';
import sha256 from 'crypto-js/sha256';
import { adminTokenChecker } from '$lib/server/adminTokenChecker';

export async function GET({ url, request }) {
	if (!adminTokenChecker(request, ['Admin'])) throw error(401, 'Unauthorized');
	try {
		const db = await getDB();
		const [rows] = await db.execute(
			'SELECT admins.admin_id,admins.username,admins.password,roles.role FROM admins LEFT JOIN admin_has_roles ON admins.admin_id = admin_has_roles.admin_id LEFT JOIN roles ON admin_has_roles.role_id = roles.role_id'
		);
		db.end();
		return new Response(JSON.stringify(rows));
	} catch (e) {
		console.log(e.message);
		throw error(500, e.message);
	}
}
export async function POST({ url, request }) {
	const { username, password, role } = await request.json();
	if (!username || !password || !role) throw error(400, 'Missing fields');

	let hashedPassword = sha256(password).toString();
	const db = await getDB();
	const [rows] = await db.execute('SELECT * FROM admins WHERE username = ?', [username]);

	if (rows.length > 0) throw error(400, 'Username already exists');
	const [insert] = await db.execute('INSERT INTO admins (username, password) VALUES (?, ?)', [
		username,
		hashedPassword
	]);
	const roleMap = {
		Admin: 1,
		Moderator: 2
	};
	await db.execute('INSERT INTO admin_has_roles (admin_id, role_id) VALUES (?, ?)', [
		insert.insertId,
		roleMap[role]
	]);
	db.end();
	return new Response(JSON.stringify({ status: 'success', message: 'Admin created' }));
}
