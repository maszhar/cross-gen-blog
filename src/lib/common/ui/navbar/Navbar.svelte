<script lang="ts">
	import IkonKembali from '$lib/common/ui/icon/IkonKembali.svelte';
	import type { Snippet } from 'svelte';
	import PemilihDarkMode from '../PemilihDarkMode.svelte';

	interface Properti {
		linkKembali?: string;
		linkNavigasi?: Snippet;
	}
	const { linkKembali, linkNavigasi }: Properti = $props();
</script>

<nav
	class="fixed top-0 left-0 z-40 flex h-14 w-full items-center bg-green-700 px-4 text-white shadow-md sm:px-16 dark:bg-zinc-800"
>
	<div
		class="relative flex flex-grow items-center justify-center gap-2 sm:flex-grow-0 sm:justify-start"
	>
		{#if linkKembali}
			<a
				href={linkKembali}
				class="absolute top-1/2 left-0 -translate-y-1/2 px-4 text-lg sm:static sm:top-auto sm:left-auto sm:translate-y-0"
			>
				<IkonKembali class="h-6 w-6" />
			</a>
		{/if}
		<a href="/" class="pb-0.5 text-3xl font-bold tracking-wide">MZHR</a>
	</div>
	<!-- Link navigasi -->
	<div class="ml-10 hidden items-center justify-start gap-4 sm:flex">
		{@render linkNavigasi?.()}
	</div>
	<!-- Area kanan -->
	<div class="flex items-center justify-end gap-4 sm:flex-grow sm:gap-8">
		<PemilihDarkMode />
	</div>
</nav>
