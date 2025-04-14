import type { Connection } from 'mariadb';
import { RepositoriDatabase } from './RepositoriDatabase';
import { apakahGalatTidakAdaTabel } from '../alat/pengidentifikasi-galat-mariadb';
import { GalatDataTidakDitemukan } from '../galat/GalatDataTidakDitemukan';
import { Proyek } from '../entitas/Proyek';

export class RepositoriProyek extends RepositoriDatabase {
	private static TABEL_PROYEK = 'proyek' as const;

	private constructor(db: Connection) {
		super(db);
	}

	async dapatkanKoleksiProyek(batas: bigint = 0n): Promise<Proyek[]> {
		try {
			const koleksiDataMentah: any[] = await this.db.query(
				`SELECT id, nama, slug FROM ${RepositoriProyek.TABEL_PROYEK}${batas > 0n ? ` LIMIT ${batas.toString()}` : ''}`
			);
			const koleksiProyek = koleksiDataMentah.map((dataMentah) => Proyek.dariSql(dataMentah));
			return koleksiProyek;
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				return [];
			}
			throw e;
		}
	}

	async dapatkanProyek(id: bigint): Promise<Proyek | null> {
		try {
			const koleksiDataMentah: any[] = await this.db.query(
				`SELECT id, nama, slug FROM ${RepositoriProyek.TABEL_PROYEK} WHERE id=?`,
				[id]
			);
			if (koleksiDataMentah.length === 0) {
				return null;
			}
			return Proyek.dariSql(koleksiDataMentah[0]);
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				return null;
			}
			throw e;
		}
	}

	async tambahProyek(proyek: Proyek): Promise<void> {
		let cobaLagi = false;

		do {
			cobaLagi = false;

			try {
				const id = await this.db.query(
					`INSERT INTO ${RepositoriProyek.TABEL_PROYEK} (nama, slug) VALUES (?, ?) RETURNING id`,
					[proyek.nama, proyek.slug]
				);
				proyek.id = id[0].id;
			} catch (e) {
				if (apakahGalatTidakAdaTabel(e)) {
					await this.buatTabelProyek();
					cobaLagi = true;
				} else {
					throw e;
				}
			}
		} while (cobaLagi);
	}

	async perbaruiProyek(proyek: Proyek): Promise<void> {
		try {
			await this.db.query(`UPDATE ${RepositoriProyek.TABEL_PROYEK} SET nama=?, slug=? WHERE id=?`, [
				proyek.nama,
				proyek.slug,
				proyek.id
			]);
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				throw new GalatDataTidakDitemukan();
			} else {
				throw e;
			}
		}
	}

	async hapusProyek(idProyek: bigint): Promise<void> {
		try {
			const a = await this.db.execute(`DELETE FROM ${RepositoriProyek.TABEL_PROYEK} WHERE id=?`, [
				idProyek
			]);
			console.log(a);
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				throw new GalatDataTidakDitemukan();
			}
			throw e;
		}
	}

	private async buatTabelProyek() {
		await this.db.execute(
			`CREATE TABLE IF NOT EXISTS ${RepositoriProyek.TABEL_PROYEK} (id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, nama VARCHAR(100) NOT NULL, slug VARCHAR(50) NOT NULL)`
		);
	}

	private static instance: RepositoriProyek | null = null;
	static getInstance(db: Connection): RepositoriProyek {
		if (!RepositoriProyek.instance) {
			RepositoriProyek.instance = new RepositoriProyek(db);
		}
		return RepositoriProyek.instance;
	}
}
