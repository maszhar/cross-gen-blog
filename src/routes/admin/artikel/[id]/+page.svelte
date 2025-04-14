<script lang="ts">
	import { page } from '$app/state';
	import { Artikel } from '$lib/common/entitas/Artikel';
	import Button from '$lib/common/ui/Button.svelte';
	import Spinner from '$lib/common/ui/Spinner.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
	import { AdminPageData } from '../../AdminPageData';
	import EditorArtikel from '../EditorArtikel.svelte';

	const adminData = AdminPageData.instance;
	let loading = $state(true);

	const idArtikel = page.params.id;

	let submitting = $state(false);
	let editor: EditorArtikel | null = $state(null);
	let galat: string | null = $state(null);
	let artikelLama: Artikel | null = $state(null);

	async function muatData() {
		loading = true;
		try {
			const response = await fetch(`/api/admin/artikel/${idArtikel}`, {
				headers: {
					Authorization: `Bearer ${adminData.kodeAkses}`
				}
			});
			if (response.ok) {
				const dataResponse = await response.json();
				artikelLama = Artikel.deserialize(dataResponse);
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
	$effect(() => {
		muatData();
	});

	async function simpan() {
		const artikelBaru = editor?.ambilData();
		if (!artikelBaru) {
			return;
		}

		submitting = true;
		try {
			const response = await fetch(`/api/admin/artikel/${idArtikel}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${adminData.kodeAkses}`
				},
				body: JSON.stringify({
					judul: artikelBaru.judul,
					slug: artikelBaru.judul
						.toLowerCase()
						.replaceAll(/\s+/g, '-')
						.replaceAll(/[^A-Za-z0-9-]/g, ''),
					koleksiIsi: artikelBaru.koleksiIsi.map((isi) => isi.serialize()),
					isiDihapus: editor?.ambilKoleksiIsiYangDihapus().map((id) => id.toString())
				})
			});
			if (!response.ok) {
				alert(await response.text());
			}
		} catch (e: any) {
			console.error(e);
			alert(e.message);
		} finally {
			submitting = false;
		}
	}

	async function terbitkan() {
		console.log('JJJ');
	}
</script>

<svelte:head>
	<title>Edit Artikel - Admin MZHR</title>
</svelte:head>

<Navbar />

<div class="pt-12">
	<div class="flex">
		<div class="flex flex-grow flex-col gap-8 p-8">
			<div class="flex justify-between">
				<Button href="/admin/artikel">&leftarrow; Kembali</Button>
				<div class="flex gap-2">
					<Button onclick={simpan} loading={submitting || loading}>Simpan</Button>
					<Button onclick={terbitkan} loading={submitting || loading} disabled={artikelLama?.terbit}
						>Terbitkan</Button
					>
				</div>
			</div>
			{#if !loading && !galat && artikelLama}
				<EditorArtikel bind:this={editor} kunci={submitting} {artikelLama} />
			{:else if galat}
				{galat}
			{:else}
				<div class="flex justify-center">
					<Spinner />
				</div>
			{/if}
		</div>
		<div class="w-80 flex-none"></div>
	</div>
</div>
