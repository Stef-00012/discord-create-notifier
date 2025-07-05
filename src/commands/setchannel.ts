import type { Command } from "^/discord";
import { ChannelType, MessageFlags, PermissionFlagsBits } from "discord.js";

export default {
    name: "setchannel",

    async execute(client, interaction) {
        if (!interaction.guildId) return interaction.reply({
            content: "This command can only be used in a server",
            flags: MessageFlags.Ephemeral
        })
        
        if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.ManageWebhooks)) return interaction.reply({
            content: 'Unable to crate the webhook, mising the "Manage Webhooks" permission',
            flags: MessageFlags.Ephemeral
        })
        
        const channel = interaction.options.getChannel("channel", true, [ChannelType.GuildText]);
        
        if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.ManageWebhooks)) {
            return interaction.reply({
                content: `Unable t crate the webhook, mising the "Manage Webhooks" permission in ${channel}`,
                flags: MessageFlags.Ephemeral
            })
        }
        
        let webhookUrl: string;
        
        try {
            const webhook = await channel.createWebhook({
                name: client.user?.displayName || client.user?.username || "Create Addons Notifier",
                avatar: client.user?.displayAvatarURL(),
                reason: `Create Addons Notification channel set by ${interaction.user.username} (${interaction.user.id})`
            })
            
            webhookUrl = webhook.url;
        } catch(_e) {
            return await interaction.reply({
                content: "Something went wrong while creating the webhook...",
                flags: MessageFlags.Ephemeral
            })
        }

        await client.db
            .insert(client.dbSchema.guilds)
            .values({
                id: interaction.guildId,
                webhook: webhookUrl,
                channel: channel.id,
            })
            .onConflictDoUpdate({
                target: [client.dbSchema.guilds.id],
                set: {
                    webhook: webhookUrl,
                    channel: channel.id,
                },
            })

        await interaction.reply({
            content: `Successfully updated the notifications channel to ${channel}`,
            flags: MessageFlags.Ephemeral
        })
    }
} satisfies Command;