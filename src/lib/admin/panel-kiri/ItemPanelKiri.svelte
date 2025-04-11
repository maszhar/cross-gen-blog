<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		aktif?: boolean;
	}
	const { children, aktif = false }: Properti = $props();
</script>

<div class="rounded px-4 py-2 {aktif ? 'bg-white text-black' : ''}">
	{@render children?.()}
</div>
