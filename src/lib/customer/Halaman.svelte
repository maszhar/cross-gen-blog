<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		panelKiriTerbuka?: boolean;
	}
	const { children, panelKiriTerbuka = false }: Properti = $props();
</script>

<div class="min-h-screen pt-12 {panelKiriTerbuka ? 'pl-48' : ''}">
	<div class="px-4 py-8 sm:px-20 lg:px-8 xl:px-28">
		{@render children?.()}
	</div>
</div>
