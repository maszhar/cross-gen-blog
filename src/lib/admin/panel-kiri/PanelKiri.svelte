<script lang="ts">
	import { page } from '$app/state';
	import ItemPanelKiri from './ItemPanelKiri.svelte';

	const path = page.url.pathname;
</script>

<div class="fixed top-0 left-0 h-full w-48 pt-12">
	<div class="h-full overflow-y-auto bg-zinc-800 p-2 text-white">
		<ItemPanelKiri aktif={/^\/admin\/artikel/.test(path)}>Artikel</ItemPanelKiri>
	</div>
</div>
