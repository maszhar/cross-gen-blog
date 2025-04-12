<script lang="ts">
	import { goto } from '$app/navigation';
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import Button from '$lib/common/ui/Button.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
	import FormKategori from '../FormKategori.svelte';

	let submitting = $state(false);

	async function submit(data: any) {
		submitting = true;
		try {
			const response = await fetch('/api/admin/kategori', {
				method: 'POST',
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
	<title>Tambah Kategori - Admin MZHR</title>
</svelte:head>

<Navbar />
<PanelKiri />
<Halaman panelKiriTerbuka>
	<Button href="/admin/kategori">&leftarrow; Kembali</Button>
	<FormKategori {submitting} onSubmit={submit} />
</Halaman>
