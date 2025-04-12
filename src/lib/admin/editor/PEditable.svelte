<script lang="ts">
	interface Properti {
		class?: string;
		value?: string;
		onkeydown?: (e: KeyboardEvent) => void;
	}
	let { class: className = '', value = $bindable(''), onkeydown }: Properti = $props();
</script>

<p class="mb-3 text-lg {className}" contenteditable bind:innerHTML={value} {onkeydown}></p>
