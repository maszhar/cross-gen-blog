<script lang="ts">
	import { Artikel } from '$lib/common/entitas/Artikel';
	import Button from '$lib/common/ui/Button.svelte';
	import H2 from '$lib/common/ui/H2.svelte';
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
	{:else}
		<title>Artikel | MZHR</title>
	{/if}
</svelte:head>

<Navbar />
<HalamanCustomer {data}>
	<LayoutBlog>
		{#snippet kiri()}
			{#if !data.galat && artikel}
				<KontainerKonten>
					<H2>{artikel.judul}</H2>

					{#if artikel.koleksiIsi.length === 0}
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
