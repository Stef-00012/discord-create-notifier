type Result<T> = { removed: T[]; added: T[] };

export function compareArrays<T>(oldArray: T[], newArray: T[]): Result<T> {
	function isObject(item: unknown): item is Record<string, unknown> {
		return typeof item === "object" && item !== null;
	}

	function findIndex(array: T[], item: T): number {
		if (isObject(item)) {
			const itemString = JSON.stringify(item);

			return array.findIndex((i) =>
				isObject(i) ? JSON.stringify(i) === itemString : false,
			);
		}

		return array.indexOf(item);
	}

	const removed = oldArray.filter((i) => findIndex(newArray, i) === -1);
	const added = newArray.filter((i) => findIndex(oldArray, i) === -1);

	return {
		removed,
		added,
	};
}
