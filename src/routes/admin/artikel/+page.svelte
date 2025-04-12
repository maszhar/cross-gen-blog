<script lang="ts">
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import Button from '$lib/common/ui/Button.svelte';
	import Spinner from '$lib/common/ui/Spinner.svelte';
	import Table from '$lib/common/ui/Table.svelte';
	import TableColumn from '$lib/common/ui/TableColumn.svelte';
	import TableHead from '$lib/common/ui/TableHead.svelte';
	import TableRow from '$lib/common/ui/TableRow.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';

	const jumlahKolom = 5;
	let loading = $state(true);
</script>

<svelte:head>
	<title>Artikel - Admin MZHR</title>
</svelte:head>

<Navbar />
<PanelKiri />
<Halaman panelKiriTerbuka>
	<div class="flex justify-between gap-2">
		<Button href="/admin/artikel/tambah">Tambah Artikel Baru</Button>
		<div class="flex gap-1">
			<input type="text" class="rounded border px-2 py-1" />
			<Button>Cari</Button>
		</div>
	</div>
	<Table class="mt-4">
		{#snippet head()}
			<TableHead class="w-10">
				<input type="checkbox" />
			</TableHead>
			<TableHead class="w-full">Nama</TableHead>
			<TableHead class="min-w-72">Slug</TableHead>
			<TableHead class="w-24">Pembaca</TableHead>
			<TableHead class="w-24">Komentar</TableHead>
		{/snippet}
		{#snippet body()}
			{#if !loading}
				<!-- {#if koleksiKategori.length === 0}
					<TableRow>
						<TableColumn colspan={jumlahKolom} class="text-center italic">
							Belum ada kategori
						</TableColumn>
					</TableRow>
				{/if} -->
			{:else}
				<TableRow>
					<TableColumn colspan={jumlahKolom} class="text-center">
						<Spinner class="inline-block" />
					</TableColumn>
				</TableRow>
			{/if}
		{/snippet}
	</Table>
</Halaman>
