<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		class?: string;
		colspan?: number;
	}
	const { children, class: className = '', colspan }: Properti = $props();
</script>

<td class="p-2 {className}" {colspan}>
	{@render children?.()}
</td>
