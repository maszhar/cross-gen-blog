<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	interface Properti {
		children?: Snippet;
		href?: string;
	}
	const { children, href }: Properti = $props();

	const path = page.url.pathname;
	const aktif = new RegExp('^' + href).test(path);
</script>

<a {href} class="rounded px-4 py-2 {aktif ? 'bg-white text-black' : ''}">
	{@render children?.()}
</a>
