<script lang="ts">
	import { Konteks } from '$lib/common/entitas/Konteks.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutProps } from './$types';

	const { children, data }: LayoutProps = $props();

	onMount(() => {
		Konteks.aturTema((localStorage.getItem('temaGelap') ?? '1') === '1');

		$effect(() => {
			if (Konteks.dapatkanTema()) {
				localStorage.setItem('temaGelap', '1');
			} else {
				localStorage.setItem('temaGelap', '0');
			}
		});
	});

	function generateTagFunction(gtagId: string): string {
		let hasil = `<script async src="https://www.googletagmanager.com/gtag/js?id=${gtagId}">${`<`}/script>\n`;
		hasil += `<script>\n`;
		hasil += `  window.dataLayer = window.dataLayer || [];\n`;
		hasil += `  function gtag(){dataLayer.push(arguments);}\n`;
		hasil += `  gtag('js', new Date());\n`;
		hasil += `  gtag('config', '${gtagId}');\n`;
		hasil += `${`<`}/script>`;
		return hasil;
	}
</script>

<svelte:head>
	<link rel="canonical" href={data.canonical} />

	{#if data.gtagId}
		{@html generateTagFunction(data.gtagId)}
	{/if}
</svelte:head>

<div class="{Konteks.dapatkanTema() ? 'dark' : ''} min-h-full">
	{@render children()}
</div>
