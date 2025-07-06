import type { Client } from "&/DiscordClient";
import { MessageFlags, type ModalSubmitInteraction } from "discord.js";
import { eq } from "drizzle-orm";

export default async function (client: Client, interaction: ModalSubmitInteraction) {
    if (!interaction.guildId) {
        return interaction.reply({
            content: "This button can only be used in a server",
            flags: MessageFlags.Ephemeral
        });
    }

    const modalType = interaction.customId.split("_")[1] as "messageUpdate" | "messageCreate";
    const message = interaction.fields.getTextInputValue("message")

    switch (modalType) {
        case "messageCreate": {
            await client.db
                .update(client.dbSchema.guilds)
                .set({
                    newAddonMessage: message
                })
                .where(eq(client.dbSchema.guilds.id, interaction.guildId))

            await interaction.reply({
                content: "Successfully edited the new addon notification message",
                flags: MessageFlags.Ephemeral
            })

            break;
        }

        case "messageUpdate": {
            await client.db
                .update(client.dbSchema.guilds)
                .set({
                    updatedAddonMessage: message
                })
                .where(eq(client.dbSchema.guilds.id, interaction.guildId))

            await interaction.reply({
                content: "Successfully edited the updated addon notification message",
                flags: MessageFlags.Ephemeral
            })

            break;
        }
    }
}