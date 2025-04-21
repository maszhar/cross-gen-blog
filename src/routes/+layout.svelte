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
</script>

<svelte:head>
	<link rel="canonical" href={data.canonical} />
	{#if data.gtagId}
		<script async src={`https://www.googletagmanager.com/gtag/js?id=${data.gtagId}`}></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				window.dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', data.gtagId, { page_path: location.pathname });
		</script>
	{/if}
</svelte:head>

<div class="{Konteks.dapatkanTema() ? 'dark' : ''} min-h-full">
	{@render children()}
</div>
