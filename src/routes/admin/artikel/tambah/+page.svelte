<script lang="ts">
	import Button from '$lib/common/ui/Button.svelte';
	import Navbar from '$lib/common/ui/navbar/Navbar.svelte';
	import { AdminPageData } from '../../AdminPageData';
	import EditorArtikel from '../EditorArtikel.svelte';

	const adminData = AdminPageData.instance;
	let submitting = $state(false);
	let editor: EditorArtikel;

	async function simpan() {
		const artikelBaru = editor.ambilData();
		if (!artikelBaru) {
			return;
		}

		submitting = true;
		try {
			const response = await fetch(`/api/admin/artikel`, {
				method: 'POST',
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
					koleksiIsi: artikelBaru.koleksiIsi.map((isi) => isi.serialize())
				})
			});
			if (response.ok) {
				const dataResponse = await response.json();
				const idBaru: string = dataResponse.id;

				window.location.replace(`/admin/artikel/${idBaru}`);
			} else {
				alert(await response.text());
			}
		} catch (e: any) {
			console.error(e);
			alert(e.message);
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Tambah Artikel - Admin MZHR</title>
</svelte:head>

<Navbar />

<div class="pt-12">
	<div class="flex">
		<div class="flex flex-grow flex-col gap-8 p-8">
			<div class="flex justify-between">
				<Button href="/admin/artikel">&leftarrow; Kembali</Button>
				<div>
					<Button onclick={simpan} loading={submitting}>Simpan</Button>
				</div>
			</div>
			<EditorArtikel bind:this={editor} kunci={submitting} />
		</div>
		<div class="w-80 flex-none"></div>
	</div>
</div>
