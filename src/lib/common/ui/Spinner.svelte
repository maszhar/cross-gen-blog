<script lang="ts">
	interface Properti {
		class?: string;
	}
	const { class: className = '' }: Properti = $props();
</script>

<div
	class="h-6 w-6 animate-spin rounded-full border-r-2 border-l-2 border-sky-300 {className}"
></div>
