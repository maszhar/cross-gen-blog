<script lang="ts">
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import { Proyek } from '$lib/common/entitas/Proyek';
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

	const dataAdmin = AdminPageData.instance;
	const jumlahKolom = 4;
	let loading = $state(true);
	let koleksiProyek: Proyek[] = $state([]);
	let galat: string | null = $state(null);

	async function dapatkanKoleksiProyek() {
		loading = true;
		try {
			const response = await fetch('/api/admin/proyek', {
				headers: {
					Authorization: `Bearer ${dataAdmin.kodeAkses}`
				}
			});
			if (response.ok) {
				const data = await response.json();
				koleksiProyek = (data as any[]).map((item) => Proyek.deserialize(item));
				galat = null;
			} else {
				galat = await response.text();
			}
		} catch (e: any) {
			galat = e.message;
		} finally {
			loading = false;
		}
	}

	async function hapusProyek(indeks: number) {
		if (!confirm(`Yakin ingin menghapus proyek '${koleksiProyek[indeks].nama}'`)) {
			return;
		}

		try {
			const idProyek = koleksiProyek[indeks].id;
			const response = await fetch(`/api/admin/proyek/${idProyek.toString()}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${dataAdmin.kodeAkses}`
				}
			});
			if (response.ok) {
				koleksiProyek = koleksiProyek.filter((proyek) => proyek.id !== idProyek);
			} else {
				if (response.status === 404) {
					alert('Proyek tidak ditemukan');
				} else {
					alert(await response.text());
				}
			}
		} catch (e: any) {
			alert(e.message);
		}
	}

	$effect(() => {
		dapatkanKoleksiProyek();
	});
</script>

<svelte:head>
	<title>Proyek - Admin MZHR</title>
</svelte:head>

<Navbar />
<PanelKiri />
<Halaman panelKiriTerbuka>
	<div class="flex justify-between gap-2">
		<Button href="/admin/proyek/tambah">Tambah Proyek Baru</Button>
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
			{#if !loading && !galat}
				{#each koleksiProyek as proyek, indeks (proyek.id)}
					<TableRow>
						<TableColumn class="px-2">
							<input type="checkbox" />
						</TableColumn>
						<TableColumn>
							<div>
								<div>{proyek.nama}</div>
								<div class="flex gap-2">
									<ButtonInTable href={`/admin/proyek/${proyek.id}`}>Edit</ButtonInTable>
									<ButtonInTable color="red" onclick={() => hapusProyek(indeks)}>
										Hapus
									</ButtonInTable>
								</div>
							</div>
						</TableColumn>
						<TableColumn>{proyek.slug}</TableColumn>
						<TableColumn>0</TableColumn>
					</TableRow>
				{/each}
				{#if koleksiProyek.length === 0}
					<TableRow>
						<TableColumn colspan={jumlahKolom} class="text-center italic">
							Belum ada proyek
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
