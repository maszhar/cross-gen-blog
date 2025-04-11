<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		type?: 'button' | 'submit';
		href?: string;
	}
	const { children, type = 'button', href }: Properti = $props();
</script>

{#if href === undefined}
	<button
		{type}
		class="cursor-pointer rounded border-2 border-sky-400 px-4 py-1 text-black hover:bg-sky-200"
	>
		{@render children?.()}
	</button>
{:else}
	<a
		{href}
		class="cursor-pointer rounded border-2 border-sky-400 px-4 py-1 text-black hover:bg-sky-200"
	>
		{@render children?.()}
	</a>
{/if}
