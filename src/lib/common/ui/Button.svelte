<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		type?: 'button' | 'submit';
		href?: string;
		class?: string;
	}
	const { children, type = 'button', href, class: className = '' }: Properti = $props();
</script>

{#if href === undefined}
	<button
		{type}
		class="cursor-pointer rounded border-2 border-sky-400 px-4 py-1 text-black hover:bg-sky-200 {className}"
	>
		{@render children?.()}
	</button>
{:else}
	<a
		{href}
		class="cursor-pointer rounded border-2 border-sky-400 px-4 py-1 text-black hover:bg-sky-200 {className}"
	>
		{@render children?.()}
	</a>
{/if}
