<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import { Kategori } from '$lib/common/entitas/Kategori';
	import Button from '$lib/common/ui/Button.svelte';
	import Spinner from '$lib/common/ui/Spinner.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import KontainerKonten from '$lib/customer/KontainerKonten.svelte';
	import Navbar from '$lib/common/ui/navbar/Navbar.svelte';
	import FormKategori from '../../FormKategori.svelte';

	let loading = $state(true);
	let submitting = $state(false);
	let galat: string | null = $state(null);

	const idKategori = page.params.id;
	let kategori: Kategori | null = $state(null);

	async function muatData() {
		loading = true;
		try {
			const response = await fetch(`/api/admin/kategori/${idKategori}`);
			if (response.ok) {
				const data = await response.json();
				kategori = Kategori.deserialize(data);
			} else {
				if (response.status === 404) {
					galat = 'Kategori tidak ditemukan';
				} else {
					galat = await response.text();
				}
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

	async function submit(data: any) {
		submitting = true;
		try {
			const response = await fetch(`/api/admin/kategori/${idKategori}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					nama: data.nama,
					slug: data.slug
				})
			});

			if (response.ok) {
				goto('/admin/kategori');
			}
		} catch (e) {
			console.error(e);
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Edit Kategori - Admin MZHR</title>
</svelte:head>

<Navbar />
<PanelKiri />
<Halaman panelKiriTerbuka>
	<Button href="/admin/kategori">&leftarrow; Kembali</Button>
	{#if !loading && !galat && kategori}
		<FormKategori {submitting} onSubmit={submit} dataLama={kategori} />
	{:else}
		<div class="mx-auto mt-8 max-w-lg">
			<KontainerKonten class="flex items-center justify-center">
				{#if loading}
					<Spinner />
				{:else if galat}
					{galat}
				{/if}
			</KontainerKonten>
		</div>
	{/if}
</Halaman>
