<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';

	const { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="canonical" href={data.canonical} />
</svelte:head>

{@render children()}
