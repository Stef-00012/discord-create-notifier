import type { Client } from "&/DiscordClient";
import type {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
} from "discord.js";

type BaseCommand = {
	name: string;
};

export type Command = BaseCommand & {
	execute: (
		client: Client,
		interaction: ChatInputCommandInteraction,
	) => unknown;
	autocomplete?: (
		client: Client,
		interaction: AutocompleteInteraction,
	) => unknown;
};
