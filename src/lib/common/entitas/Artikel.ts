import { IsiArtikel } from './IsiArtikel';

export class Artikel {
	id: number;
	judul: string;
	koleksiIsi: IsiArtikel[];

	constructor(parameter: ParameterBuatArtikel) {
		this.id = parameter.id ?? 0;
		this.judul = parameter.judul ?? '';
		this.koleksiIsi = parameter.koleksiIsi ?? [];
	}

	serialize(): any {
		return {
			id: this.id,
			judul: this.judul,
			koleksiIsi: this.koleksiIsi.map((isi) => isi.serialize())
		};
	}

	static deserialize(data: any): Artikel {
		return new Artikel({
			id: data.id,
			judul: data.judul,
			koleksiIsi: data.koleksiIsi.map((item: any) => IsiArtikel.deserialize(item))
		});
	}

	static dariSql(data: any): Artikel {
		return new Artikel({
			id: data.id,
			judul: data.judul
		});
	}
}

interface ParameterBuatArtikel {
	id?: number;
	judul: string;
	koleksiIsi?: IsiArtikel[];
}
