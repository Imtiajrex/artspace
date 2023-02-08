export function DELETE({ url }) {
	console.log(url);
	return new Response(JSON.stringify({}));
}
