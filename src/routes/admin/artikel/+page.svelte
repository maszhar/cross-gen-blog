<script lang="ts">
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import { Artikel } from '$lib/common/entitas/Artikel';
	import Button from '$lib/common/ui/Button.svelte';
	import ButtonInTable from '$lib/common/ui/ButtonInTable.svelte';
	import Spinner from '$lib/common/ui/Spinner.svelte';
	import Table from '$lib/common/ui/Table.svelte';
	import TableColumn from '$lib/common/ui/TableColumn.svelte';
	import TableHead from '$lib/common/ui/TableHead.svelte';
	import TableRow from '$lib/common/ui/TableRow.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
	import { AdminPageData } from '../AdminPageData';

	const adminData = AdminPageData.instance;
	const jumlahKolom = 6;
	let loading = $state(true);

	let koleksiArtikel: Artikel[] = $state([]);
	let galat: string | null = $state(null);

	async function muatData() {
		loading = true;
		try {
			const response = await fetch('/api/admin/artikel', {
				headers: {
					Authorization: `Bearer ${adminData.kodeAkses}`
				}
			});
			if (response.ok) {
				const dataResponse = await response.json();
				koleksiArtikel = (dataResponse as any[]).map((item) => Artikel.deserialize(item));
				galat = null;
			} else {
				koleksiArtikel = [];
				galat = await response.text();
			}
		} catch (e: any) {
			galat = e.message;
		} finally {
			loading = false;
		}
	}
	$effect(() => {
		muatData();
	});

	async function hapusArtikel(indeks: number) {
		if (!confirm(`Yakin ingin menghapus artikel '${koleksiArtikel[indeks].judul}'`)) {
			return;
		}

		try {
			const idArtikel = koleksiArtikel[indeks].id;
			const response = await fetch(`/api/admin/artikel/${idArtikel.toString()}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${adminData.kodeAkses}`
				}
			});
			if (response.ok) {
				koleksiArtikel = koleksiArtikel.filter((artikel) => artikel.id !== idArtikel);
			} else {
				if (response.status === 404) {
					alert('Artikel tidak ditemukan');
				} else {
					alert(await response.text());
				}
			}
		} catch (e: any) {
			alert(e.message);
		}
	}
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
			<TableHead>Judul</TableHead>
			<TableHead>Slug</TableHead>
			<TableHead class="w-32">Status Terbit</TableHead>
			<TableHead class="w-24">Pembaca</TableHead>
			<TableHead class="w-24">Komentar</TableHead>
		{/snippet}
		{#snippet body()}
			{#if !loading && !galat}
				{#each koleksiArtikel as artikel, indeks}
					<TableRow>
						<TableColumn>
							<input type="checkbox" />
						</TableColumn>
						<TableColumn>
							<div>
								<div>{artikel.judul}</div>
								<div class="flex gap-2">
									<ButtonInTable href={`/admin/artikel/${artikel.id}`}>Edit</ButtonInTable>
									<ButtonInTable color="red" onclick={() => hapusArtikel(indeks)}>
										Hapus
									</ButtonInTable>
								</div>
							</div>
						</TableColumn>
						<TableColumn>{artikel.slug}</TableColumn>
						<TableColumn
							class={`font-medium ${artikel.terbit ? 'text-green-600' : 'text-orange-600'}`}
						>
							{#if artikel.terbit}
								Terbit
							{:else}
								Belum Terbit
							{/if}
						</TableColumn>
						<TableColumn>-</TableColumn>
						<TableColumn>-</TableColumn>
					</TableRow>
				{/each}
				{#if koleksiArtikel.length === 0}
					<TableRow>
						<TableColumn colspan={jumlahKolom} class="text-center italic">
							Belum ada artikel
						</TableColumn>
					</TableRow>
				{/if}
			{:else}
				<TableRow>
					<TableColumn colspan={jumlahKolom} class="text-center">
						{#if galat}
							{galat}
						{:else}
							<Spinner class="inline-block" />
						{/if}
					</TableColumn>
				</TableRow>
			{/if}
		{/snippet}
	</Table>
</Halaman>
