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

export const handle: Handle = async ({ event, resolve }) => {
	if (db === undefined && galatDb === undefined) {
		return new Response('Database belum tersambung.');
	} else if (galatDb !== undefined) {
		return new Response(galatDb.message);
	}

	const locals = event.locals as any;
	locals.db = db;
	locals.galatDb = galatDb;

	const response = await resolve(event);
	return response;
};
