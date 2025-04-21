<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		panelKiriTerbuka?: boolean;
		tanpaTepi?: boolean;
	}
	const { children, panelKiriTerbuka = false, tanpaTepi = false }: Properti = $props();
</script>

<div
	class="min-h-screen bg-white pt-14 text-black dark:bg-zinc-900 dark:text-zinc-200 {panelKiriTerbuka
		? 'pl-48'
		: ''}"
>
	<div class={!tanpaTepi ? 'px-4 py-8 sm:px-20 lg:px-8 xl:px-28' : ''}>
		{@render children?.()}
	</div>
</div>
