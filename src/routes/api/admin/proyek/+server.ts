import { RepositoriProyek } from '$lib/common/data/RepositoriProyek.js';
import { Proyek } from '$lib/common/entitas/Proyek.js';
import type { Connection } from 'mariadb';

export async function GET({ locals }) {
	const db: Connection = (locals as any).db;
	const repositoriProyek = RepositoriProyek.getInstance(db);

	const koleksiProyek = await repositoriProyek.dapatkanKoleksiProyek();
	return new Response(JSON.stringify(koleksiProyek.map((proyek) => proyek.serialize())), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export async function POST({ locals, request }) {
	const db: Connection = (locals as any).db;
	const repositoriProyek = RepositoriProyek.getInstance(db);

	try {
		const dataRequest = await request.json();

		const proyek = new Proyek({
			nama: dataRequest.nama,
			slug: dataRequest.slug
		});

		await repositoriProyek.tambahProyek(proyek);

		return new Response(
			JSON.stringify({
				id: proyek.id.toString()
			}),
			{
				status: 201,
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
