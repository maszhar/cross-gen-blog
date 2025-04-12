import type { Connection } from 'mariadb';
import type { LayoutServerLoad } from './$types';
import { RepositoriKategori } from '$lib/common/data/RepositoriKategori';
import type { Kategori } from '$lib/common/entitas/Kategori';

export const load: LayoutServerLoad = async ({ locals }) => {
	const db: Connection = (locals as any).db;
	const repositoriKategori = RepositoriKategori.getInstance(db);

	let koleksiKategori: Kategori[] | undefined = undefined;
	let kategoriMasihAda = false;

	try {
		const hasilKoleksiKategori = await repositoriKategori.dapatkanKoleksiKategoriTerbatas();
		koleksiKategori = hasilKoleksiKategori.data;
		kategoriMasihAda = hasilKoleksiKategori.jumlah > 5n;
	} catch (e: any) {
		koleksiKategori = [];
	}

	return {
		dataKoleksiKategoriFooter: koleksiKategori.map((kategori) => kategori.serialize()),
		kategoriFooterMasihAda: kategoriMasihAda
	};
};
