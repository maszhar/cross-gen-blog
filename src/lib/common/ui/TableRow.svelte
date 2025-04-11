<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
	}
	const { children }: Properti = $props();
</script>

<tr class="odd:bg-zinc-100">
	{@render children?.()}
</tr>
