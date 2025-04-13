<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spinner from './Spinner.svelte';

	interface Properti {
		children?: Snippet;
		type?: 'button' | 'submit';
		href?: string;
		class?: string;
		loading?: boolean;
		disabled?: boolean;
		onclick?: () => void;
	}
	const {
		children,
		type = 'button',
		href,
		class: className = '',
		loading = false,
		disabled = false,
		onclick
	}: Properti = $props();
</script>

{#if href === undefined}
	<button
		{type}
		class="cursor-pointer rounded border-2 border-sky-400 px-4 py-1 text-black hover:bg-sky-200 {className} flex items-center justify-center {loading
			? 'disabled:cursor-wait'
			: 'disabled:cursor-not-allowed'} disabled:border-sky-100 disabled:hover:bg-white"
		disabled={disabled || loading}
		{onclick}
	>
		{#if !loading}
			{@render children?.()}
		{:else}
			<Spinner />
		{/if}
	</button>
{:else}
	<a
		{href}
		class="cursor-pointer rounded border-2 border-sky-400 px-4 py-1 text-black hover:bg-sky-200 {className} inline-flex items-center justify-center"
	>
		{@render children?.()}
	</a>
{/if}
