<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Properti {
		class?: string;
		head?: Snippet;
		body?: Snippet;
	}
	const { class: className = '', head, body }: Properti = $props();
</script>

<div class="w-full overflow-hidden rounded border {className}">
	<table class="w-full">
		{#if head}
			<thead class="border-b">
				<tr class="text-left">
					{@render head?.()}
				</tr>
			</thead>
		{/if}
		{#if body}
			<tbody>
				{@render body?.()}
			</tbody>
		{/if}
	</table>
</div>
