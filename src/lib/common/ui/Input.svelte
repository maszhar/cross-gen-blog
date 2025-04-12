<script lang="ts">
	interface Properti {
		label?: string;
		type?: 'text' | 'email' | 'number' | 'password';
		name?: string;
		class?: string;
		required?: boolean;
	}
	const { label, type = 'text', name, class: className = '', required }: Properti = $props();

	const id = `${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
</script>

<div class="flex flex-col {className}">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<input {type} {id} {name} class="rounded border px-2 py-1" {required} />
</div>
