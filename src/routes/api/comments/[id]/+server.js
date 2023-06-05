// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { error } from '@sveltejs/kit';
import getDB from '$lib/server/db';

export async function GET({ params }) {
	try {
		const { id } = params;
		const db = await getDB();
		const [rows] = await db.execute(
			'SELECT * FROM feedbacks join users on users.id = feedbacks.user_id where feedbacks.art_id = ?',
			[id]
		);
		db.end();
		return new Response(JSON.stringify(rows));
	} catch (e) {
		console.log(e.message);
		throw error(500, e.message);
	}
}

export async function POST({ params, request }) {
	try {
		const { id } = params;
		const { user_id, feedback } = await request.json();

		const encodedParams = new URLSearchParams();
		encodedParams.set('text', feedback);

		const url = 'https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/';
		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'X-RapidAPI-Key': '27dd3fc2c7mshf26f97eb781041ep17e066jsnfc7652ca744c',
				'X-RapidAPI-Host': 'twinword-emotion-analysis-v1.p.rapidapi.com'
			},
			body: encodedParams
		};
		let emotion = 'Unidentified';
		try {
			const response = await fetch(url, options);
			const result = await response.json();
			emotion =
				result && result.emotions_detected && result.emotions_detected.length > 0
					? result.emotions_detected.join(', ')
					: 'Unidentified';
		} catch (error) {
			console.error(error);
		}

		const db = await getDB();
		await db.execute('INSERT INTO feedbacks (user_id, art_id, comment,tone) VALUES (?, ?, ?,?)', [
			user_id,
			id,
			feedback,
			emotion
		]);

		return new Response(
			JSON.stringify({
				status: 'success',
				message: 'Feedback added'
			})
		);
	} catch (err) {
		console.log(err.message);
		throw error(500, err.message);
	}
}
