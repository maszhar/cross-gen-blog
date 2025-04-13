<script lang="ts">
	import Button from '$lib/common/ui/Button.svelte';
	import H1 from '$lib/common/ui/H1.svelte';
	import P from '$lib/common/ui/P.svelte';
	import HalamanCustomer from '$lib/customer/HalamanCustomer.svelte';
	import KontainerKonten from '$lib/customer/KontainerKonten.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>MZHR - Belajar untuk Memudahkan Kehidupan</title>
	<meta name="description" content="Blog akan berisi tentang proyek IT dan pembelajaran." />
</svelte:head>

<Navbar />

<HalamanCustomer {data}>
	<KontainerKonten>
		<H1>Selamat Datang</H1>

		<P>
			Hai, saya Fikri Mustofa. Saya adalah penulis blog ini. Blog akan berisi tentang proyek IT dan
			pembelajaran.
		</P>

		<P>Silakan klik tombol di bawah untuk memulai:</P>
		<Button href="/artikel">Mulai</Button>
		<br /><br />
		<P>Jika membutuhkan komunikasi dengan saya, silakan hubungi kontak berikut :</P>
		<ul>
			<li>Email: fikrimustofa024@gmail.com</li>
			<li>WhatsApp: +62 821 4252 2975</li>
		</ul>
	</KontainerKonten>
</HalamanCustomer>
