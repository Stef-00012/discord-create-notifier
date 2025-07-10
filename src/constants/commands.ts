import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ChannelType,
	type APIApplicationCommand,
} from "discord.js";

export default [
	{
		name: "setchannel",
		description:
			"Set the channel where the bot will send the notifications for the addons",
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
			},
		],
	},
	{
		name: "help",
		description: "List the bot's commands",
		type: ApplicationCommandType.ChatInput,
	},
	{
		name: "mod",
		description: "Get the info about a specific mod",
		options: [
			{
				name: "platform",
				description: "The platform of the mod",
				type: ApplicationCommandOptionType.String,
				required: true,
				choices: [
					{ name: "Modrinth", value: "modrinth" },
					{ name: "Curseforge", value: "curseforge" },
				],
			},
			{
				name: "id",
				description: "The ID of the mod",
				type: ApplicationCommandOptionType.String,
				required: true,
				autocomplete: true,
			},
		],
	},
	{
		name: "search",
		description: "Search for creae addons",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				name: "query",
				description:
					"A search term to filter addons by name, description, or slug",
				type: ApplicationCommandOptionType.String,
				required: false,
			},
			{
				name: "modloader",
				description: "The modloader to filter addons by",
				type: ApplicationCommandOptionType.String,
				required: false,
				choices: [
					{ name: "Quilt", value: "quilt" },
					{ name: "Fabric", value: "fabric" },
					{ name: "Forge", value: "forge" },
					{ name: "NeoForge", value: "neoforge" },
					{ name: "LiteLoader", value: "liteloader" },
					{ name: "Rift", value: "rift" },
					{ name: "Cauldron", value: "cauldron" },
				],
			},
			{
				name: "version",
				description: "The Minecraft version to filter addons by",
				type: ApplicationCommandOptionType.String,
				required: false,
				autocomplete: true,
			},
			{
				name: "platform",
				description: "The platform to filter addons by",
				type: ApplicationCommandOptionType.String,
				required: false,
				choices: [
					{ name: "Modrinth", value: "modrinth" },
					{ name: "Curseforge", value: "curseforge" },
				],
			},
			{
				name: "sort",
				description: "The sorting order for the results",
				type: ApplicationCommandOptionType.String,
				required: false,
				choices: [
					{ name: "Downloads", value: "downloads" },
					{ name: "Name", value: "name" },
					{ name: "Created", value: "created" },
					{ name: "Followers", value: "followers" },
					{ name: "Last Updated", value: "lastUpdated" },
				],
			},
			{
				name: "page",
				description: "The page number of the results to display",
				type: ApplicationCommandOptionType.Integer,
				required: false,
				min_value: 1,
			},
			{
				name: "ephemeral",
				description: "Whether to send the response as ephemeral",
				type: ApplicationCommandOptionType.Boolean,
				required: false,
			},
		],
	},
] as APIApplicationCommand[];
