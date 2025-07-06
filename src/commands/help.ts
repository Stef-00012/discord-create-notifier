import type { Command } from "^/discord";
import { EmbedBuilder, MessageFlags } from "discord.js";

export default {
    name: "help",

    async execute(_client, interaction) {
        const commands = [
            "`/help` - Shows this message",
            "`/setchannel <channel>` - Sets the channel where the bot will send the notifications for the addons",
            "`/preview <type>` - Previews the new or updated addon message",
            "`/settings` - Opens a menu to manage the bot's settings",
        ]

        const embed = new EmbedBuilder()
            .setTitle("Help")
            .setDescription(commands.join("\n"))

        await interaction.reply({
            embeds: [embed],
            flags: MessageFlags.Ephemeral,
        })
    }
} satisfies Command;