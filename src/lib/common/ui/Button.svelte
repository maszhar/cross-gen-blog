<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		type?: 'button' | 'submit';
		href?: string;
		class?: string;
		loading?: boolean;
		disabled?: boolean;
	}
	const {
		children,
		type = 'button',
		href,
		class: className = '',
		loading = false,
		disabled = false
	}: Properti = $props();
</script>

{#if href === undefined}
	<button
		{type}
		class="cursor-pointer rounded border-2 border-sky-400 px-4 py-1 text-black hover:bg-sky-200 {className} flex items-center justify-center {loading
			? 'disabled:cursor-wait'
			: 'disabled:cursor-not-allowed'} disabled:border-sky-100 disabled:hover:bg-white"
		disabled={disabled || loading}
	>
		{#if !loading}
			{@render children?.()}
		{:else}
			<div class="h-6 w-6 animate-spin rounded-full border-r-2 border-l-2 border-sky-300"></div>
		{/if}
	</button>
{:else}
	<a
		{href}
		class="cursor-pointer rounded border-2 border-sky-400 px-4 py-1 text-black hover:bg-sky-200 {className} flex items-center justify-center"
	>
		{@render children?.()}
	</a>
{/if}
