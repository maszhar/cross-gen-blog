import type { Connection } from 'mariadb';

export class RepositoriDatabase {
	constructor(protected db: Connection) {}
}
