<script lang="ts">
	import { Artikel } from '$lib/common/entitas/Artikel';
	import H1 from '$lib/common/ui/H1.svelte';
	import HalamanCustomer from '$lib/customer/HalamanCustomer.svelte';
	import type { PageProps } from './$types';
	import LinkLandingPage from './LinkLandingPage.svelte';

	const { data }: PageProps = $props();

	const koleksiArtikelTerbaru = data.koleksiArtikelTerbaru?.map((data) =>
		Artikel.deserialize(data)
	);
</script>

<svelte:head>
	<title>MZHR - Belajar teknologi untuk memudahkan kehidupan</title>
	<meta name="description" content="Blog akan berisi tentang proyek IT dan pembelajaran." />
</svelte:head>

<HalamanCustomer {data} tanpaTepi>
	<div
		style="height: 85vh"
		class="flex flex-col items-center justify-center bg-white px-4 dark:bg-sky-950"
	>
		<h1 class="text-7xl font-bold text-black sm:text-8xl dark:text-white">MZHR</h1>
		<div class="mt-6 text-center text-xl sm:text-2xl">
			Belajar teknologi untuk memudahkan kehidupan
		</div>

		<div class="mt-12 flex">
			<LinkLandingPage href="/artikel">Artikel</LinkLandingPage>
		</div>
	</div>

	<div class="bg-green-50 px-4 py-10 sm:px-16 dark:bg-zinc-800">
		<H1 class="text-center">Artikel Terbaru</H1>

		{#if koleksiArtikelTerbaru.length > 0}
			<div class="flex flex-col gap-6 text-lg">
				{#each koleksiArtikelTerbaru as artikel}
					<a class="flex cursor-pointer gap-2 text-left" href={artikel.dapatkanLinkPublik()}>
						<div class="w-1 bg-zinc-400"></div>
						<div class="flex-grow truncate">{artikel.judul}</div>
						<div>&gt;</div>
					</a>
				{/each}
			</div>
		{:else}
			<em>Belum ada artikel</em>
		{/if}
	</div>

	<div class="px-4 py-10 sm:px-16">
		<H1 class="text-center">Kontak</H1>

		<div class="flex gap-2 text-lg">
			<div>Email:</div>
			<a href="mailto:fikrimustofa024@gmail.com" class="hover:text-blue-500"
				>fikrimustofa024@gmail.com</a
			>
		</div>
	</div>
</HalamanCustomer>
