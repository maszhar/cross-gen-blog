<script lang="ts">
	import ItemPanelKiri from './ItemPanelKiri.svelte';
</script>

<div class="fixed top-0 left-0 z-30 h-full w-48 pt-12">
	<div class="flex h-full flex-col gap-1 overflow-y-auto bg-zinc-800 p-2 text-white">
		<ItemPanelKiri href="/admin/artikel">Artikel</ItemPanelKiri>
		<ItemPanelKiri href="/admin/kategori">Kategori</ItemPanelKiri>
	</div>
</div>
