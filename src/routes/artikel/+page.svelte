<script lang="ts">
	import { Artikel } from '$lib/common/entitas/Artikel';
	import H2 from '$lib/common/ui/H2.svelte';
	import H5 from '$lib/common/ui/H5.svelte';
	import HalamanCustomer from '$lib/customer/HalamanCustomer.svelte';
	import KontainerKonten from '$lib/customer/KontainerKonten.svelte';
	import LayoutBlog from '$lib/customer/LayoutBlog.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const koleksiRingkasanArtikel = data.koleksiRingkasanArtikel?.map((data) =>
		Artikel.deserialize(data)
	);
</script>

<svelte:head>
	<title>Artikel | MZHR</title>
</svelte:head>

<Navbar />
<HalamanCustomer {data}>
	<LayoutBlog>
		{#snippet kiri()}
			<H2>Daftar Artikel</H2>

			<div class="flex flex-col gap-4">
				{#if koleksiRingkasanArtikel !== undefined}
					{#each koleksiRingkasanArtikel as ringkasanArtikel}
						<a
							class="block border border-zinc-300 p-4"
							href={`/artikel/${ringkasanArtikel.id}/${ringkasanArtikel.slug}`}
						>
							<H5>{ringkasanArtikel.judul}</H5>
							{#if ringkasanArtikel.koleksiIsi.length === 0}
								<em>Tidak ada isi</em>
							{/if}
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
