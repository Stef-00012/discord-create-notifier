import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, type APIApplicationCommand } from "discord.js";

export default [
    {
        name: "setchannel",
        description: "Set the channel where the bot will send the notifications for the addons",
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "The channel to set for the notifications",
                required: true,
                channel_types: [ChannelType.GuildText],
            },
        ],
    },
    {
        name: "settings",
        description: "Manage the bot's settings",
        type: ApplicationCommandType.ChatInput,
    },
    {
        name: "preview",
        description: "Preview the new or updated addon message",
        type: ApplicationCommandType.ChatInput,
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: "type",
                description: "The type of message to preview",
                required: true,
                choices: [
                    { name: "New Addon", value: "create" },
                    { name: "Updated Addon", value: "update" },
                ],
            }
        ],
    },
    {
        name: "help",
        description: "List the bot's commands",
        type: ApplicationCommandType.ChatInput,
    }
] as APIApplicationCommand[]