import { SqlError, type Connection } from 'mariadb';
import { Artikel } from '../entitas/Artikel';
import { RepositoriDatabase } from './RepositoriDatabase';
import { apakahGalatTidakAdaTabel } from '../alat/pengidentifikasi-galat-mariadb';
import { GalatDataTidakDitemukan } from '../galat/GalatDataTidakDitemukan';
import { IsiArtikel } from '../entitas/IsiArtikel';
import type { IsiArtikelBerstatus } from '../entitas/IsiArtikelBerstatus.svelte';

export class RepositoriArtikel extends RepositoriDatabase {
	private static TABEL_ARTIKEL = 'artikel';
	private static TABEL_ISI_ARTIKEL = 'isi_artikel';
	private static KOLEKSI_DEFINISI_KOLOM = {
		terbit: 'terbit TINYINT(1) UNSIGNED NOT NULL'
	};

	private constructor(db: Connection) {
		super(db);
	}

	async dapatkanKoleksiRingkasanArtikel(): Promise<Artikel[]> {
		try {
			const dataArtikelMentah = await this.db.query(
				'SELECT id, judul, slug, UNIX_TIMESTAMP(modifikasi_terakhir_pada) AS modifikasi_terakhir_pada FROM artikel ORDER BY modifikasi_terakhir_pada DESC'
			);
			const koleksiRingkasanArtikel = (dataArtikelMentah as any[]).map((dataMentah) =>
				Artikel.dariSql(dataMentah)
			);

			if (koleksiRingkasanArtikel.length > 0) {
				const dataKoleksiIsiArtikelMentah: any[] = await this.db.query(
					`SELECT id, isi, urutan, id_artikel FROM ${RepositoriArtikel.TABEL_ISI_ARTIKEL} WHERE id_artikel IN (?) AND urutan=0`,
					[koleksiRingkasanArtikel.map((artikel) => artikel.id)]
				);
				for (const dataMentah of dataKoleksiIsiArtikelMentah) {
					const artikelTerkait = koleksiRingkasanArtikel.find(
						(artikel) => artikel.id === dataMentah.id_artikel
					);
					if (artikelTerkait) {
						artikelTerkait.koleksiIsi.push(IsiArtikel.dariSql(dataMentah));
					}
				}
			}

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
				`SELECT id, judul, slug, UNIX_TIMESTAMP(modifikasi_terakhir_pada) AS modifikasi_terakhir_pada FROM ${RepositoriArtikel.TABEL_ARTIKEL}`
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

	async dapatkanKoleksiArtikel(
		parameter: ParameterDapatkanKoleksiArtikel = {}
	): Promise<Artikel[]> {
		// kompatibilitas tabel versi 1
		let tanpaTerbit = false;

		let koleksiArtikel: Artikel[] = [];

		let cobaLagi = false;
		do {
			cobaLagi = false;

			// persiapan query
			let argumenSql: any[] = [];
			let query = `SELECT id, judul, slug${tanpaTerbit ? '' : ', terbit'}, UNIX_TIMESTAMP(modifikasi_terakhir_pada) AS modifikasi_terakhir_pada FROM ${RepositoriArtikel.TABEL_ARTIKEL}`;

			const queryWhere: { q: string; arg: any }[] = [];

			if (parameter.terbitSaja && !tanpaTerbit) {
				queryWhere.push({
					q: 'terbit=1',
					arg: null
				});
			}

			// olah where
			if (queryWhere.length > 0) {
				query += ` WHERE ${queryWhere.map((item) => item.q).join(' AND ')}`;
				const argQuery = queryWhere.map((item) => item.arg).filter((item) => item !== null);
				if (argQuery.length > 0) {
					argumenSql = [...argumenSql, ...argQuery];
				}
			}

			// urutkan data
			query += ' ORDER BY modifikasi_terakhir_pada DESC';

			// eksekusi query
			try {
				const dataArtikelMentah = await this.db.query(query, argumenSql);
				koleksiArtikel = (dataArtikelMentah as any[]).map((dataMentah) =>
					Artikel.dariSql(dataMentah)
				);

				if (parameter.denganRingkasan) {
					if (koleksiArtikel.length > 0) {
						const dataKoleksiIsiArtikelMentah: any[] = await this.db.query(
							`SELECT id, isi, urutan, id_artikel FROM ${RepositoriArtikel.TABEL_ISI_ARTIKEL} WHERE id_artikel IN (?) AND urutan=0`,
							[koleksiArtikel.map((artikel) => artikel.id)]
						);
						for (const dataMentah of dataKoleksiIsiArtikelMentah) {
							const artikelTerkait = koleksiArtikel.find(
								(artikel) => artikel.id === dataMentah.id_artikel
							);
							if (artikelTerkait) {
								artikelTerkait.koleksiIsi.push(IsiArtikel.dariSql(dataMentah));
							}
						}
					}
				}
			} catch (e: any) {
				if (apakahGalatTidakAdaTabel(e)) {
					return [];
				} else if (
					e instanceof SqlError &&
					e.code === 'ER_BAD_FIELD_ERROR' &&
					/'terbit'/.test(e.sqlMessage ?? '')
				) {
					tanpaTerbit = true;
					cobaLagi = true;
				} else {
					throw e;
				}
			}
		} while (cobaLagi);
		return koleksiArtikel;
	}

	async dapatkanArtikel(parameter: ParameterDapatkanArtikel): Promise<Artikel | null> {
		// kompatibilitas tabel versi 1
		let tanpaTerbit = false;

		let artikel: Artikel | null = null;

		let cobaLagi = false;
		do {
			cobaLagi = false;

			// persiapan query
			let argumenSql: any[] = [];

			let query = `SELECT id, judul, slug${tanpaTerbit ? '' : ', terbit'}, UNIX_TIMESTAMP(modifikasi_terakhir_pada) AS modifikasi_terakhir_pada FROM ${RepositoriArtikel.TABEL_ARTIKEL}`;

			const queryWhere: { q: string; arg: any }[] = [];

			queryWhere.push({
				q: 'id=?',
				arg: parameter.idArtikel
			});

			if (parameter.terbitSaja && !tanpaTerbit) {
				queryWhere.push({
					q: 'terbit=1',
					arg: null
				});
			}

			// olah where
			if (queryWhere.length > 0) {
				query += ` WHERE ${queryWhere.map((item) => item.q).join(' AND ')}`;
				const argQuery = queryWhere.map((item) => item.arg).filter((item) => item !== null);
				if (argQuery.length > 0) {
					argumenSql = [...argumenSql, ...argQuery];
				}
			}

			try {
				console.log(query, argumenSql);
				const dataArtikelMentah: any[] = await this.db.query(query, argumenSql);
				if (dataArtikelMentah.length === 0) {
					return null;
				}

				artikel = Artikel.dariSql(dataArtikelMentah[0]);

				if (artikel) {
					const koleksiIsiArtikelMentah = await this.db.query(
						`SELECT id, isi, urutan, id_artikel FROM ${RepositoriArtikel.TABEL_ISI_ARTIKEL} WHERE id_artikel=? ORDER BY urutan`,
						[artikel.id]
					);
					for (const isiArtikelMentah of koleksiIsiArtikelMentah) {
						artikel.koleksiIsi.push(IsiArtikel.dariSql(isiArtikelMentah));
					}
				}
			} catch (e) {
				if (apakahGalatTidakAdaTabel(e)) {
					artikel = null;
				} else if (
					e instanceof SqlError &&
					e.code === 'ER_BAD_FIELD_ERROR' &&
					/'terbit'/.test(e.sqlMessage ?? '')
				) {
					tanpaTerbit = true;
					cobaLagi = true;
				} else {
					throw e;
				}
			}
		} while (cobaLagi);

		return artikel;
	}

	async tambahArtikel(artikel: Artikel): Promise<void> {
		let cobaLagi = false;
		do {
			cobaLagi = false;

			try {
				await this.db.beginTransaction();

				const dataId = await this.db.query(
					`INSERT INTO ${RepositoriArtikel.TABEL_ARTIKEL} (judul, slug, modifikasi_terakhir_pada, terbit) VALUES (?, ?, FROM_UNIXTIME(${Math.floor(new Date().getTime() / 1000)}), 0) RETURNING id`,
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
				} else if (
					e instanceof SqlError &&
					e.code === 'ER_BAD_FIELD_ERROR' &&
					/'terbit'/.test(e.sqlMessage ?? '')
				) {
					await this.upgradeTabelArtikelV1KeV2();
					cobaLagi = true;
				} else {
					throw e;
				}
			}
		} while (cobaLagi);
	}

	async perbaruiArtikel(artikel: Artikel, koleksiIsiYangDihapus: bigint[]): Promise<void> {
		try {
			await this.db.beginTransaction();

			await this.db.execute(
				`UPDATE ${RepositoriArtikel.TABEL_ARTIKEL} SET judul=?, slug=?, modifikasi_terakhir_pada=FROM_UNIXTIME(${Math.floor(new Date().getTime() / 1000)}) WHERE id=?`,
				[artikel.judul, artikel.slug, artikel.id]
			);

			for (const isiDihapus of koleksiIsiYangDihapus) {
				await this.hapusIsiArtikel(isiDihapus);
			}

			for (const isiArtikel of (artikel.koleksiIsi as IsiArtikelBerstatus[]).filter(
				(isiArtikel) => isiArtikel.apakahDiubah() || isiArtikel.apakahBaru()
			)) {
				if (isiArtikel.apakahBaru()) {
					await this.tambahIsiArtikel(isiArtikel, artikel.id);
				} else {
					await this.perbaruiIsiArtikel(isiArtikel);
				}
			}

			await this.db.commit();
		} catch (e) {
			await this.db.rollback();
			if (apakahGalatTidakAdaTabel(e)) {
				throw new GalatDataTidakDitemukan();
			} else {
				throw e;
			}
		}
	}

	async terbitkan(idArtikel: bigint): Promise<void> {
		let cobaLagi = false;
		do {
			cobaLagi = false;

			try {
				await this.db.execute(
					`UPDATE ${RepositoriArtikel.TABEL_ARTIKEL} SET terbit=1, modifikasi_terakhir_pada=FROM_UNIXTIME(${Math.floor(new Date().getTime() / 1000)}) WHERE id=?`,
					[idArtikel]
				);
			} catch (e) {
				if (apakahGalatTidakAdaTabel(e)) {
					throw new GalatDataTidakDitemukan();
				} else if (
					e instanceof SqlError &&
					e.code === 'ER_BAD_FIELD_ERROR' &&
					/'terbit'/.test(e.sqlMessage ?? '')
				) {
					await this.upgradeTabelArtikelV1KeV2();
					cobaLagi = true;
				} else {
					throw e;
				}
			}
		} while (cobaLagi);
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
			`CREATE TABLE IF NOT EXISTS ${RepositoriArtikel.TABEL_ARTIKEL} (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, judul VARCHAR(150) NOT NULL, slug VARCHAR(150) NOT NULL, modifikasi_terakhir_pada TIMESTAMP NOT NULL, ${RepositoriArtikel.KOLEKSI_DEFINISI_KOLOM.terbit})`
		);
	}

	// tambah kolom terbit artikel
	private async upgradeTabelArtikelV1KeV2() {
		// tambah kolom terbit dan atur default true agar artikel lama tidak disembunyikan
		await this.db.execute(
			`ALTER TABLE IF EXISTS ${RepositoriArtikel.TABEL_ARTIKEL} ADD COLUMN ${RepositoriArtikel.KOLEKSI_DEFINISI_KOLOM.terbit} DEFAULT 1`
		);

		// hilangkan nilai default kolom terbit
		await this.db.execute(
			`ALTER TABLE IF EXISTS ${RepositoriArtikel.TABEL_ARTIKEL} MODIFY COLUMN ${RepositoriArtikel.KOLEKSI_DEFINISI_KOLOM.terbit}`
		);
	}

	// === ISI ARTIKEL
	private async tambahIsiArtikel(isiArtikel: IsiArtikel, idArtikel: bigint): Promise<void> {
		const idMentah = await this.db.query(
			`INSERT INTO ${RepositoriArtikel.TABEL_ISI_ARTIKEL} (isi, urutan, id_artikel) VALUES (?, ?, ?) RETURNING id`,
			[isiArtikel.dapatkanIsi(), isiArtikel.dapatkanUrutan(), idArtikel]
		);
		isiArtikel.aturId(idMentah[0].id);
	}

	private async perbaruiIsiArtikel(isiArtikel: IsiArtikel): Promise<void> {
		await this.db.execute(
			`UPDATE ${RepositoriArtikel.TABEL_ISI_ARTIKEL} SET isi=?, urutan=? WHERE id=?`,
			[isiArtikel.dapatkanIsi(), isiArtikel.dapatkanUrutan(), isiArtikel.dapatkanId()]
		);
	}

	private async hapusIsiArtikel(idIsiArtikel: bigint): Promise<void> {
		await this.db.execute(`DELETE FROM ${RepositoriArtikel.TABEL_ISI_ARTIKEL} WHERE id=?`, [
			idIsiArtikel
		]);
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

interface ParameterDapatkanKoleksiArtikel {
	terbitSaja?: boolean;
	denganRingkasan?: boolean;
}

interface ParameterDapatkanArtikel {
	idArtikel: bigint;
	terbitSaja?: boolean;
}
