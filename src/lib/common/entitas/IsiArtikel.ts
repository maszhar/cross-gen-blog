export class IsiArtikel {
	private diubah: boolean;
	private isi: string;

	constructor(parameter: ParameterBuatIsiArtikel = {}) {
		this.diubah = parameter.diubah ?? false;
		this.isi = parameter.isi ?? '';
	}

	apakahDiubah(): boolean {
		return this.diubah;
	}

	tandaiDiubah() {
		this.diubah = true;
	}

	dapatkanIsi(): string {
		return this.isi;
	}

	aturIsi(isi: string) {
		this.isi = isi;
	}

	serialize(): any {
		return {
			isi: this.isi
		};
	}

	static deserialize(data: any): IsiArtikel {
		return new IsiArtikel({
			isi: data.isi
		});
	}
}

interface ParameterBuatIsiArtikel {
	isi?: string;
	diubah?: boolean;
}
