<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		class?: string;
	}
	const { children, class: className = '' }: Properti = $props();
</script>

<h1 class="mb-12 text-3xl font-bold sm:text-5xl {className} dark:text-white">
	{@render children?.()}
</h1>
