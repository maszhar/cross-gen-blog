import type { Connection } from 'mariadb';
import { Artikel } from '../entitas/Artikel';
import { RepositoriDatabase } from './RepositoriDatabase';
import { apakahGalatTidakAdaTabel } from '../alat/pengidentifikasi-galat-mariadb';

export class RepositoriArtikel extends RepositoriDatabase {
	private static TABEL_ARTIKEL = 'artikel';

	private constructor(db: Connection) {
		super(db);
	}

	async dapatkanKoleksiRingkasanArtikel(): Promise<Artikel[]> {
		const dataArtikelMentah = await this.db!.query('SELECT id, judul FROM artikel');
		const koleksiRingkasanArtikel = (dataArtikelMentah as any[]).map((dataMentah) =>
			Artikel.dariSql(dataMentah)
		);

		return koleksiRingkasanArtikel;
	}

	async tambahArtikel(artikel: Artikel): Promise<void> {
		let cobaLagi = false;
		do {
			cobaLagi = false;

			try {
				const dataId = await this.db.query(
					`INSERT INTO ${RepositoriArtikel.TABEL_ARTIKEL} (judul, slug) VALUES (?, ?) RETURNING id`,
					[artikel.judul, artikel.slug]
				);
				artikel.id = dataId[0].id;
			} catch (e) {
				if (apakahGalatTidakAdaTabel(e)) {
					await this.buatTabelArtikel();
					cobaLagi = true;
				} else {
					throw e;
				}
			}
		} while (cobaLagi);
	}

	private async buatTabelArtikel() {
		await this.db.execute(
			`CREATE TABLE IF NOT EXISTS ${RepositoriArtikel.TABEL_ARTIKEL} (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, judul VARCHAR(150) NOT NULL, slug VARCHAR(150) NOT NULL)`
		);
	}

	private static instance: RepositoriArtikel | undefined = undefined;
	static getInstance(db: Connection): RepositoriArtikel {
		if (RepositoriArtikel.instance === undefined) {
			RepositoriArtikel.instance = new RepositoriArtikel(db);
		}
		return RepositoriArtikel.instance;
	}
}
