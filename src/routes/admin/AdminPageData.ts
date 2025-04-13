export class AdminPageData {
	kodeAkses: string | null = null;
	terotentikasi: boolean = false;

	private constructor() {}

	static instance = new AdminPageData();
}
