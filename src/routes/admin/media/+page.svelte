<script lang="ts">
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import { Proyek } from '$lib/common/entitas/Proyek';
	import Button from '$lib/common/ui/Button.svelte';
	import Spinner from '$lib/common/ui/Spinner.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import Navbar from '$lib/common/ui/navbar/Navbar.svelte';
	import { AdminPageData } from '../AdminPageData';

	const dataAdmin = AdminPageData.instance;

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
	<title>Media - Admin MZHR</title>
</svelte:head>

<Navbar />
<PanelKiri />
<Halaman panelKiriTerbuka>
	<div class="flex justify-between gap-2">
		<Button href="/admin/proyek/tambah">Tambah Media</Button>
		<div class="flex gap-1">
			<input type="text" class="rounded border px-2 py-1" />
			<Button>Cari</Button>
		</div>
	</div>
	{#if !loading}
		<div class="">Hore</div>
	{:else}
		<div class="px-4 py-16 text-center">
			{#if loading}
				<Spinner />
				<em>Belum ada media</em>
			{/if}
		</div>
	{/if}
</Halaman>
