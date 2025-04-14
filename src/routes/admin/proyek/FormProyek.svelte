<script lang="ts">
	import type { Kategori } from '$lib/common/entitas/Kategori';
	import Button from '$lib/common/ui/Button.svelte';
	import H3 from '$lib/common/ui/H3.svelte';
	import Input from '$lib/common/ui/Input.svelte';
	import KontainerKonten from '$lib/customer/KontainerKonten.svelte';

	interface Properti {
		dataLama?: Kategori;
		submitting?: boolean;
		onSubmit: (data: any) => void;
	}
	const { dataLama, submitting = false, onSubmit }: Properti = $props();

	let nama = $state('');
	let slug = $state('');

	async function submit(e: SubmitEvent) {
		e.preventDefault();

		onSubmit({
			nama: nama,
			slug: slug
		});
	}

	$effect(() => {
		if (dataLama) {
			nama = dataLama.nama;
			slug = dataLama.slug;
		}
	});
</script>

<div class="mx-auto mt-8 max-w-lg">
	<KontainerKonten>
		<H3>{dataLama ? 'Edit' : 'Tambah'} Proyek</H3>

		<form method="post" class="flex flex-col" onsubmit={submit}>
			<Input label="Nama" bind:value={nama} required />
			<Input label="Slug" bind:value={slug} required class="mt-4" />
			<Button loading={submitting} type="submit" class="mt-12">Simpan</Button>
		</form>
	</KontainerKonten>
</div>
