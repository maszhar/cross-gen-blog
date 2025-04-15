<script lang="ts">
	import PEditable from '$lib/admin/editor/PEditable.svelte';
	import type { IsiArtikelBerstatus } from '$lib/common/entitas/IsiArtikelBerstatus.svelte';
	import P from '$lib/common/ui/P.svelte';

	interface Properti {
		tambahDiBawahnya: () => void;
		hapus: () => void;
		baru: boolean;
		isiArtikel: IsiArtikelBerstatus;
	}
	const { tambahDiBawahnya, hapus, isiArtikel, baru }: Properti = $props();

	function tanganiKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			tambahDiBawahnya();
		} else if (e.key === 'Backspace' && isiArtikel.dapatkanIsi() === '') {
			hapus();
		}
	}

	function ubah(data: string) {
		isiArtikel.aturIsi(data.replaceAll(/(<([^>]+)>)/gi, ''));
	}
</script>

<div class="relative">
	<PEditable
		class="outline-none"
		value={isiArtikel.dapatkanIsi()}
		oninput={ubah}
		onkeydown={tanganiKeyDown}
		autofocus={baru}
	/>
	{#if isiArtikel.dapatkanIsiLangsung() === ''}
		<P class="absolute top-0 left-0 -z-10 opacity-20">Paragraf baru</P>
	{/if}
</div>
