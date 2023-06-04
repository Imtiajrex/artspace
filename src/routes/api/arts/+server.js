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

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '27dd3fc2c7mshf26f97eb781041ep17e066jsnfc7652ca744c',
		'X-RapidAPI-Host': 'image-labeling1.p.rapidapi.com'
	},
	body: '{"url":"http://res.cloudinary.com/do9x4igrn/image/upload/v1677087854/a5uxtmjllg0tk8bfbfsp.jpg"}'
};

export async function POST({ url, request }) {
	const { tags, art } = await request.json();
	const res = await upload(art);
	const imgURL = res.url;
	const imageLabelingRes = await fetch('https://image-labeling1.p.rapidapi.com/img/label', {
		...options,
		body: JSON.stringify({
			url: imgURL
		})
	});
	const imageLabelingData = await imageLabelingRes.json();
	const imagesLabels = Object.keys(imageLabelingData);
	console.log(imageLabelingData);
	const nsfwWords = ['adult', 'violence', 'nude', 'fire', 'blood'];
	let flagged = 0;
	imagesLabels.forEach((label) => {
		if (nsfwWords.includes(label.toLowerCase())) {
			flagged = 1;
		}
		tags.push(label);
	});

	const db = await getDB();
	const [rows] = await db.execute('INSERT INTO arts (img, user_id,flagged) VALUES (?, ?, ?)', [
		imgURL,
		1,
		flagged
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
