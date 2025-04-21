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
	<div class="w-full flex-none lg:max-w-80">
		{@render kanan?.()}
	</div>
</div>
