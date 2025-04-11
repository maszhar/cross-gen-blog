import { RepositoriArtikel } from '$lib/common/data/RepositoriArtikel';
import type { Artikel } from '$lib/common/entitas/Artikel';
import type { Connection } from 'mariadb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const db: Connection = (locals as any).db;
	const repositoriArtikel = new RepositoriArtikel(db);

	let galat: string | undefined = undefined;
	let dataKoleksiRingkasanArtikel: Artikel[] | undefined = undefined;

	try {
		const koleksiRingkasanArtikel = await repositoriArtikel.dapatkanKoleksiRingkasanArtikel();
		dataKoleksiRingkasanArtikel = koleksiRingkasanArtikel.map((ringkasan) => ringkasan.serialize());
	} catch (e: any) {
		galat = e.message;
	}

	return {
		koleksiRingkasanArtikel: dataKoleksiRingkasanArtikel,
		galat: galat
	};
};
