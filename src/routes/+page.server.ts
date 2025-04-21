import type { Connection } from 'mariadb';
import type { PageServerLoad } from './$types';
import { RepositoriArtikel } from '$lib/common/data/RepositoriArtikel';
import type { Artikel } from '$lib/common/entitas/Artikel';

export const load: PageServerLoad = async ({ locals }) => {
	const db: Connection = (locals as any).db;
	const repositoriArtikel = RepositoriArtikel.getInstance(db);

	let koleksiArtikelTerbaru: Artikel[] = [];

	try {
		koleksiArtikelTerbaru = await repositoriArtikel.dapatkanKoleksiArtikel({
			terbitSaja: true,
			batas: 5
		});
	} catch (e: any) {
		koleksiArtikelTerbaru = [];
	}

	return {
		koleksiArtikelTerbaru: koleksiArtikelTerbaru.map((artikel) => artikel.serialize())
	};
};
