<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		href: string;
		children?: Snippet;
	}
	const { href, children }: Properti = $props();
</script>

<a
	{href}
	class="min-w-40 rounded-lg border-2 border-black px-8 py-2 text-center hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-sky-950"
>
	{@render children?.()}
</a>
