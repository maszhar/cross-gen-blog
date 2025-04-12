export async function GET() {
	let sitemap = '';

	// versi XML
	sitemap += '<?xml version="1.0" encoding="UTF-8"?>\n';

	// pembuka sitemap
	sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

	// penutup sitemap
	sitemap += '</urlset>\n';

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
