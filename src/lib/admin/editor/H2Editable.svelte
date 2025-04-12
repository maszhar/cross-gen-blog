<script lang="ts">
	interface Properti {
		class?: string;
		value?: string;
	}
	let { class: className = '', value = $bindable('') }: Properti = $props();
</script>

<h2 class="mb-12 text-5xl font-bold {className}" contenteditable bind:innerHTML={value}></h2>
