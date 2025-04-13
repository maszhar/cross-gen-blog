export function formatTanggal(date: Date): string {
	const padTwoDigit = (value: number) => {
		if (value < 10) {
			return `0${value}`;
		}
		return `${value}`;
	};
	return `${padTwoDigit(date.getDate())}/${padTwoDigit(date.getMonth())}/${date.getFullYear()}`;
}
