<script lang="ts">
	import { Artikel } from '$lib/common/entitas/Artikel';
	import H2 from '$lib/common/ui/H2.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const koleksiRingkasanArtikel = data.koleksiRingkasanArtikel?.map((data) =>
		Artikel.deserialize(data)
	);
</script>

<Navbar />
<Halaman>
	<H2>Daftar Artikel</H2>

	{#if koleksiRingkasanArtikel !== undefined}
		{#each koleksiRingkasanArtikel as ringkasanArtikel}
			<div>{ringkasanArtikel.judul}</div>
		{/each}
		{#if koleksiRingkasanArtikel.length === 0}
			<em>Belum ada artikel</em>
		{/if}
	{/if}

	{#if data.galat}
		<div>{data.galat}</div>
	{/if}
</Halaman>
