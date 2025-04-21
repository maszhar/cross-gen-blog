<script lang="ts">
	import Navbar from '../common/ui/navbar/Navbar.svelte';
	import NavbarLink from '../common/ui/navbar/NavbarLink.svelte';

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
