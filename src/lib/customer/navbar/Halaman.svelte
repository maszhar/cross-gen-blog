<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
	}
	const { children }: Properti = $props();
</script>

<div class="min-h-screen pt-12">
	<div class="px-4 py-8 sm:px-20 lg:px-28">
		{@render children?.()}
	</div>
</div>
