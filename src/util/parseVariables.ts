import { parseConditional } from "@/util/parseConditional";
import { parseVariablePath } from "@/util/parseVariablePath";

export function parseVariables(
	_text: string,
	variables: Record<string, unknown>,
) {
	const variableRegex = /{{(?<variable>[^}]+?)}}/gim;

	const text = parseConditional(_text, variables);

	return text.replace(variableRegex, (match, variable) => {
		return parseVariablePath(variable, variables) || match;
	});
}
