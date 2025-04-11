export class Artikel {
	id: number;
	judul: string;

	constructor(parameter: ParameterBuatArtikel) {
		this.id = parameter.id ?? 0;
		this.judul = parameter.judul ?? '';
	}

	serialize(): any {
		return {
			id: this.id,
			judul: this.judul
		};
	}

	static deserialize(data: any): Artikel {
		return new Artikel({
			id: data.id,
			judul: data.judul
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
}
