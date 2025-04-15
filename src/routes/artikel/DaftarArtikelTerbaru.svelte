<script lang="ts">
	import type { Artikel } from '$lib/common/entitas/Artikel';
	import H5 from '$lib/common/ui/H5.svelte';

	interface Properti {
		koleksiArtikel: Artikel[];
	}
	const { koleksiArtikel }: Properti = $props();

	function pindahHalaman(link: string) {
		window.location.href = link;
	}
</script>

{#if koleksiArtikel.length > 0}
	<div class="flex flex-col rounded border border-zinc-300 p-4">
		<H5>Artikel terbaru</H5>
		<div class="flex flex-col gap-2">
			{#each koleksiArtikel as artikel}
				<button
					class="flex cursor-pointer gap-2 text-left"
					onclick={() => pindahHalaman(artikel.dapatkanLinkPublik())}
				>
					<div class="w-1 bg-zinc-400"></div>
					<div class="flex-grow truncate">{artikel.judul}</div>
					<div>&gt;</div>
				</button>
			{/each}
		</div>
	</div>
{/if}
