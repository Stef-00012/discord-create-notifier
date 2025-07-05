import type { SupportTypes, WsAddonDataAuthor } from "^/websocket";
import { compareArrays } from "@/util/compareArrays";

const clientServerSideNames = {
	unknown: "Unknown",
	required: "Required",
	optional: "Optional",
	unsupported: "Unsupported",
};

export function parseVariablePath<Conditional extends boolean = false>(
	path: string,
	object: Record<string, unknown>,
	conditional = false as Conditional,
): Conditional extends true ? unknown : string | null {
	const parts = path.split("/");
	let previousKey: string | null = null;
	let current: unknown = object;

	for (let i = 0; i < parts.length; i++) {
		const key = parts[i];
		const previousObject = current as Record<string, unknown> | null;

		if (!previousObject) return null;

		if (
			["added", "removed", "authorsUrl"].every((item) => key !== item) &&
			!(key in previousObject)
		)
			return null;

		if (key === "authorsUrl") {
			current = previousObject["authors"];
			previousKey = key;

			if (i === parts.length - 1) {
				return (current as WsAddonDataAuthor[])
					.filter(Boolean)
					.map((author) => `[${author.name}](${author.url})`)
					.join(", ");
			}

			continue;
		}

		if (Array.isArray(previousObject[key])) {
			if (key === "authors" || previousKey === "authors") {
				previousKey = key;

				return (previousObject[key] as WsAddonDataAuthor[])
					.filter(Boolean)
					.map((author) => author.name)
					.join(", ");
			}

			if (key === "authorsUrl" || previousKey === "authorsUrl") {
				previousKey = key;

				return (previousObject[key] as WsAddonDataAuthor[])
					.filter(Boolean)
					.map((author) => `[${author.name}](${author.url})`)
					.join(", ");
			}

			return (previousObject[key] as unknown[]).filter(Boolean).join(", ");
		}

		if (
			typeof previousObject === "object" &&
			previousObject !== null &&
			("new" in previousObject || "old" in previousObject) &&
			(Array.isArray(
				(previousObject as { old?: unknown[]; new?: unknown[] }).old,
			) ||
				Array.isArray(
					(previousObject as { old?: unknown[]; new?: unknown[] }).new,
				))
		) {
			const previousItem = previousObject as Record<
				"old" | "new",
				WsAddonDataAuthor[] | string[]
			>;

			if (key === "added" || key === "removed") {
				const comparedArrays = compareArrays(
					previousItem.old as unknown[],
					previousItem.new as unknown[],
				);

				if (previousKey === "authors") {
					previousKey = key;

					return (comparedArrays[key] as WsAddonDataAuthor[])
						.filter(Boolean)
						.map((author) => author.name)
						.join(", ");
				}

				if (previousKey === "authorsUrl") {
					previousKey = key;

					return (comparedArrays[key] as WsAddonDataAuthor[])
						.filter(Boolean)
						.map((author) => `[${author.name}](${author.url})`)
						.join(", ");
				}

				previousKey = key;

				return (comparedArrays[key] as unknown[]).filter(Boolean).join(", ");
			}

			if (key === "new" || key === "old") {
				if (previousKey === "authors") {
					previousKey = key;

					return (previousItem[key] as WsAddonDataAuthor[])
						.filter(Boolean)
						.map((author) => author.name)
						.join(", ");
				}

				if (previousKey === "authorsUrl") {
					previousKey = key;

					return (previousItem[key] as WsAddonDataAuthor[])
						.filter(Boolean)
						.map((author) => `[${author.name}](${author.url})`)
						.join(", ");
				}

				return (previousItem[key] as unknown[]).filter(Boolean).join(", ");
			}
		}

		if (
			((previousKey === "clientSide" || previousKey === "serverSide") &&
				(key === "old" || key === "new")) ||
			((key === "clientSide" || key === "serverSide") &&
				typeof previousObject[key] === "string")
		) {
			if (key === "clientSide" || key === "serverSide") {
				previousKey = key;

				return (
					clientServerSideNames[previousObject[key] as SupportTypes] ||
					"Unknown"
				);
			}

			previousKey = key;

			return (
				clientServerSideNames[previousObject[key] as SupportTypes] || "Unknown"
			);
		}

		if (
			((previousKey === "created" || previousKey === "modified") &&
				(key === "old" || key === "new")) ||
			((key === "created" || key === "modified") &&
				typeof previousObject[key] === "string")
		) {
			if (key === "created" || key === "modified") {
				previousKey = key;

				return new Date(previousObject[key] as string).toString();
			}

			previousKey = key;

			return new Date(previousObject[key] as string).toString();
		}

		previousKey = key;
		current = previousObject[key];
	}

	if (!conditional && typeof current !== "string") return null;

	if (typeof current === "object" && Object.keys(current || {}).length <= 0)
		return null;
	if (Array.isArray(current) && current.length <= 0) return null;
	if (typeof current === "string" && current.trim().length <= 0) return null;

	return current as Conditional extends true ? unknown : string | null;
}
