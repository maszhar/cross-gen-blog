<script lang="ts">
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import Button from '$lib/common/ui/Button.svelte';
	import H3 from '$lib/common/ui/H3.svelte';
	import Input from '$lib/common/ui/Input.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import KontainerKonten from '$lib/customer/KontainerKonten.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
</script>

<Navbar />
<PanelKiri />
<Halaman panelKiriTerbuka>
	<div class="mx-auto max-w-lg">
		<KontainerKonten>
			<H3>Tambah Kategori</H3>

			<form method="post" class="flex flex-col">
				<Input label="Nama" required />
				<Input label="Slug" required class="mt-4" />
				<Button type="submit" class="mt-12">Simpan</Button>
			</form>
		</KontainerKonten>
	</div>
</Halaman>
