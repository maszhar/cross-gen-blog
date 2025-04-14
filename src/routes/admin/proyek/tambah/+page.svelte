<script lang="ts">
	import { goto } from '$app/navigation';
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import Button from '$lib/common/ui/Button.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
	import { AdminPageData } from '../../AdminPageData';
	import FormProyek from '../FormProyek.svelte';

	const dataAdmin = AdminPageData.instance;
	let submitting = $state(false);

	async function submit(data: any) {
		submitting = true;
		try {
			const response = await fetch('/api/admin/proyek', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${dataAdmin.kodeAkses}`
				},
				body: JSON.stringify({
					nama: data.nama,
					slug: data.slug
				})
			});

			if (response.ok) {
				goto('/admin/proyek');
			} else {
				alert(await response.text());
			}
		} catch (e: any) {
			alert(e.message);
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Tambah Proyek - Admin MZHR</title>
</svelte:head>

<Navbar />
<PanelKiri />
<Halaman panelKiriTerbuka>
	<Button href="/admin/proyek">&leftarrow; Kembali</Button>
	<FormProyek {submitting} onSubmit={submit} />
</Halaman>
