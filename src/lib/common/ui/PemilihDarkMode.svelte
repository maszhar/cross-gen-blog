<script lang="ts">
	import { Konteks } from '../entitas/Konteks.svelte';
	import IkonTemaGelap from './icon/IkonTemaGelap.svelte';
	import IkonTemaTerang from './icon/IkonTemaTerang.svelte';

	let elemenTombol: HTMLButtonElement;
	let elemenPilihanTema: HTMLDivElement | null = $state(null);

	let pilihanTemaTerbuka = $state(false);

	function bukaPilihanTema(): void {
		pilihanTemaTerbuka = true;
		window.addEventListener('click', tanganiKlikSaatTemaTerbuka);
	}

	function tutupPilihanTema(): void {
		pilihanTemaTerbuka = false;
		window.removeEventListener('click', tanganiKlikSaatTemaTerbuka);
	}

	function tanganiKlikSaatTemaTerbuka(event: MouseEvent): void {
		tutupPilihanTema();
	}

	function balikBukaPilihanTema(e: MouseEvent): void {
		e.stopPropagation();
		if (pilihanTemaTerbuka) {
			tutupPilihanTema();
		} else {
			bukaPilihanTema();
		}
	}
</script>

<div class="relative">
	<button bind:this={elemenTombol} class="cursor-pointer" onclick={balikBukaPilihanTema}>
		{#if Konteks.dapatkanTema()}
			<IkonTemaGelap class="h-full" />
		{:else}
			<IkonTemaTerang class="h-full" />
		{/if}
	</button>

	{#if pilihanTemaTerbuka}
		<div
			class="absolute top-12 right-0 z-10 flex min-w-40 flex-col gap-2 rounded-sm bg-green-700 p-2 dark:border dark:border-zinc-600 dark:bg-zinc-800"
			bind:this={elemenPilihanTema}
		>
			<button
				onclick={(): void => Konteks.aturTema(false)}
				class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left hover:bg-green-900 dark:hover:bg-zinc-600"
			>
				<IkonTemaTerang class="h-full" />
				<div>Terang</div>
			</button>
			<button
				onclick={(): void => Konteks.aturTema(true)}
				class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left hover:bg-green-900 dark:hover:bg-zinc-600"
			>
				<IkonTemaGelap class="h-full" />
				<div>Gelap</div>
			</button>
		</div>
	{/if}
</div>
