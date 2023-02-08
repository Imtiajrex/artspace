// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export function GET({ url }) {
	const data = [
		{
			id: 1,
			username: 'admin',
			role: 'admin',
			createdAt: '2021-01-01'
		}
	];

	return new Response(JSON.stringify(data));
}
export function POST({ url }) {
	console.log(url);
	return new Response(JSON.stringify({}));
}
export function PUT({ url }) {
	console.log(url);
	return new Response(JSON.stringify({}));
}
