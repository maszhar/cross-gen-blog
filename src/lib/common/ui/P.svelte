<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		class?: string;
	}
	const { children, class: className = '' }: Properti = $props();
</script>

<p class="mb-5 break-words sm:mb-8 sm:text-lg {className}">
	{@render children?.()}
</p>
