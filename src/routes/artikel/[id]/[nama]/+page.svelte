<script lang="ts">
	import { formatTanggal } from '$lib/common/alat/pengformat-tanggal';
	import { Artikel } from '$lib/common/entitas/Artikel';
	import H1 from '$lib/common/ui/H1.svelte';
	import P from '$lib/common/ui/P.svelte';
	import HalamanCustomer from '$lib/customer/HalamanCustomer.svelte';
	import KontainerKonten from '$lib/customer/KontainerKonten.svelte';
	import LayoutBlog from '$lib/customer/LayoutBlog.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const artikel = data.artikel ? Artikel.deserialize(data.artikel) : null;
</script>

<svelte:head>
	{#if artikel}
		<title>{artikel.judul} | MZHR</title>

		{#if artikel.koleksiIsi.length === 0 || artikel.koleksiIsi[0].dapatkanIsi().trim() === ''}
			<meta name="description" content={artikel.judul} />
		{:else}
			<meta name="description" content={artikel.koleksiIsi[0].dapatkanIsi().slice(0, 130)} />
		{/if}
	{:else}
		<title>Artikel | MZHR</title>
	{/if}
</svelte:head>

<Navbar />
<HalamanCustomer {data}>
	<LayoutBlog>
		{#snippet kiri()}
			{#if !data.galat && artikel}
				<KontainerKonten class="relative">
					<div class="absolute top-0 right-0 bg-green-700 px-4 py-1 text-white">
						{formatTanggal(artikel.modifikasiTerakhirPada)}
					</div>
					<H1>{artikel.judul}</H1>

					{#each artikel.koleksiIsi as isiArtikel}
						<P>
							{isiArtikel.dapatkanIsi()}
						</P>
					{/each}

					{#if artikel.koleksiIsi.length === 0 || (artikel.koleksiIsi.length === 1 && artikel.koleksiIsi[0].dapatkanIsi() === '')}
						<P>
							<em>Tidak ada isi</em>
						</P>
					{/if}
				</KontainerKonten>
			{:else}
				{data.galat ?? ''}
			{/if}
		{/snippet}
	</LayoutBlog>
</HalamanCustomer>
