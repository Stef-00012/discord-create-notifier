import { parseConditional } from "@/util/parseConditional";
import { parseVariablePath } from "@/util/parseVariablePath";

export function parseVariables(
	_text: string,
	variables: Record<string, unknown>,
) {
	const variableRegex = /{{(?<variable>[^}]+?)}}/gim;

	const text = parseConditional(_text, variables);

	const parsedText = text.replace(variableRegex, (match, variable) => {
		return parseVariablePath(variable, variables) || match;
	});

	const urlRegex =
		/\[(?<text>[^\]]+)\]\((?<url>http(s)?:\/\/([\w-])+\.([\w-]+[^)]*)+)\)/gim;

	return parsedText.replace(urlRegex, (match, text, url) => {
		if (text && url) return `[${text}](${url})`;

		return match;
	});
}
