<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
	}
	const { children }: Properti = $props();
</script>

<div class="rounded border border-zinc-300 p-8">
	{@render children?.()}
</div>
