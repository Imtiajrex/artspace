// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { error } from '@sveltejs/kit';
import getDB from './db';

export const adminTokenChecker = async (request: Request, permittedRoles: string[]) => {
	const token = request.headers.get('access-token') as string;
	if (!token) return false;
	const user = await getUser(token);
	return user && permittedRoles.includes(user.role);
};
export const getUser = async (id: string) => {
	const db = await getDB();
	const [rows] = await db.execute(
		'SELECT admins.admin_id,username,role FROM admins LEFT JOIN admin_has_roles ON admins.admin_id = admin_has_roles.admin_id LEFT JOIN roles ON admin_has_roles.role_id = roles.role_id where admins.admin_id = ?',
		[id]
	);
	db.end();
	return rows.length > 0 ? rows[0] : null;
};
