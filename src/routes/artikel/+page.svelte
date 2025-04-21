<script lang="ts">
	import { formatTanggal } from '$lib/common/alat/pengformat-tanggal';
	import { Artikel } from '$lib/common/entitas/Artikel';
	import H1 from '$lib/common/ui/H1.svelte';
	import H5 from '$lib/common/ui/H5.svelte';
	import P from '$lib/common/ui/P.svelte';
	import HalamanCustomer from '$lib/customer/HalamanCustomer.svelte';
	import LayoutBlog from '$lib/customer/LayoutBlog.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const koleksiRingkasanArtikel = data.koleksiRingkasanArtikel?.map((data) =>
		Artikel.deserialize(data)
	);
</script>

<svelte:head>
	<title>Artikel | MZHR</title>
</svelte:head>

<HalamanCustomer {data}>
	<LayoutBlog>
		{#snippet kiri()}
			<H1>Daftar Artikel</H1>

			<div class="flex flex-col gap-4">
				{#if koleksiRingkasanArtikel !== undefined}
					{#each koleksiRingkasanArtikel as ringkasanArtikel}
						<a
							class="relative block border border-zinc-300"
							href={ringkasanArtikel.dapatkanLinkPublik()}
						>
							<div class="absolute top-0 right-0 bg-green-700 px-4 py-1 text-white">
								{formatTanggal(ringkasanArtikel.modifikasiTerakhirPada)}
							</div>
							<div class="p-4 pt-8 md:p-8">
								<H5>{ringkasanArtikel.judul}</H5>

								{#each ringkasanArtikel.koleksiIsi as isiArtikel}
									<P>
										{isiArtikel.dapatkanIsi().slice(0, 300)}{isiArtikel.dapatkanIsi().length > 300
											? '...'
											: ''}
									</P>
								{/each}

								{#if ringkasanArtikel.koleksiIsi.length === 0 || (ringkasanArtikel.koleksiIsi.length === 1 && ringkasanArtikel.koleksiIsi[0].dapatkanIsi() === '')}
									<em>Tidak ada isi</em>
								{/if}
							</div>
						</a>
					{/each}
					{#if koleksiRingkasanArtikel.length === 0}
						<em>Belum ada artikel</em>
					{/if}
				{/if}
			</div>

			{#if data.galat}
				<div>{data.galat}</div>
			{/if}
		{/snippet}
	</LayoutBlog>
</HalamanCustomer>
