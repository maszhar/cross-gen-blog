import type { Connection } from 'mariadb';
import { Artikel } from '../entitas/Artikel';
import { RepositoriDatabase } from './RepositoriDatabase';
import { apakahGalatTidakAdaTabel } from '../alat/pengidentifikasi-galat-mariadb';
import { GalatDataTidakDitemukan } from '../galat/GalatDataTidakDitemukan';
import type { IsiArtikel } from '../entitas/IsiArtikel';

export class RepositoriArtikel extends RepositoriDatabase {
	private static TABEL_ARTIKEL = 'artikel';
	private static TABEL_ISI_ARTIKEL = 'isi_artikel';

	private constructor(db: Connection) {
		super(db);
	}

	async dapatkanKoleksiRingkasanArtikel(): Promise<Artikel[]> {
		try {
			const dataArtikelMentah = await this.db.query('SELECT id, judul, slug FROM artikel');
			const koleksiRingkasanArtikel = (dataArtikelMentah as any[]).map((dataMentah) =>
				Artikel.dariSql(dataMentah)
			);

			return koleksiRingkasanArtikel;
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				return [];
			} else {
				throw e;
			}
		}
	}

	async dapatkanKoleksiArtikelTanpaIsi(): Promise<Artikel[]> {
		try {
			const dataArtikelMentah = await this.db.query(
				`SELECT id, judul, slug FROM ${RepositoriArtikel.TABEL_ARTIKEL}`
			);
			const koleksiRingkasanArtikel = (dataArtikelMentah as any[]).map((dataMentah) =>
				Artikel.dariSql(dataMentah)
			);

			return koleksiRingkasanArtikel;
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				return [];
			} else {
				throw e;
			}
		}
	}

	async dapatkanArtikel(idArtikel: bigint): Promise<Artikel | null> {
		try {
			const dataArtikelMentah: any[] = await this.db.query(
				`SELECT id, judul, slug FROM ${RepositoriArtikel.TABEL_ARTIKEL} WHERE id=?`,
				[idArtikel]
			);
			if (dataArtikelMentah.length === 0) {
				return null;
			}

			return Artikel.dariSql(dataArtikelMentah[0]);
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				return null;
			} else {
				throw e;
			}
		}
	}

	async tambahArtikel(artikel: Artikel): Promise<void> {
		let cobaLagi = false;
		do {
			cobaLagi = false;

			try {
				await this.db.beginTransaction();

				const dataId = await this.db.query(
					`INSERT INTO ${RepositoriArtikel.TABEL_ARTIKEL} (judul, slug, modifikasi_terakhir_pada) VALUES (?, ?, FROM_UNIXTIME(${Math.floor(new Date().getTime() / 1000)})) RETURNING id`,
					[artikel.judul, artikel.slug]
				);
				artikel.id = dataId[0].id;

				for (const isiArtikel of artikel.koleksiIsi) {
					await this.tambahIsiArtikel(isiArtikel, artikel.id);
				}

				await this.db.commit();
			} catch (e) {
				await this.db.rollback();

				if (apakahGalatTidakAdaTabel(e)) {
					await this.buatTabelArtikel();
					await this.buatTabelIsiArtikel();
					cobaLagi = true;
				} else {
					throw e;
				}
			}
		} while (cobaLagi);
	}

	async perbaruiArtikel(artikel: Artikel): Promise<void> {
		try {
			await this.db.execute(
				`UPDATE ${RepositoriArtikel.TABEL_ARTIKEL} SET judul=?, slug=? WHERE id=?`,
				[artikel.judul, artikel.slug, artikel.id]
			);
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				throw new GalatDataTidakDitemukan();
			} else {
				throw e;
			}
		}
	}

	async hapusArtikel(idArtikel: bigint): Promise<void> {
		try {
			await this.db.execute(`DELETE FROM ${RepositoriArtikel.TABEL_ARTIKEL} WHERE id=?`, [
				idArtikel
			]);
		} catch (e: any) {
			if (apakahGalatTidakAdaTabel(e)) {
				throw new GalatDataTidakDitemukan();
			} else {
				throw e;
			}
		}
	}

	private async buatTabelArtikel() {
		await this.db.execute(
			`CREATE TABLE IF NOT EXISTS ${RepositoriArtikel.TABEL_ARTIKEL} (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, judul VARCHAR(150) NOT NULL, slug VARCHAR(150) NOT NULL, modifikasi_terakhir_pada TIMESTAMP NOT NULL)`
		);
	}

	private async tambahIsiArtikel(isiArtikel: IsiArtikel, idArtikel: bigint): Promise<void> {
		await this.db.execute(
			`INSERT INTO ${RepositoriArtikel.TABEL_ISI_ARTIKEL} (isi, urutan, id_artikel) VALUES (?, ?, ?)`,
			[isiArtikel.dapatkanIsi(), isiArtikel.dapatkanUrutan(), idArtikel]
		);
	}

	private async buatTabelIsiArtikel() {
		await this.db.execute(
			`CREATE TABLE IF NOT EXISTS ${RepositoriArtikel.TABEL_ISI_ARTIKEL} (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, isi LONGTEXT NOT NULL, urutan BIGINT UNSIGNED NOT NULL, id_artikel BIGINT UNSIGNED NOT NULL, FOREIGN KEY (id_artikel) REFERENCES ${RepositoriArtikel.TABEL_ARTIKEL} (id) ON UPDATE CASCADE ON DELETE CASCADE)`
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
