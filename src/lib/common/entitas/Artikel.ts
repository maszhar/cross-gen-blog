import { IsiArtikel } from './IsiArtikel';

export class Artikel {
	id: bigint;
	judul: string;
	slug: string;
	koleksiIsi: IsiArtikel[];

	constructor(parameter: ParameterBuatArtikel) {
		this.id = parameter.id ?? 0n;
		this.judul = parameter.judul;
		this.slug = parameter.slug;
		this.koleksiIsi = parameter.koleksiIsi ?? [];
	}

	serialize(): any {
		return {
			id: this.id.toString(),
			judul: this.judul,
			slug: this.slug,
			koleksiIsi: this.koleksiIsi.map((isi) => isi.serialize())
		};
	}

	static deserialize(data: any): Artikel {
		return new Artikel({
			id: BigInt(data.id),
			judul: data.judul,
			slug: data.slug,
			koleksiIsi: data.koleksiIsi.map((item: any) => IsiArtikel.deserialize(item))
		});
	}

	static dariSql(data: any): Artikel {
		return new Artikel({
			id: data.id,
			slug: data.slug,
			judul: data.judul
		});
	}
}

interface ParameterBuatArtikel {
	id?: bigint;
	judul: string;
	slug: string;
	koleksiIsi?: IsiArtikel[];
}
