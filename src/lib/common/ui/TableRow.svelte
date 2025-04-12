<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
	}
	const { children }: Properti = $props();
</script>

<tr class="align-top odd:bg-zinc-100">
	{@render children?.()}
</tr>
