import { PUBLIC_SITE_URL } from '$env/static/public';
import { formatTanggalUntukSitemap } from '$lib/common/alat/pengformat-tanggal.js';
import { RepositoriArtikel } from '$lib/common/data/RepositoriArtikel.js';
import type { Connection } from 'mariadb';

export async function GET({ locals }) {
	const db: Connection = (locals as any).db;
	const repositoriArtikel = RepositoriArtikel.getInstance(db);

	let sitemap = '';

	// versi XML
	sitemap += '<?xml version="1.0" encoding="UTF-8"?>\n';

	// pembuka sitemap
	sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

	// halaman utama
	// tag pembuka url
	sitemap += '  <url>\n';
	// tag loc
	sitemap += `    <loc>${PUBLIC_SITE_URL}</loc>\n`;
	// tag lastmod
	sitemap += `    <lastmod>2025-04-13</lastmod>\n`;
	// tag penutup url
	sitemap += '  </url>\n';

	// artikel
	const koleksiArtikel = await repositoriArtikel.dapatkanKoleksiArtikel({
		terbitSaja: true
	});
	const koleksiMetaArtikel = koleksiArtikel.map((artikel) => ({
		url: `${PUBLIC_SITE_URL}/artikel/${artikel.id.toString()}/${artikel.slug}`,
		tanggal: artikel.modifikasiTerakhirPada
	}));

	for (const metaArtikel of koleksiMetaArtikel) {
		// tag pembuka url
		sitemap += '  <url>\n';

		// tag loc
		sitemap += `    <loc>${metaArtikel.url}</loc>\n`;

		// tag lastmod
		sitemap += `    <lastmod>${formatTanggalUntukSitemap(metaArtikel.tanggal)}</lastmod>\n`;

		// tag penutup url
		sitemap += '  </url>\n';
	}

	// penutup sitemap
	sitemap += '</urlset>\n';

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
