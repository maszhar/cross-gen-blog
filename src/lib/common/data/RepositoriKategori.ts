import type { Connection } from 'mariadb';
import { Kategori } from '../entitas/Kategori';
import { RepositoriDatabase } from './RepositoriDatabase';
import { apakahGalatTidakAdaTabel } from '../alat/pengidentifikasi-galat-mariadb';

export class RepositoriKategori extends RepositoriDatabase {
	private static TABEL_KATEGORI = 'kategori' as const;

	private constructor(db: Connection) {
		super(db);
	}

	async dapatkanKoleksiKategori(): Promise<Kategori[]> {
		try {
			const koleksiDataMentah: any[] = await this.db.query(
				`SELECT id, nama, slug FROM ${RepositoriKategori.TABEL_KATEGORI}`
			);
			const koleksiKategori = koleksiDataMentah.map((dataMentah) => Kategori.dariSql(dataMentah));
			return koleksiKategori;
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				return [];
			}
			throw e;
		}
	}

	async tambahKategori(kategori: Kategori): Promise<void> {
		let cobaLagi = false;

		do {
			cobaLagi = false;

			try {
				const id = await this.db.query(
					`INSERT INTO ${RepositoriKategori.TABEL_KATEGORI} (nama, slug) VALUES (?, ?) RETURNING id`,
					[kategori.nama, kategori.slug]
				);
				kategori.id = id[0].id;
			} catch (e) {
				if (apakahGalatTidakAdaTabel(e)) {
					await this.buatTabelKategori();
					cobaLagi = true;
				} else {
					throw e;
				}
			}
		} while (cobaLagi);
	}

	private async buatTabelKategori() {
		await this.db.execute(
			`CREATE TABLE IF NOT EXISTS ${RepositoriKategori.TABEL_KATEGORI} (id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, nama VARCHAR(100) NOT NULL, slug VARCHAR(50) NOT NULL)`
		);
	}

	private static instance: RepositoriKategori | null = null;
	static getInstance(db: Connection): RepositoriKategori {
		if (!RepositoriKategori.instance) {
			RepositoriKategori.instance = new RepositoriKategori(db);
		}
		return RepositoriKategori.instance;
	}
}
