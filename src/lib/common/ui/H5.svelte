<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		class?: string;
	}
	const { children, class: className = '' }: Properti = $props();
</script>

<h2 class="mb-5 text-2xl font-bold {className} dark:text-white">
	{@render children?.()}
</h2>
