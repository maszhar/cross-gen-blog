import { IsiArtikel } from './IsiArtikel';

export class Artikel {
	id: bigint;
	judul: string;
	slug: string;
	koleksiIsi: IsiArtikel[];
	modifikasiTerakhirPada: Date;
	terbit: boolean;

	constructor(parameter: ParameterBuatArtikel) {
		this.id = parameter.id ?? 0n;
		this.judul = parameter.judul;
		this.slug = parameter.slug;
		this.koleksiIsi = parameter.koleksiIsi ?? [];
		this.modifikasiTerakhirPada = parameter.modifikasiTerakhirPada ?? new Date();
		this.terbit = parameter.terbit ?? false;
	}

	serialize(): any {
		return {
			id: this.id.toString(),
			judul: this.judul,
			slug: this.slug,
			koleksiIsi: this.koleksiIsi.map((isi) => isi.serialize()),
			modifikasiTerakhirPada: this.modifikasiTerakhirPada.getTime(),
			terbit: this.terbit
		};
	}

	static deserialize(data: any): Artikel {
		return new Artikel({
			id: BigInt(data.id),
			judul: data.judul,
			slug: data.slug,
			koleksiIsi: data.koleksiIsi.map((item: any) => IsiArtikel.deserialize(item)),
			modifikasiTerakhirPada: new Date(data.modifikasiTerakhirPada),
			terbit: data.terbit ?? false
		});
	}

	static dariSql(data: any): Artikel {
		return new Artikel({
			id: data.id,
			slug: data.slug,
			judul: data.judul,
			modifikasiTerakhirPada: data.modifikasi_terakhir_pada
				? new Date(parseInt((data.modifikasi_terakhir_pada as bigint).toString()) * 1000)
				: new Date(0),
			terbit: !!data.terbit
		});
	}
}

interface ParameterBuatArtikel {
	id?: bigint;
	judul: string;
	slug: string;
	koleksiIsi?: IsiArtikel[];
	modifikasiTerakhirPada?: Date;
	terbit?: boolean;
}
