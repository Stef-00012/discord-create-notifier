import type { Command } from "^/discord";
import { EmbedBuilder, MessageFlags } from "discord.js";

export default {
	name: "help",

	async execute(_client, interaction) {
		const commands = [
			"`/help` - Shows this message",
			"`/setchannel <channel>` - Sets the channel where the bot will send the notifications for the addons",
			"`/mod <id> <platform>` - Gets the info about a specific mod",
			"`/search [query] [modloader] [version] [platform] [sort] [page]` - Searches for mods with that name, description or slug",
			"`/preview <type>` - Previews the new or updated addon message",
			"`/settings` - Opens a menu to manage the bot's settings",
		];

		const embed = new EmbedBuilder()
			.setTitle("Help")
			.setDescription(commands.join("\n"));

		await interaction.reply({
			embeds: [embed],
			flags: MessageFlags.Ephemeral,
		});
	},
} satisfies Command;
