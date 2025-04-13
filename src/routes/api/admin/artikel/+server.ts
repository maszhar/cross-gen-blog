import { RepositoriArtikel } from '$lib/common/data/RepositoriArtikel.js';
import { Artikel } from '$lib/common/entitas/Artikel.js';
import type { Connection } from 'mariadb';

export async function POST({ locals, request }) {
	const db: Connection = (locals as any).db;
	const repositoriArtikel = RepositoriArtikel.getInstance(db);

	const data = await request.json();
	const artikel = new Artikel({
		judul: data.judul,
		slug: data.slug
	});

	try {
		await repositoriArtikel.tambahArtikel(artikel);
		return new Response(
			JSON.stringify({
				id: artikel.id.toString()
			}),
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (e: any) {
		return new Response(
			JSON.stringify({
				error: e.message
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
}
