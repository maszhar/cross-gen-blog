import { RepositoriKategori } from '$lib/common/data/RepositoriKategori.js';
import { Kategori } from '$lib/common/entitas/Kategori';
import type { Connection } from 'mariadb';

/**
 * Simpan kategori baru
 */
export async function POST({ locals, request }) {
	const db: Connection = (locals as any).db;
	const repositoriKategori = RepositoriKategori.getInstance(db);

	const body = await request.json();
	const kategori = new Kategori({
		nama: body.nama,
		slug: body.slug
	});

	await repositoriKategori.tambahKategori(kategori);

	return new Response(
		JSON.stringify({
			id: kategori.id.toString()
		}),
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
}
