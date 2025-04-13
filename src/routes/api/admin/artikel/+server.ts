import { RepositoriArtikel } from '$lib/common/data/RepositoriArtikel.js';
import { Artikel } from '$lib/common/entitas/Artikel.js';
import { IsiArtikelBerstatus } from '$lib/common/entitas/IsiArtikelBerstatus.svelte.js';
import type { Connection } from 'mariadb';

export async function GET({ locals }) {
	const db: Connection = (locals as any).db;
	const repositoriArtikel = RepositoriArtikel.getInstance(db);

	try {
		const koleksiArtikel = await repositoriArtikel.dapatkanKoleksiArtikelTanpaIsi();
		return new Response(JSON.stringify(koleksiArtikel.map((artikel) => artikel.serialize())), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
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

export async function POST({ locals, request }) {
	const db: Connection = (locals as any).db;
	const repositoriArtikel = RepositoriArtikel.getInstance(db);

	try {
		const data = await request.json();
		const artikel = new Artikel({
			judul: data.judul,
			slug: data.slug,
			koleksiIsi: data.koleksiIsi.map((item: any) => IsiArtikelBerstatus.deserialize(item))
		});

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
