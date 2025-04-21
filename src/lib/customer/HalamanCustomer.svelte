<script lang="ts">
	import type { Snippet } from 'svelte';
	import Halaman from './Halaman.svelte';
	import H5 from '$lib/common/ui/H5.svelte';
	import { Kategori } from '$lib/common/entitas/Kategori';
	import NavbarCustomer from './NavbarCustomer.svelte';

	interface Properti {
		children?: Snippet;
		panelKiriTerbuka?: boolean;
		data: {
			dataKoleksiKategoriFooter: any[];
			kategoriFooterMasihAda: boolean;
		};
		linkKembali?: string;
	}
	const { children, panelKiriTerbuka = false, data, linkKembali }: Properti = $props();

	const koleksiKategoriFooter = data.dataKoleksiKategoriFooter.map((item) =>
		Kategori.deserialize(item)
	);
</script>

<NavbarCustomer {linkKembali} />

{#if panelKiriTerbuka}
	<div class="fixed top-0 left-0 z-40 flex h-screen w-1/4 flex-col bg-zinc-800 px-12 text-white">
		<div class="flex items-center gap-2">
			<a href="/" class="text-3xl font-bold tracking-wide">MZHR</a>
		</div>
	</div>
{/if}
<Halaman {panelKiriTerbuka}>
	{@render children?.()}
</Halaman>
<div class="grid min-h-40 grid-cols-4 gap-8 bg-zinc-800 px-16 py-8 text-white">
	<div>
		<H5>Kategori</H5>
		<div class="flex flex-col gap-1">
			{#each koleksiKategoriFooter as kategori}
				<div>{kategori.nama}</div>
			{/each}
			{#if data.kategoriFooterMasihAda}
				<div>Kategori lainnya...</div>
			{/if}
		</div>
	</div>
</div>
<div class="border-t border-zinc-500 bg-zinc-800 px-4 py-5 text-center text-white">
	Dibuat oleh
	<a href="https://github.com/maszhar" target="_blank" class="text-sky-400"> Fikri Mustofa </a>
	. Hosting:
	<a
		href="https://member.jagoanhosting.com/aff.php?aff=7443"
		target="_blank"
		class="text-orange-500"
	>
		Jagoan Hosting
	</a>
</div>
