<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
	}
	const { children }: Properti = $props();
</script>

<p class="mb-3 text-lg">
	{@render children?.()}
</p>
