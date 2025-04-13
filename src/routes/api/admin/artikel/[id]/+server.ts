import { RepositoriArtikel } from '$lib/common/data/RepositoriArtikel.js';
import { GalatDataTidakDitemukan } from '$lib/common/galat/GalatDataTidakDitemukan.js';
import type { Connection } from 'mariadb';

export async function DELETE({ locals, params }) {
	const db: Connection = (locals as any).db;
	const repositoriArtikel = RepositoriArtikel.getInstance(db);

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
		await repositoriArtikel.hapusArtikel(idArtikel);
		return new Response(undefined, {
			status: 204
		});
	} catch (e: any) {
		if (e instanceof GalatDataTidakDitemukan) {
			return new Response(
				JSON.stringify({
					error: 'Data tidak ditemukan'
				}),
				{
					status: 404,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		} else {
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
}
