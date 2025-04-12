import type { Connection } from 'mariadb';
import { Kategori } from '../entitas/Kategori';
import { RepositoriDatabase } from './RepositoriDatabase';
import { apakahGalatTidakAdaTabel } from '../alat/pengidentifikasi-galat-mariadb';
import { GalatDataTidakDitemukan } from '../galat/GalatDataTidakDitemukan';

export class RepositoriKategori extends RepositoriDatabase {
	private static TABEL_KATEGORI = 'kategori' as const;

	private constructor(db: Connection) {
		super(db);
	}

	async dapatkanKoleksiKategoriTerbatas(
		batas: bigint = 5n
	): Promise<{ data: Kategori[]; jumlah: bigint }> {
		try {
			const koleksiDataMentah: any[] = await this.db.query(
				`SELECT id, nama, slug FROM ${RepositoriKategori.TABEL_KATEGORI} LIMIT ?`,
				[batas]
			);
			const koleksiKategori = koleksiDataMentah.map((dataMentah) => Kategori.dariSql(dataMentah));

			const dataJumlahMentah: any[] = await this.db.query(
				`SELECT COUNT(id) AS jumlah FROM ${RepositoriKategori.TABEL_KATEGORI}`
			);
			const jumlah = dataJumlahMentah[0].jumlah;

			return {
				data: koleksiKategori,
				jumlah: jumlah
			};
		} catch (e) {
			if (!apakahGalatTidakAdaTabel(e)) {
				console.error(e);
			}
			return {
				data: [],
				jumlah: 0n
			};
		}
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

	async dapatkanKategori(id: BigInt): Promise<Kategori | null> {
		try {
			const koleksiDataMentah: any[] = await this.db.query(
				`SELECT id, nama, slug FROM ${RepositoriKategori.TABEL_KATEGORI} WHERE id=?`,
				[id]
			);
			if (koleksiDataMentah.length === 0) {
				return null;
			}
			return Kategori.dariSql(koleksiDataMentah[0]);
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				return null;
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

	async perbaruiKategori(kategori: Kategori): Promise<void> {
		try {
			await this.db.query(
				`UPDATE ${RepositoriKategori.TABEL_KATEGORI} SET nama=?, slug=? WHERE id=?`,
				[kategori.nama, kategori.slug, kategori.id]
			);
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				throw new GalatDataTidakDitemukan();
			} else {
				throw e;
			}
		}
	}

	async hapusKategori(idKategori: bigint): Promise<void> {
		try {
			const a = await this.db.execute(
				`DELETE FROM ${RepositoriKategori.TABEL_KATEGORI} WHERE id=?`,
				[idKategori]
			);
			console.log(a);
		} catch (e) {
			if (apakahGalatTidakAdaTabel(e)) {
				throw new GalatDataTidakDitemukan();
			}
			throw e;
		}
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
