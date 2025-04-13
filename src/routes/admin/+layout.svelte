<script lang="ts">
	import type { Snippet } from 'svelte';
	import { AdminPageData } from './AdminPageData';
	import { goto } from '$app/navigation';
	import Spinner from '$lib/common/ui/Spinner.svelte';

	let siap = $state(false);
	const adminData = AdminPageData.instance;

	interface Properti {
		children?: Snippet;
	}
	const { children }: Properti = $props();

	async function persiapkan() {
		if (adminData.kodeAkses && adminData.terotentikasi) {
			siap = true;
		} else {
			const kodeAkses = localStorage.getItem('kodeAkses');
			if (!kodeAkses) {
				goto('/auth/login/admin');
			}

			try {
				const respon = await fetch('/api/auth/admin', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						kodeAkses: kodeAkses
					})
				});
				if (respon.ok) {
					adminData.terotentikasi = true;
					adminData.kodeAkses = kodeAkses;
					siap = true;
				} else {
					if (respon.status === 401) {
						localStorage.removeItem('kodeAkses');
						adminData.terotentikasi = false;
						adminData.kodeAkses = null;
					} else {
						alert(await respon.text());
					}
				}
			} catch (e: any) {
				alert(e.message);
			}
		}
	}
	$effect(() => {
		persiapkan();
	});
</script>

{#if siap}
	{@render children?.()}
{:else}
	<Spinner />
{/if}
