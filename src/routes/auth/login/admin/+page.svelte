<script lang="ts">
	import { goto } from '$app/navigation';
	import H1 from '$lib/common/ui/H1.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
	import { AdminPageData } from '../../../admin/AdminPageData';

	const adminData = AdminPageData.instance;

	let kodeAkses = $state('');

	async function submit(e: SubmitEvent) {
		e.preventDefault();

		try {
			const respon = await fetch('/api/auth/admin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					kodeAkses: kodeAkses
				})
			});
			if (respon.ok) {
				localStorage.setItem('kodeAkses', kodeAkses);
				adminData.kodeAkses = kodeAkses;
				adminData.terotentikasi = true;
				goto('/admin/artikel');
			} else {
				if (respon.status === 401) {
					alert('Kode Salah');
				} else {
					alert(await respon.text());
				}
			}
		} catch (e: any) {
			alert(e.message);
		}
	}
</script>

<Navbar />
<Halaman>
	<form class="mx-auto w-full max-w-md rounded border border-zinc-300 p-8" onsubmit={submit}>
		<H1>Log In Admin</H1>

		<div class="mt-4 flex flex-col">
			<label for="code">Kode Akses</label>
			<input
				type="password"
				id="code"
				name="code"
				bind:value={kodeAkses}
				class="rounded border px-2 py-1"
				required
				minlength="8"
			/>
		</div>

		<button
			type="submit"
			class="mt-8 w-full cursor-pointer rounded bg-sky-500 px-4 py-1 text-white"
		>
			Log In
		</button>
	</form>
</Halaman>
