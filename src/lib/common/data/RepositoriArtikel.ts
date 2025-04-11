import { Artikel } from '../entitas/Artikel';
import { RepositoriDatabase } from './RepositoriDatabase';

export class RepositoriArtikel extends RepositoriDatabase {
	async dapatkanKoleksiRingkasanArtikel(): Promise<Artikel[]> {
		const dataArtikelMentah = await this.db!.query('SELECT id, judul FROM artikel');
		const koleksiRingkasanArtikel = (dataArtikelMentah as any[]).map((dataMentah) =>
			Artikel.dariSql(dataMentah)
		);

		return koleksiRingkasanArtikel;
	}
}
