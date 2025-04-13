import type { Connection } from 'mariadb';
import type { PageServerLoad } from './$types';
import { RepositoriArtikel } from '$lib/common/data/RepositoriArtikel';
import type { Artikel } from '$lib/common/entitas/Artikel';

export const load: PageServerLoad = async ({ locals, params }) => {
	const db: Connection = (locals as any).db;
	const repositoriArtikel = RepositoriArtikel.getInstance(db);

	let artikel: Artikel | null = null;
	let galat: string | null = null;

	let idArtikel = 0n;
	try {
		idArtikel = BigInt(params.id);
	} catch (e) {
		return new Response(JSON.stringify({ error: 'parameter id harus bernilai angka' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	try {
		artikel = await repositoriArtikel.dapatkanArtikel(idArtikel);
		if (artikel === null) {
			galat = 'Artikel tidak ditemukan';
		}
	} catch (e: any) {
		galat = e.message;
		artikel = null;
	}

	return {
		galat,
		artikel: artikel?.serialize()
	};
};
