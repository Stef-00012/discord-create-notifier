import type { Client } from "&/DiscordClient";
import type { DBEvents } from "@/db/schemas/guilds";
import type { WSAddonData } from "^/websocket";
import { MessageFlags, type AnySelectMenuInteraction } from "discord.js";
import { eq } from "drizzle-orm";

export default async function (client: Client, interaction: AnySelectMenuInteraction) {
    if (!interaction.guildId) {
        return interaction.reply({
            content: "This button can only be used in a server",
            flags: MessageFlags.Ephemeral
        });
    }

    const currentSettings = await client.db.query.guilds.findFirst({
        where: eq(client.dbSchema.guilds.id, interaction.guildId)
    });

    if (!currentSettings) {
        return interaction.reply({
            content: "No settings found for this server, make sure to set the channel first through `/setchannel`",
            flags: MessageFlags.Ephemeral
        });
    }

    const selectType = interaction.customId.split("_")[1] as "events" | "keys";
    const selectedValues = interaction.values;

    switch(selectType) {
        case "events": {
            await client.db
                .update(client.dbSchema.guilds)
                .set({
                    events: selectedValues as DBEvents
                })
                .where(
                    eq(client.dbSchema.guilds.id, interaction.guildId)
                )

            await interaction.reply({
                content: "Successfully updated the notification events",
                flags: MessageFlags.Ephemeral
            })

            break;
        }

        case "keys": {
            await client.db
                .update(client.dbSchema.guilds)
                .set({
                    filteredKeys: selectedValues as (keyof WSAddonData)[]
                })
                .where(
                    eq(client.dbSchema.guilds.id, interaction.guildId)
                )

            await interaction.reply({
                content: "Successfully updated the notification values",
                flags: MessageFlags.Ephemeral
            })

            break;
        }
    }
}