import type { Connection } from 'mariadb';
import type { LayoutServerLoad } from './$types';
import { RepositoriKategori } from '$lib/common/data/RepositoriKategori';
import type { Kategori } from '$lib/common/entitas/Kategori';
import { PUBLIC_SITE_URL } from '$env/static/public';
import { env } from '$env/dynamic/private';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const db: Connection = (locals as any).db;
	const repositoriKategori = RepositoriKategori.getInstance(db);

	let koleksiKategori: Kategori[] | undefined = undefined;
	let kategoriMasihAda = false;

	try {
		const hasilKoleksiKategori = await repositoriKategori.dapatkanKoleksiKategoriTerbatas();
		koleksiKategori = hasilKoleksiKategori.data;
		kategoriMasihAda = hasilKoleksiKategori.jumlah > 5n;
	} catch (e: any) {
		console.error(e);
		koleksiKategori = [];
	}

	const canonical = PUBLIC_SITE_URL + url.pathname;
	const gtagId = env.GTAG_ID;

	return {
		dataKoleksiKategoriFooter: koleksiKategori.map((kategori) => kategori.serialize()),
		kategoriFooterMasihAda: kategoriMasihAda,
		canonical,
		gtagId
	};
};
