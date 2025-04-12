<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		class?: string;
		color?: 'default' | 'red';
		href?: string;
		onclick?: () => void;
	}
	const { children, class: className = '', color = 'default', href, onclick }: Properti = $props();
</script>

{#if href === undefined}
	<button
		class="cursor-pointer text-xs hover:underline {color === 'red'
			? 'text-red-600'
			: ''} {className}"
		{onclick}
	>
		{@render children?.()}
	</button>
{:else}
	<a
		{href}
		class="cursor-pointer text-xs hover:underline {color === 'red'
			? 'text-red-600'
			: ''} {className}"
	>
		{@render children?.()}
	</a>
{/if}
