<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import { Proyek } from '$lib/common/entitas/Proyek';
	import Button from '$lib/common/ui/Button.svelte';
	import Spinner from '$lib/common/ui/Spinner.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import KontainerKonten from '$lib/customer/KontainerKonten.svelte';
	import Navbar from '$lib/common/ui/navbar/Navbar.svelte';
	import { AdminPageData } from '../../AdminPageData';
	import FormProyek from '../FormProyek.svelte';

	const dataAdmin = AdminPageData.instance;
	let loading = $state(true);
	let submitting = $state(false);
	let galat: string | null = $state(null);

	const idProyek = page.params.id;
	let proyek: Proyek | null = $state(null);

	async function muatData() {
		loading = true;
		try {
			const response = await fetch(`/api/admin/proyek/${idProyek}`, {
				headers: {
					Authorization: `Bearer ${dataAdmin.kodeAkses}`
				}
			});
			if (response.ok) {
				const data = await response.json();
				proyek = Proyek.deserialize(data);
			} else {
				if (response.status === 404) {
					galat = 'Proyek tidak ditemukan';
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
			const response = await fetch(`/api/admin/proyek/${idProyek}`, {
				method: 'PUT',
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
	<title>Edit Proyek - Admin MZHR</title>
</svelte:head>

<Navbar />
<PanelKiri />
<Halaman panelKiriTerbuka>
	<Button href="/admin/proyek">&leftarrow; Kembali</Button>
	{#if !loading && !galat && proyek}
		<FormProyek {submitting} onSubmit={submit} dataLama={proyek} />
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
