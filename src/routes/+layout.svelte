<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';

	const { children, data }: LayoutProps = $props();
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

{@render children()}
