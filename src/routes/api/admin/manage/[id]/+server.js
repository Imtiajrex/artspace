// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import getDB from '$lib/server/db';
import sha256 from 'crypto-js/sha256';
import { error } from '@sveltejs/kit';
export async function DELETE({ params }) {
	const id = params.id;
	const db = await getDB();
	const res = await db.execute('DELETE FROM admins WHERE admin_id = ?', [id]);

	db.end();
	return new Response(
		JSON.stringify({
			status: 'success',
			message: 'Admin deleted'
		})
	);
}

export async function PUT({ params, request }) {
	const { username, password, role } = await request.json();
	const id = params.id;
	if (!username || !role) throw error(400, 'Missing fields');

	const db = await getDB();
	const [rows] = await db.execute('SELECT * FROM admins WHERE username = ? AND admin_id != ?', [
		username,
		id
	]);
	if (rows.length > 0) {
		db.end();
		throw error(400, 'Username already exists');
	}
	if (password) {
		let hashedPassword = sha256(password).toString();
		await db.execute('UPDATE admins set username = ?, password = ? where admin_id = ?', [
			username,
			hashedPassword,
			id
		]);
	} else {
		await db.execute('UPDATE admins set username = ? where admin_id = ?', [username, id]);
	}
	db.end();
	return new Response(JSON.stringify({ status: 'success', message: 'Admin updated' }));
}

export async function GET({ params }) {
	const id = params.id;
	const db = await getDB();
	const [rows, fields] = await db.execute('SELECT username FROM admins WHERE admin_id = ?', [id]);
	db.end();
	return new Response(JSON.stringify(rows));
}
