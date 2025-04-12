<script lang="ts">
	import { goto } from '$app/navigation';
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import Button from '$lib/common/ui/Button.svelte';
	import H3 from '$lib/common/ui/H3.svelte';
	import Input from '$lib/common/ui/Input.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import KontainerKonten from '$lib/customer/KontainerKonten.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';

	let submitting = $state(false);

	let nama = $state('');
	let slug = $state('');

	async function submit(e: SubmitEvent) {
		e.preventDefault();

		submitting = true;
		try {
			const response = await fetch('/api/admin/kategori', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					nama: nama,
					slug: slug
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

<Navbar />
<PanelKiri />
<Halaman panelKiriTerbuka>
	<div class="mx-auto max-w-lg">
		<KontainerKonten>
			<H3>Tambah Kategori</H3>

			<form method="post" class="flex flex-col" onsubmit={submit}>
				<Input label="Nama" bind:value={nama} required />
				<Input label="Slug" bind:value={slug} required class="mt-4" />
				<Button loading={submitting} type="submit" class="mt-12">Simpan</Button>
			</form>
		</KontainerKonten>
	</div>
</Halaman>
