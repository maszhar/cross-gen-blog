export class Kategori {
	id: BigInt;
	nama: string;
	slug: string;

	constructor(parameter: ParameterBuatKategori) {
		this.id = parameter.id ?? 0n;
		this.nama = parameter.nama;
		this.slug = parameter.slug;
	}

	serialize(): any {
		return {
			id: this.id.toString(),
			nama: this.nama,
			slug: this.slug
		};
	}

	static deserialize(data: any): Kategori {
		return new Kategori({
			id: BigInt(data.id),
			nama: data.nama,
			slug: data.slug
		});
	}

	static dariSql(data: any): Kategori {
		return new Kategori({
			id: data.id,
			nama: data.nama,
			slug: data.slug
		});
	}
}

interface ParameterBuatKategori {
	id?: BigInt;
	nama: string;
	slug: string;
}
