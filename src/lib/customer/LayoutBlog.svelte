<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		kiri?: Snippet;
		kanan?: Snippet;
	}
	const { kiri, kanan }: Properti = $props();
</script>

<div class="flex gap-4">
	<div class="flex-grow">
		{@render kiri?.()}
	</div>
	<div class="w-full max-w-64 flex-none">
		{@render kanan?.()}
	</div>
</div>
