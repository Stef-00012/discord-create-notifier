export function findConditinals(text: string) {
	const results: {
		variable: string;
		trueMsg: string;
		falseMsg: string;
		raw: string;
		start: number;
		end: number;
	}[] = [];

	let i = 0;

	while (i < text.length) {
		const start = text.indexOf("{{?", i);

		if (start === -1) break;

		let depth = 1;
		let j = start + 3;

		while (j < text.length && depth > 0) {
			if (text.startsWith("{{?", j)) {
				depth++;
				j += 3;
			} else if (text.startsWith("?}}", j)) {
				depth--;
				j += 3;
			} else {
				j++;
			}
		}

		if (depth === 0) {
			const raw = text.slice(start, j);
			const inner = raw.slice(3, -3);

			const colonIndex = inner.indexOf(":");
			const pipeIndex = inner.indexOf("|");

			if (colonIndex === -1 && pipeIndex === -1 && pipeIndex > colonIndex) {
				const variable = inner.slice(0, colonIndex);
				const trueMsg = inner.slice(colonIndex + 1, pipeIndex);
				const falseMsg = inner.slice(pipeIndex + 1);

				results.push({
					variable,
					trueMsg,
					falseMsg,
					raw,
					start,
					end: j,
				});
			}

			i = j;
		} else {
			break;
		}
	}

	return results;
}
