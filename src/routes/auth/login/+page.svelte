<script lang="ts">
	import H1 from '$lib/common/ui/H1.svelte';
	import Halaman from '$lib/customer/Halaman.svelte';
	import Navbar from '$lib/common/ui/navbar/Navbar.svelte';
</script>

<Navbar />
<Halaman>
	<form class="mx-auto w-full max-w-md rounded border border-zinc-300 p-8" method="post">
		<H1>Log In</H1>

		<div class="flex flex-col">
			<label for="email">Username/Email</label>
			<input type="email" id="email" name="email" class="rounded border px-2 py-1" required />
		</div>

		<div class="mt-4 flex flex-col">
			<label for="password">Password</label>
			<input
				type="password"
				name="password"
				class="rounded border px-2 py-1"
				required
				minlength="8"
			/>
		</div>

		<button
			type="submit"
			class="mt-8 w-full cursor-pointer rounded bg-sky-500 px-4 py-1 text-white"
		>
			Log In
		</button>
	</form>
</Halaman>
