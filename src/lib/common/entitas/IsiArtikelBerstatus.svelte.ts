import { IsiArtikel, type ParameterBuatIsiArtikel } from './IsiArtikel';

export class IsiArtikelBerstatus extends IsiArtikel {
	private diubah: boolean;
	private baru: boolean;
	private isiLangsung = $state('');

	constructor(parameter: ParameterBuatIsiArtikelBerstatus = {}) {
		super(parameter);
		this.isiLangsung = parameter.isi ?? '';
		this.diubah = parameter.diubah ?? false;
		this.baru = parameter.baru ?? false;
	}

	apakahDiubah(): boolean {
		return this.diubah;
	}

	tandaiDiubah() {
		this.diubah = true;
	}

	apakahBaru(): boolean {
		return this.baru;
	}

	tandaiLama() {
		this.baru = false;
	}

	dapatkanIsiLangsung(): string {
		return this.isiLangsung;
	}

	override aturIsi(isi: string): void {
		this.diubah = true;
		this.isiLangsung = isi;
		super.aturIsi(isi);
	}

	override aturUrutan(urutan: bigint): void {
		if (this.dapatkanUrutan() === urutan) {
			return;
		}
		this.diubah = true;
		super.aturUrutan(urutan);
	}

	override serialize(): any {
		return {
			...super.serialize(),
			diubah: this.diubah,
			baru: this.baru
		};
	}

	static deserialize(data: any): IsiArtikelBerstatus {
		let artikel = new IsiArtikelBerstatus({
			baru: data.baru,
			diubah: data.diubah
		});
		artikel = IsiArtikel.deserialize(data, artikel) as IsiArtikelBerstatus;
		return artikel;
	}

	static dariIsiArtikel(isiArtikel: IsiArtikel): IsiArtikelBerstatus {
		return new IsiArtikelBerstatus({
			baru: false,
			diubah: false,
			id: isiArtikel.dapatkanId(),
			isi: isiArtikel.dapatkanIsi(),
			urutan: isiArtikel.dapatkanUrutan()
		});
	}
}

interface ParameterBuatIsiArtikelBerstatus extends ParameterBuatIsiArtikel {
	diubah?: boolean;
	baru?: boolean;
}
