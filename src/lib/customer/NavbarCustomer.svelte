<script lang="ts">
	import Navbar from './navbar/Navbar.svelte';
	import NavbarLink from './navbar/NavbarLink.svelte';

	interface Properti {
		linkKembali?: string;
	}
	const { linkKembali }: Properti = $props();
</script>

<Navbar {linkKembali}>
	{#snippet linkNavigasi()}
		<NavbarLink href="/artikel">Artikel</NavbarLink>
	{/snippet}
</Navbar>
