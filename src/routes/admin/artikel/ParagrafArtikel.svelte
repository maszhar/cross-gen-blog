<script lang="ts">
	import PEditable from '$lib/admin/editor/PEditable.svelte';
	import P from '$lib/common/ui/P.svelte';

	interface Properti {
		tambahDiBawahnya: () => void;
		hapus: () => void;
	}
	const { tambahDiBawahnya, hapus }: Properti = $props();

	let isi = $state('');
	$effect(() => {
		isi = isi.replaceAll(/(<([^>]+)>)/gi, '');
	});

	function tanganiKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			tambahDiBawahnya();
		} else if (e.key === 'Backspace' && isi === '') {
			hapus();
		}
	}
</script>

<div class="relative">
	<PEditable class="outline-none" bind:value={isi} onkeydown={tanganiKeyDown} />
	{#if isi === ''}
		<P class="absolute top-0 left-0 -z-10 opacity-20">Paragraf baru</P>
	{/if}
</div>
