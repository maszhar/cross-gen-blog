import { RepositoriArtikel } from '$lib/common/data/RepositoriArtikel.js';
import { Artikel } from '$lib/common/entitas/Artikel';
import { IsiArtikelBerstatus } from '$lib/common/entitas/IsiArtikelBerstatus.svelte';
import { GalatDataTidakDitemukan } from '$lib/common/galat/GalatDataTidakDitemukan.js';
import type { Connection } from 'mariadb';

export async function GET({ locals, params }) {
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
		const artikel = await repositoriArtikel.dapatkanArtikel(idArtikel);
		if (artikel === null) {
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
		}

		return new Response(JSON.stringify(artikel.serialize()), {
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

export async function PUT({ locals, params, request }) {
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
		const data = await request.json();
		const artikel = new Artikel({
			id: idArtikel,
			judul: data.judul,
			slug: data.slug,
			koleksiIsi: data.koleksiIsi.map((item: any) => IsiArtikelBerstatus.deserialize(item))
		});
		await repositoriArtikel.perbaruiArtikel(
			artikel,
			data.isiDihapus.map((id: string) => BigInt(id))
		);

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
