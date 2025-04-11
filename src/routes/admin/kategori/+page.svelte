<script lang="ts">
	import PanelKiri from '$lib/admin/panel-kiri/PanelKiri.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
</script>

<Navbar />
<PanelKiri />
<Halaman panelKiriTerbuka>
	<div class="flex justify-between gap-2">
		<button>Tambah Kategori Baru</button>
		<div>
			<input type="text" class="rounded border px-2 py-1" />
			<button>Cari</button>
		</div>
	</div>
	<table class="mt-4 w-full border">
		<thead class="border-b">
			<tr class="text-left">
				<th class="w-4 px-2">
					<input type="checkbox" />
				</th>
				<th>Nama</th>
				<th>Slug</th>
				<th>Jumlah Artikel</th>
			</tr>
		</thead>
		<tbody>
			<tr class="odd:bg-zinc-100">
				<td class="px-2">
					<input type="checkbox" />
				</td>
				<td>Proyek</td>
				<td>proyek</td>
				<td>0</td>
			</tr>
			<tr class="odd:bg-zinc-100">
				<td class="px-2">
					<input type="checkbox" />
				</td>
				<td>Proyek</td>
				<td>proyek</td>
				<td>0</td>
			</tr>
		</tbody>
	</table>
</Halaman>
