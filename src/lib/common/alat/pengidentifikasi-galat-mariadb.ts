import { SqlError } from 'mariadb';

export function apakahGalatTidakAdaTabel(e: any): boolean {
	return e instanceof SqlError && e.code === 'ER_NO_SUCH_TABLE';
}
