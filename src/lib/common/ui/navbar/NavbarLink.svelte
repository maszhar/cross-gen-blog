<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		href?: string;
		children?: Snippet;
	}
	const { href, children }: Properti = $props();
</script>

<a {href} class="font-semibold text-zinc-100">
	{@render children?.()}
</a>
