<script lang="ts">
	interface Properti {
		linkKembali?: string;
	}
	const { linkKembali }: Properti = $props();
</script>

<nav class="fixed top-0 left-0 z-40 flex h-12 w-full items-center bg-zinc-800 px-12 text-white">
	<div class="flex items-center gap-2">
		{#if linkKembali}
			<a href={linkKembali} class="px-4 text-lg">&LeftAngleBracket;</a>
		{/if}
		<a href="/" class="text-3xl font-bold tracking-wide">MZHR</a>
	</div>
</nav>
