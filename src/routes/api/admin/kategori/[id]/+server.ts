import { RepositoriKategori } from '$lib/common/data/RepositoriKategori';
import { Kategori } from '$lib/common/entitas/Kategori.js';
import { GalatDataTidakDitemukan } from '$lib/common/galat/GalatDataTidakDitemukan.js';
import type { Connection } from 'mariadb';

/**
 * Dapatkan kategori
 */
export async function GET({ locals, params }) {
	const db: Connection = (locals as any).db;
	const repositoriKategori = RepositoriKategori.getInstance(db);

	let idKategori = 0n;
	try {
		idKategori = BigInt(params.id);
	} catch (e) {
		return new Response(JSON.stringify({ error: 'parameter id harus bernilai angka' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	const kategori = await repositoriKategori.dapatkanKategori(idKategori);
	if (!kategori) {
		return new Response(JSON.stringify({ error: 'kategori tidak ditemukan' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	return new Response(JSON.stringify(kategori.serialize()), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

/**
 * perbarui kategori
 */
export async function PUT({ locals, params, request }) {
	const db: Connection = (locals as any).db;
	const repositoriKategori = RepositoriKategori.getInstance(db);

	let idKategori = 0n;
	try {
		idKategori = BigInt(params.id);
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
		const kategori = new Kategori({
			id: idKategori,
			nama: data.nama,
			slug: data.slug
		});
		await repositoriKategori.perbaruiKategori(kategori);
	} catch (e: any) {
		if (e instanceof GalatDataTidakDitemukan) {
			return new Response(JSON.stringify({ error: 'Kategori lama tidak ditemukan' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} else {
			return new Response(JSON.stringify({ error: e.message }), {
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}

	return new Response(undefined, {
		status: 204
	});
}
