<script lang="ts">
	interface Properti {
		class?: string;
		value: string;
		onkeydown?: (e: KeyboardEvent) => void;
		oninput?: (data: string) => void;
	}
	let { class: className = '', value, onkeydown, oninput }: Properti = $props();

	let elemen: HTMLParagraphElement;

	function input() {
		oninput?.(elemen.innerHTML);
	}
</script>

<p class="mb-3 text-lg {className}" contenteditable {onkeydown} oninput={input} bind:this={elemen}>
	{value}
</p>
