<script lang="ts">
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import { Kategori } from '$lib/common/entitas/Kategori';
	import Button from '$lib/common/ui/Button.svelte';
	import ButtonInTable from '$lib/common/ui/ButtonInTable.svelte';
	import Spinner from '$lib/common/ui/Spinner.svelte';
	import Table from '$lib/common/ui/Table.svelte';
	import TableColumn from '$lib/common/ui/TableColumn.svelte';
	import TableHead from '$lib/common/ui/TableHead.svelte';
	import TableRow from '$lib/common/ui/TableRow.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import Navbar from '$lib/common/ui/navbar/Navbar.svelte';

	const jumlahKolom = 4;
	let loading = $state(true);
	let koleksiKategori: Kategori[] = $state([]);

	async function dapatkanKoleksiKategori() {
		loading = true;
		try {
			const response = await fetch('/api/admin/kategori');
			if (response.ok) {
				const data = await response.json();
				koleksiKategori = (data as any[]).map((item) => Kategori.deserialize(item));
			}
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	}

	async function hapusKategori(indeks: number) {
		if (!confirm(`Yakin ingin menghapus kategori '${koleksiKategori[indeks].nama}'`)) {
			return;
		}

		try {
			const idKategori = koleksiKategori[indeks].id;
			const response = await fetch(`/api/admin/kategori/${idKategori.toString()}`, {
				method: 'DELETE'
			});
			if (response.ok) {
				koleksiKategori = koleksiKategori.filter((kategori) => kategori.id !== idKategori);
			} else {
				if (response.status === 404) {
					alert('Kategori tidak ditemukan');
				} else {
					alert(await response.text());
				}
			}
		} catch (e: any) {
			alert(e.message);
		}
	}

	$effect(() => {
		dapatkanKoleksiKategori();
	});
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
			{#if !loading}
				{#each koleksiKategori as kategori, indeks}
					<TableRow>
						<TableColumn class="px-2">
							<input type="checkbox" />
						</TableColumn>
						<TableColumn>
							<div>
								<div>{kategori.nama}</div>
								<div class="flex gap-2">
									<ButtonInTable href={`/admin/kategori/${kategori.id}/${kategori.slug}`}>
										Edit
									</ButtonInTable>
									<ButtonInTable color="red" onclick={() => hapusKategori(indeks)}>
										Hapus
									</ButtonInTable>
								</div>
							</div>
						</TableColumn>
						<TableColumn>{kategori.slug}</TableColumn>
						<TableColumn>0</TableColumn>
					</TableRow>
				{/each}
				{#if koleksiKategori.length === 0}
					<TableRow>
						<TableColumn colspan={jumlahKolom} class="text-center italic">
							Belum ada kategori
						</TableColumn>
					</TableRow>
				{/if}
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
