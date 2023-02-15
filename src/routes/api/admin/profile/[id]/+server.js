// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import getDB from '$lib/server/db';
import { error } from '@sveltejs/kit';

export async function GET({ url }) {
	try {
		const { id } = url;
		const db = await getDB();
		const [rows] = await db.execute('SELECT * FROM admins where admin_id = ?', [id]);
		db.end();
		return new Response(JSON.stringify(rows));
	} catch (e) {
		throw error(500, e.message);
	}
}

export async function PUT({ url, request }) {
	const { id } = url;
	const { username, password } = await request.json();
	const db = await getDB();

	let query = `UPDATE admins SET`;
	let params = [];
	if (username) {
		query += `username = ?`;
		params.push(username);
	}
	if (password) {
		if (username) query += `, `;
		query += `password = ?`;
		params.push(password);
	}
	query += ` WHERE admin_id = ?`;
	params.push(id);

	await db.execute(query, params);

	return new Response(JSON.stringify({}));
}
