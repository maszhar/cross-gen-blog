<script lang="ts">
	import Button from '$lib/common/ui/Button.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
	import EditorArtikel from '../EditorArtikel.svelte';
</script>

<Navbar />

<div class="pt-12">
	<div class="flex">
		<div class="flex flex-grow flex-col gap-8 p-8">
			<Button class="self-start" href="/admin/artikel">&leftarrow; Kembali</Button>
			<EditorArtikel />
		</div>
		<div class="w-80 flex-none"></div>
	</div>
</div>
