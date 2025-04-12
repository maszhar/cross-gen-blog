<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		class?: string;
	}
	const { children, class: className = '' }: Properti = $props();
</script>

<div class="rounded border border-zinc-300 p-8 {className}">
	{@render children?.()}
</div>
