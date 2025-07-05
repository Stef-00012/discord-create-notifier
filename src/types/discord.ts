import type { Client } from "&/DiscordClient";
import type {
	AutocompleteInteraction,
	ChatInputCommandInteraction /*, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction*/,
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
} /* | {
    execute: (
        client: Client,
        interaction: MessageContextMenuCommandInteraction,
    ) => unknown;
} | {
    execute: (
        client: Client,
        interaction: UserContextMenuCommandInteraction,
    ) => unknown;
}*/;
