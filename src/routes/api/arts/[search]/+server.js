// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { error } from '@sveltejs/kit';
import getDB from '$lib/server/db';

export async function GET({ params }) {
	try {
		const { search } = params;
		const db = await getDB();
		const [rows] = await db.execute(
			'SELECT arts.img,arts.art_id,arts.user_id,users.username, count(ratings.rating_id) as rating, count(feedbacks.feedback_id) as feedbacks FROM arts left join ratings on arts.art_id = ratings.art_id left join users on arts.user_id = users.id left join feedbacks on arts.art_id = feedbacks.art_id left join tags on arts.art_id = tags.art_id group by ratings.art_id,arts.art_id,feedbacks.art_id,tags.art_id  where tags.art_id like %?%',
			[search]
		);
		db.end();
		return new Response(JSON.stringify(rows));
	} catch (e) {
		console.log(e.message);
		throw error(500, e.message);
	}
}
