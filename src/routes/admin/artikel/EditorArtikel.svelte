<script lang="ts">
	import H2Editable from '$lib/admin/editor/H2Editable.svelte';
	import { Artikel } from '$lib/common/entitas/Artikel';
	import { IsiArtikel } from '$lib/common/entitas/IsiArtikel';
	import H2 from '$lib/common/ui/H2.svelte';
	import ParagrafArtikel from './ParagrafArtikel.svelte';

	interface Properti {
		kunci?: boolean;
	}
	const { kunci = false }: Properti = $props();

	let judul = $state('');

	$effect(() => {
		judul = judul.replaceAll(/(<([^>]+)>)/gi, '');
	});

	let koleksiIsi: IsiArtikel[] = $state([new IsiArtikel()]);

	function tambahIsiDiBawahnya(indeks: number) {
		koleksiIsi.splice(indeks, 0, new IsiArtikel());
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

		return new Artikel({
			judul: judul,
			koleksiIsi: koleksiIsi
		});
	}
</script>

<div>
	<div class="relative">
		<H2Editable class="outline-none" bind:value={judul} {kunci} />
		{#if judul === ''}
			<H2 class="absolute top-0 left-0 -z-10 opacity-20">Judul Artikel</H2>
		{/if}
	</div>

	{#each koleksiIsi as isiArtikel, indeks}
		<ParagrafArtikel
			tambahDiBawahnya={() => tambahIsiDiBawahnya(indeks)}
			hapus={() => hapusIsi(indeks)}
		/>
	{/each}
</div>
