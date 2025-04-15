<script lang="ts">
	interface Properti {
		class?: string;
		value: string;
		autofocus?: boolean;
		onkeydown?: (e: KeyboardEvent) => void;
		oninput?: (data: string) => void;
	}
	let { class: className = '', value, onkeydown, oninput, autofocus = false }: Properti = $props();

	let elemen: HTMLParagraphElement;

	function input() {
		oninput?.(elemen.innerHTML);
	}

	$effect(() => {
		if (autofocus) {
			elemen.focus();
		}
	});
</script>

<p
	class="mb-5 text-justify break-words sm:mb-8 sm:text-lg {className}"
	contenteditable
	{onkeydown}
	oninput={input}
	bind:this={elemen}
>
	{value}
</p>
