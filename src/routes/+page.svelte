<script lang="ts">
	import H2 from '$lib/common/ui/H2.svelte';
	import P from '$lib/common/ui/P.svelte';
	import HalamanCustomer from '$lib/customer/HalamanCustomer.svelte';
	import KontainerKonten from '$lib/customer/KontainerKonten.svelte';
	import Navbar from '$lib/customer/navbar/Navbar.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>MZHR - Mari Belajar untuk Memudahkan Kehidupan</title>
</svelte:head>

<Navbar />

<HalamanCustomer {data}>
	<KontainerKonten>
		<H2>Selamat Datang</H2>

		<P>
			Hai, saya Fikri Mustofa. Saya adalah penulis blog ini. Blog akan berisi tentang teknologi,
			panduan, dan cerita pengalaman saya.
		</P>

		<P>Silakan klik tombol di bawah untuk memulai:</P>
		<a href="/artikel">Mulai</a>
		<br /><br />
		<P>Jika membutuhkan komunikasi dengan saya, silakan hubungi kontak berikut :</P>
		<ul>
			<li>Email: fikrimustofa024@gmail.com</li>
			<li>WhatsApp: +62 821 4252 2975</li>
		</ul>
	</KontainerKonten>
</HalamanCustomer>
