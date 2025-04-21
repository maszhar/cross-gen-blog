import { PUBLIC_SITE_URL } from '$env/static/public';

export async function GET() {
	let responseText = '';
	responseText += 'User-agent: *\n';
	responseText += 'Disallow: /api/\n';
	responseText += 'Disallow: /auth/\n';
	responseText += 'Disallow: /admin/\n';
	responseText += 'Disallow: /media/\n';
	responseText += '\n';
	responseText += `Sitemap: ${PUBLIC_SITE_URL}/sitemap.xml\n`;

	return new Response(responseText, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=3600, public',
			'X-Robots-Tag': 'noindex, nofollow'
		}
	});
}
