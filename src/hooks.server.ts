import type { Handle } from '@sveltejs/kit';
import mariadb from 'mariadb';
import { env } from '$env/dynamic/private';

let db: mariadb.Connection | undefined = undefined;
let galatDb: Error | undefined = undefined;

try {
	db = await mariadb.createConnection({
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		host: env.DB_HOST,
		port: parseInt(env.DB_PORT),
		database: env.DB_DATABASE
	});
	galatDb = undefined;
} catch (e: any) {
	db = undefined;
	galatDb = e;
}

function cekOtentikasiAdmin(request: Request): boolean {
	let authorization = '';
	if (request.headers.has('Authorization')) {
		authorization = request.headers.get('Authorization') ?? '';
	} else if (request.headers.has('authorization')) {
		authorization = request.headers.get('authorization') ?? '';
	} else {
		return false;
	}

	const pecahan = authorization.split(' ');
	if (pecahan.length < 2) {
		return false;
	}

	if (pecahan[0] !== 'Bearer') {
		return false;
	}

	if (pecahan[1] !== env.ADMIN_CODE) {
		return false;
	}

	return true;
}

export const handle: Handle = async ({ event, resolve }) => {
	// tangani galat database
	if (db === undefined && galatDb === undefined) {
		return new Response('Database belum tersambung.');
	} else if (galatDb !== undefined) {
		return new Response(galatDb.message);
	}

	// proteksi api admin
	if (/^\/api\/admin/.test(event.url.pathname)) {
		const terotentikasi = cekOtentikasiAdmin(event.request);
		if (!terotentikasi) {
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
	}

	const locals = event.locals as any;
	locals.db = db;
	locals.galatDb = galatDb;

	const response = await resolve(event);
	return response;
};
