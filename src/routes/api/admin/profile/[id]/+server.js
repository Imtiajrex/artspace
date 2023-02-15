// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import getDB from '$lib/server/db';
import { error } from '@sveltejs/kit';
import sha256 from 'crypto-js/sha256';

export async function GET({ params }) {
	try {
		const { id } = params;
		const db = await getDB();
		const [rows] = await db.execute(
			'SELECT admins.admin_id,username,role FROM admins LEFT JOIN admin_has_roles ON admins.admin_id = admin_has_roles.admin_id LEFT JOIN roles ON admin_has_roles.role_id = roles.role_id where admins.admin_id = ?',
			[id]
		);
		db.end();
		return new Response(JSON.stringify(rows[0]));
	} catch (e) {
		console.log(e.message);
		throw error(500, e.message);
	}
}

export async function PUT({ params, request }) {
	const { id } = params;
	const { username, password } = await request.json();
	const db = await getDB();

	let query = `UPDATE admins SET `;
	let args = [];
	if (username) {
		query += `username = ?`;
		args.push(username);
	}
	if (password) {
		if (username) query += `, `;
		query += `password = ?`;
		let hashedPassword = sha256(password).toString();
		args.push(hashedPassword);
	}
	query += ` WHERE admin_id = ?`;
	args.push(id);

	await db.execute(query, args);

	return new Response(
		JSON.stringify({
			status: 'success',
			message: 'Updated Profile'
		})
	);
}
