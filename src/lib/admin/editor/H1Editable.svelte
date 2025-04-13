<script lang="ts">
	interface Properti {
		class?: string;
		value?: string;
		kunci?: boolean;
	}
	let { class: className = '', value = $bindable(''), kunci = false }: Properti = $props();
</script>

{#if !kunci}
	<h1
		class="mb-12 text-3xl font-bold sm:text-5xl {className}"
		contenteditable
		bind:innerHTML={value}
	></h1>
{:else}
	<h1 class="mb-12 text-3xl font-bold sm:text-5xl {className}">{value}</h1>
{/if}
