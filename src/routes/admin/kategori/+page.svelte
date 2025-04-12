<script lang="ts">
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import Button from '$lib/common/ui/Button.svelte';
	import Table from '$lib/common/ui/Table.svelte';
	import TableColumn from '$lib/common/ui/TableColumn.svelte';
	import TableHead from '$lib/common/ui/TableHead.svelte';
	import TableRow from '$lib/common/ui/TableRow.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
</script>

<svelte:head>
	<title>Kategori - Admin MZHR</title>
</svelte:head>

<Navbar />
<PanelKiri />
<Halaman panelKiriTerbuka>
	<div class="flex justify-between gap-2">
		<Button href="/admin/kategori/tambah">Tambah Kategori Baru</Button>
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
			<TableHead>Nama</TableHead>
			<TableHead>Slug</TableHead>
			<TableHead>Jumlah Artikel</TableHead>
		{/snippet}
		{#snippet body()}
			<TableRow>
				<TableColumn class="px-2">
					<input type="checkbox" />
				</TableColumn>
				<TableColumn>Proyek</TableColumn>
				<TableColumn>proyek</TableColumn>
				<TableColumn>0</TableColumn>
			</TableRow>
			<TableRow>
				<TableColumn class="px-2">
					<input type="checkbox" />
				</TableColumn>
				<TableColumn>Proyek</TableColumn>
				<TableColumn>proyek</TableColumn>
				<TableColumn>0</TableColumn>
			</TableRow>
		{/snippet}
	</Table>
</Halaman>
