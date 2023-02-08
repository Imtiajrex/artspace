export async function PUT({ request }) {
	const { username, password } = await request.json();

	return new Response(JSON.stringify({}));
}
