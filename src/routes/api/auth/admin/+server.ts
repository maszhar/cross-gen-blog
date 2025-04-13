import { env } from '$env/dynamic/private';

export async function POST({ request }) {
	const kodeAkses = env.ADMIN_CODE;

	try {
		const dataRequest = await request.json();
		const kodeDariPengguna = dataRequest.kodeAkses;
		if (kodeAkses !== kodeDariPengguna) {
			return new Response(
				JSON.stringify({
					error: 'Kode salah'
				}),
				{
					status: 401,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}

		return new Response(undefined, {
			status: 204
		});
	} catch (e: any) {
		return new Response(
			JSON.stringify({
				error: e.message
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
}
