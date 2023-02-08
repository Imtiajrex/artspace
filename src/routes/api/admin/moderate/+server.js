// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export async function GET({ url }) {
	return new Response('test');
}
export async function POST({ url, request }) {
	const { id, status } = await request.json();

	console.log(url);
	return new Response(JSON.stringify({}));
}
