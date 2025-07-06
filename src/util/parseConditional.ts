import { findConditionals } from "@/util/findConditionals";
import { parseVariablePath } from "@/util/parseVariablePath";

export function parseConditional(
	_text: string,
	variables: Record<string, unknown>,
) {
	let text = _text;
	const conditionals = findConditionals(text);

	for (const conditional of conditionals) {
		const { variable, trueMsg, falseMsg, raw } = conditional;

		if (parseVariablePath(variable, variables, true)) {
			text = text.replace(raw, parseConditional(trueMsg, variables));
			continue;
		}

		text = text.replace(raw, parseConditional(falseMsg, variables));
	}

	return text;
}
