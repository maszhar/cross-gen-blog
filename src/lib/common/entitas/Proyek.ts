export class Proyek {
	id: bigint;
	nama: string;
	slug: string;

	constructor(parameter: ParameterBuatProyek) {
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

	static deserialize(data: any): Proyek {
		return new Proyek({
			id: BigInt(data.id),
			nama: data.nama,
			slug: data.slug
		});
	}

	static dariSql(data: any): Proyek {
		return new Proyek({
			id: data.id,
			nama: data.nama,
			slug: data.slug
		});
	}
}

interface ParameterBuatProyek {
	id?: bigint;
	nama: string;
	slug: string;
}
