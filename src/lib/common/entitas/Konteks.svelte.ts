export class Konteks {
	private temaGelap = $state(true);

	private constructor() {}

	static aturTema(temaGelap: boolean) {
		this.instance.temaGelap = temaGelap;
	}

	static dapatkanTema() {
		return this.instance.temaGelap;
	}

	private static instance = new Konteks();
}
