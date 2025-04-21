<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
	}
	const { children }: Properti = $props();
</script>

<h2 class="mb-12 text-4xl font-bold dark:text-white">
	{@render children?.()}
</h2>
