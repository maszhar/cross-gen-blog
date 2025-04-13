<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		class?: string;
	}
	const { children, class: className = '' }: Properti = $props();
</script>

<h1 class="mb-12 text-5xl font-bold {className}">
	{@render children?.()}
</h1>
