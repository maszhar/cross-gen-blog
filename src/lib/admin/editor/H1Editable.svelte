<script lang="ts">
	interface Properti {
		class?: string;
		value?: string;
		kunci?: boolean;
	}
	let { class: className = '', value = $bindable(''), kunci = false }: Properti = $props();
</script>

{#if !kunci}
	<h1 class="mb-12 text-5xl font-bold {className}" contenteditable bind:innerHTML={value}></h1>
{:else}
	<h1 class="mb-12 text-5xl font-bold {className}">{value}</h1>
{/if}
