<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		kiri?: Snippet;
		kanan?: Snippet;
	}
	const { kiri, kanan }: Properti = $props();
</script>

<div class="flex flex-col gap-8 lg:flex-row">
	<div class="flex-grow">
		{@render kiri?.()}
	</div>
	<div class="w-full max-w-80 flex-none">
		{@render kanan?.()}
	</div>
</div>
