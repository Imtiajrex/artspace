// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { error } from '@sveltejs/kit';
import getDB from '$lib/server/db';
import { writeFileSync } from 'fs';
import sha256 from 'crypto-js/sha256';
import { upload } from '$lib/server/cloudinary';
export async function GET({ url }) {
	try {
		const db = await getDB();
		const [rows] = await db.execute(
			'SELECT arts.img,arts.art_id,arts.user_id,users.username, count(ratings.rating_id) as rating, count(feedbacks.feedback_id) as feedbacks FROM arts left join ratings on arts.art_id = ratings.art_id left join users on arts.user_id = users.id left join feedbacks on arts.art_id = feedbacks.art_id group by ratings.art_id,arts.art_id,feedbacks.art_id'
		);
		db.end();
		return new Response(JSON.stringify(rows));
	} catch (e) {
		console.log(e.message);
		throw error(500, e.message);
	}
}

export async function POST({ url, request }) {
	const { tags, art } = await request.json();
	const imageName = '/arts/' + sha256(Date.now()).toString() + '.png';

	writeFileSync(`static${imageName}`, art, 'base64');
	const db = await getDB();
	const [rows] = await db.execute('INSERT INTO arts (img, user_id,flagged) VALUES (?, ?, 0)', [
		imageName,
		1
	]);
	if (tags && tags.length > 0) {
		let tagQuery = 'INSERT INTO tags (tag, art_id) VALUES ';
		let tagValues = [];
		tags.map(async (tag) => {
			tagQuery += '(?, ?)';
			if (tags.indexOf(tag) !== tags.length - 1) tagQuery += ', ';
			tagValues.push(tag, rows.insertId);
		});
		await db.execute(tagQuery, tagValues);
	}
	db.end();

	return new Response(JSON.stringify({ status: 'success', message: 'Art Shared' }));
}
