<script lang="ts">
	import H2Editable from '$lib/admin/editor/H2Editable.svelte';
	import { Artikel } from '$lib/common/entitas/Artikel';
	import { IsiArtikelBerstatus } from '$lib/common/entitas/IsiArtikelBerstatus.svelte';
	import H2 from '$lib/common/ui/H2.svelte';
	import ParagrafArtikel from './ParagrafArtikel.svelte';

	interface Properti {
		kunci?: boolean;
		artikelLama?: Artikel;
	}
	const { kunci = false, artikelLama }: Properti = $props();

	let judul = $state('');

	$effect(() => {
		judul = judul.replaceAll(/(<([^>]+)>)/gi, '');
	});

	let koleksiIsi: IsiArtikelBerstatus[] = $state([new IsiArtikelBerstatus({ baru: true })]);

	$effect(() => {
		if (artikelLama) {
			judul = artikelLama.judul;
		}
	});

	function tambahIsiDiBawahnya(indeks: number) {
		koleksiIsi.splice(indeks + 1, 0, new IsiArtikelBerstatus({ baru: true }));
	}

	function hapusIsi(indeks: number) {
		if (koleksiIsi.length === 1) {
			return;
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
</script>

<div class="flex flex-col">
	<div class="relative">
		<H2Editable class="outline-none" bind:value={judul} {kunci} />
		{#if judul === ''}
			<H2 class="absolute top-0 left-0 -z-10 opacity-20">Judul Artikel</H2>
		{/if}
	</div>

	{#each koleksiIsi as isiArtikel, indeks}
		<ParagrafArtikel
			{isiArtikel}
			tambahDiBawahnya={() => tambahIsiDiBawahnya(indeks)}
			hapus={() => hapusIsi(indeks)}
		/>
	{/each}
</div>
