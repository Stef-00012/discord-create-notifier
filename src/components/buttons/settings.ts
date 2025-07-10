import type { Client } from "&/DiscordClient";
import { generateSettingsContainer } from "@/commands/settings";
import {
	ActionRowBuilder,
	MessageFlags,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	type ButtonInteraction,
} from "discord.js";
import { eq } from "drizzle-orm";

export default async function (client: Client, interaction: ButtonInteraction) {
	if (!interaction.guildId) {
		return interaction.reply({
			content: "This button can only be used in a server",
			flags: MessageFlags.Ephemeral,
		});
	}

	const currentSettings = await client.db.query.guilds.findFirst({
		where: eq(client.dbSchema.guilds.id, interaction.guildId),
	});

	if (!currentSettings) {
		return interaction.reply({
			content:
				"No settings found for this server, make sure to set the channel first through `/setchannel`",
			flags: MessageFlags.Ephemeral,
		});
	}

	const buttonType = interaction.customId.split("_")[1] as
		| "toggle"
		| "messageUpdate"
		| "messageCreate";

	switch (buttonType) {
		case "toggle": {
			const newEnabledState = !currentSettings.enabled;

			await client.db
				.update(client.dbSchema.guilds)
				.set({ enabled: newEnabledState })
				.where(eq(client.dbSchema.guilds.id, interaction.guildId));

			const container = await generateSettingsContainer(client, interaction);

			if (!container) return;

			try {
				await interaction.update({
					components: [container],
					flags: MessageFlags.IsComponentsV2,
				});
			} catch (e) {
				console.log(e);
			}

			break;
		}

		case "messageCreate": {
			const modal = new ModalBuilder()
				.setTitle("Edit New Addon Message")
				.setCustomId("settings_messageCreate");

			const input = new TextInputBuilder()
				.setCustomId("message")
				.setLabel("New Message")
				.setStyle(TextInputStyle.Paragraph)
				.setRequired(true)
				.setValue(currentSettings.newAddonMessage)
				.setMaxLength(3000);

			const inputRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
				input,
			);

			modal.addComponents(inputRow);

			await interaction.showModal(modal);

			break;
		}

		case "messageUpdate": {
			const modal = new ModalBuilder()
				.setTitle("Edit Updated Addon Message")
				.setCustomId("settings_messageUpdate");

			const input = new TextInputBuilder()
				.setCustomId("message")
				.setLabel("New Message")
				.setStyle(TextInputStyle.Paragraph)
				.setRequired(true)
				.setValue(currentSettings.updatedAddonMessage)
				.setMaxLength(3000);

			const inputRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
				input,
			);

			modal.addComponents(inputRow);

			await interaction.showModal(modal);

			break;
		}
	}
}
