<script lang="ts">
	import H1Editable from '$lib/admin/editor/H1Editable.svelte';
	import { Artikel } from '$lib/common/entitas/Artikel';
	import { IsiArtikelBerstatus } from '$lib/common/entitas/IsiArtikelBerstatus.svelte';
	import H1 from '$lib/common/ui/H1.svelte';
	import ParagrafArtikel from './ParagrafArtikel.svelte';

	interface Properti {
		kunci?: boolean;
		artikelLama?: Artikel;
	}
	const { kunci = false, artikelLama }: Properti = $props();

	let judul = $state('');
	const koleksiIsiDihapus: bigint[] = [];

	$effect(() => {
		judul = judul.replaceAll(/(<([^>]+)>)/gi, '');
	});

	let koleksiIsi: IsiArtikelBerstatus[] = $state([new IsiArtikelBerstatus({ baru: true })]);

	$effect(() => {
		if (artikelLama) {
			judul = artikelLama.judul;
			koleksiIsi = artikelLama.koleksiIsi.map((isiArtikel) =>
				IsiArtikelBerstatus.dariIsiArtikel(isiArtikel)
			);
		}
	});

	function dapatkanIdSementara(): bigint {
		let hasil = -1n;
		koleksiIsi.forEach((isi) => {
			if (isi.dapatkanId() < hasil) {
				hasil = isi.dapatkanId() - 1n;
			}
		});
		return hasil;
	}

	function tambahIsiDiBawahnya(indeks: number) {
		const idSementara = dapatkanIdSementara();
		koleksiIsi.splice(indeks + 1, 0, new IsiArtikelBerstatus({ id: idSementara, baru: true }));
	}

	function hapusIsi(indeks: number) {
		if (indeks === 0) {
			return;
		}
		if (koleksiIsi[indeks].dapatkanId() !== 0n) {
			koleksiIsiDihapus.push(koleksiIsi[indeks].dapatkanId());
		}
		koleksiIsi.splice(indeks, 1);
	}

	export function ambilData(): Artikel | null {
		if (judul === '') {
			alert('Mohon jangan kosongkan judul!');
			return null;
		}

		for (let i = 0; i < koleksiIsi.length; i++) {
			koleksiIsi[i].aturUrutan(BigInt(i));
		}

		if (!artikelLama) {
			return new Artikel({
				judul: judul,
				slug: '',
				koleksiIsi: koleksiIsi
			});
		} else {
			artikelLama.judul = judul;
			artikelLama.koleksiIsi = koleksiIsi;
			return artikelLama;
		}
	}

	export function ambilKoleksiIsiYangDihapus(): bigint[] {
		return koleksiIsiDihapus;
	}
</script>

<div class="flex flex-col">
	<div class="relative">
		<H1Editable class="outline-none" bind:value={judul} {kunci} />
		{#if judul === ''}
			<H1 class="absolute top-0 left-0 -z-10 opacity-20">Judul Artikel</H1>
		{/if}
	</div>

	{#each koleksiIsi as isiArtikel, indeks (isiArtikel.dapatkanId())}
		<ParagrafArtikel
			{isiArtikel}
			tambahDiBawahnya={() => tambahIsiDiBawahnya(indeks)}
			hapus={() => hapusIsi(indeks)}
		/>
	{/each}
</div>
