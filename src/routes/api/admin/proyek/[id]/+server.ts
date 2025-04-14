import { RepositoriProyek } from '$lib/common/data/RepositoriProyek.js';
import { Proyek } from '$lib/common/entitas/Proyek.js';
import { GalatDataTidakDitemukan } from '$lib/common/galat/GalatDataTidakDitemukan';
import type { Connection } from 'mariadb';

export async function GET({ locals, params }) {
	const db: Connection = (locals as any).db;
	const repositoriProyek = RepositoriProyek.getInstance(db);

	let idProyek = 0n;
	try {
		idProyek = BigInt(params.id);
	} catch (e) {
		return new Response(JSON.stringify({ error: 'parameter id harus bernilai angka' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	const proyek = await repositoriProyek.dapatkanProyek(idProyek);
	if (!proyek) {
		return new Response(JSON.stringify({ error: 'proyek tidak ditemukan' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	return new Response(JSON.stringify(proyek.serialize()), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export async function PUT({ locals, params, request }) {
	const db: Connection = (locals as any).db;
	const repositoriProyek = RepositoriProyek.getInstance(db);

	let idProyek = 0n;
	try {
		idProyek = BigInt(params.id);
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
		const proyek = new Proyek({
			id: idProyek,
			nama: data.nama,
			slug: data.slug
		});
		await repositoriProyek.perbaruiProyek(proyek);
	} catch (e: any) {
		if (e instanceof GalatDataTidakDitemukan) {
			return new Response(JSON.stringify({ error: 'Proyek lama tidak ditemukan' }), {
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

export async function DELETE({ locals, params }) {
	const db: Connection = (locals as any).db;
	const repositoriProyek = RepositoriProyek.getInstance(db);

	let idProyek = 0n;
	try {
		idProyek = BigInt(params.id);
	} catch (e: any) {
		return new Response(JSON.stringify({ error: 'parameter id harus bernilai angka' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	try {
		await repositoriProyek.hapusProyek(idProyek);
	} catch (e: any) {
		if (e instanceof GalatDataTidakDitemukan) {
			return new Response(JSON.stringify({ error: 'Proyek tidak ditemukan' }), {
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
