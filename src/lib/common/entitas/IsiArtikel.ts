export class IsiArtikel {
	private id: bigint;
	private isi: string;
	private urutan: bigint;

	constructor(parameter: ParameterBuatIsiArtikel = {}) {
		this.id = parameter.id ?? 0n;
		this.isi = parameter.isi ?? '';
		this.urutan = parameter.urutan ?? -1n;
	}

	dapatkanIsi(): string {
		return this.isi;
	}

	aturIsi(isi: string) {
		this.isi = isi;
	}

	dapatkanUrutan(): bigint {
		return this.urutan;
	}

	aturUrutan(urutan: bigint) {
		this.urutan = urutan;
	}

	serialize(): any {
		return {
			id: this.id.toString(),
			isi: this.isi,
			urutan: this.urutan.toString()
		};
	}

	static deserialize(data: any, objek?: IsiArtikel): IsiArtikel {
		let hasil = objek;
		if (!objek) {
			hasil = new IsiArtikel();
		}

		hasil!.id = BigInt(data.id);
		hasil!.isi = data.isi;
		hasil!.urutan = BigInt(data.urutan);
		return hasil!;
	}
}

interface ParameterBuatIsiArtikel {
	id?: bigint;
	isi?: string;
	urutan?: bigint;
}
