import type { Client } from "&/DiscordClient";
import type { Command } from "^/discord";
import type { WSAddonDataKeys } from "^/websocket";
import {
	ActionRowBuilder,
	ButtonBuilder,
	type ButtonInteraction,
	ButtonStyle,
	type ChatInputCommandInteraction,
	ContainerBuilder,
	MessageFlags,
	SectionBuilder,
	SeparatorBuilder,
	SeparatorSpacingSize,
	StringSelectMenuBuilder,
	TextDisplayBuilder,
} from "discord.js";
import { eq } from "drizzle-orm";

const settingKeys: WSAddonDataKeys[] = [
	"categories",
	"description",
	"icon",
	"name",
	"versions",
	"clientSide",
	"license",
	"serverSide",
	"modloaders",
	"slug",
];

export default {
	name: "settings",
	async execute(client, interaction) {
		if (!interaction.guildId) {
			return interaction.reply({
				content: "This command can only be used in a server",
				flags: MessageFlags.Ephemeral,
			});
		}

		const container = await generateSettingsContainer(client, interaction);

		if (!container) return;

		try {
			await interaction.reply({
				components: [container],
				flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
			});
		} catch (e) {
			console.log(e);
		}
	},
} satisfies Command;

export async function generateSettingsContainer(
	client: Client,
	interaction: ChatInputCommandInteraction | ButtonInteraction,
) {
	const type = interaction.isChatInputCommand() ? "command" : "button";

	if (!interaction.guildId) {
		await interaction.reply({
			content: `This ${type} can only be used in a server`,
			flags: MessageFlags.Ephemeral,
		});

		return null;
	}

	const currentSettings = await client.db.query.guilds.findFirst({
		where: eq(client.dbSchema.guilds.id, interaction.guildId),
	});

	if (!currentSettings) {
		await interaction.reply({
			content:
				"No settings found for this server, make sure to set the channel first through `/setchannel`",
			flags: MessageFlags.Ephemeral,
		});

		return null;
	}

	const container = new ContainerBuilder();

	const titleTextDisplay = new TextDisplayBuilder().setContent("# Settings");

	container
		.addTextDisplayComponents(titleTextDisplay)
		.addSeparatorComponents(
			new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large),
		);

	const toggleTextDisplay = new TextDisplayBuilder().setContent(
		"### General\nEnable or disable general notifications from the bot",
	);

	const toggleButton = new ButtonBuilder()
		.setCustomId("settings_toggle")
		.setLabel(currentSettings.enabled ? "Disable" : "Enable")
		.setStyle(
			currentSettings.enabled ? ButtonStyle.Danger : ButtonStyle.Success,
		);

	const toggleSection = new SectionBuilder()
		.setButtonAccessory(toggleButton)
		.addTextDisplayComponents(toggleTextDisplay);

	container
		.addSectionComponents(toggleSection)
		.addSeparatorComponents(new SeparatorBuilder().setDivider(true));

	const eventsTextDisplay = new TextDisplayBuilder().setContent(
		"### Events\nEnable or disable specific event notifications from the bot",
	);

	container.addTextDisplayComponents(eventsTextDisplay);

	const eventSelect = new StringSelectMenuBuilder()
		.setCustomId("settings_events")
		.setPlaceholder("Select events to enable")
		.setMaxValues(2)
		.addOptions([
			{
				label: "Addon Created",
				value: "create",
				default: currentSettings.events.includes("create"),
				description: "Receive notifications when an addon is created",
			},
			{
				label: "Addon Updated",
				value: "update",
				default: currentSettings.events.includes("update"),
				description: "Receive notifications when an addon is updated",
			},
		]);

	const eventRow =
		new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(eventSelect);

	container
		.addActionRowComponents(eventRow)
		.addSeparatorComponents(new SeparatorBuilder().setDivider(true));

	const keysTextDisplay = new TextDisplayBuilder().setContent(
		"### Values\nThe bot will send update notifications only for the addons where any of the selected values changed",
	);

	container.addTextDisplayComponents(keysTextDisplay);

	const keysSelect = new StringSelectMenuBuilder()
		.setCustomId("settings_keys")
		.setPlaceholder("Select values to enable")
		.setMaxValues(settingKeys.length)
		.addOptions(
			settingKeys.map((key) => ({
				label: key.charAt(0).toUpperCase() + key.slice(1),
				value: key,
				default: currentSettings.filteredKeys.includes(key),
				description: `Receive notifications when the ${key} value of an addon changes`,
			})),
		);

	const keysRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
		keysSelect,
	);

	container
		.addActionRowComponents(keysRow)
		.addSeparatorComponents(new SeparatorBuilder());

	const messagesTextDisplay = new TextDisplayBuilder()
		.setContent("### Messages\nCustomize the notfication message for new and updated addons")

	container.addTextDisplayComponents(messagesTextDisplay);

	const editNewMessageButton = new ButtonBuilder()
		.setCustomId("settings_messageCreate")
		.setLabel("Edit New Addon Message")
		.setStyle(ButtonStyle.Secondary)

	const editUpdateMessageButton = new ButtonBuilder()
		.setCustomId("settings_messageUpdate")
		.setLabel("Edit Updated Addon Message")
		.setStyle(ButtonStyle.Secondary)

	const messagesRow = new ActionRowBuilder<ButtonBuilder>()
		.addComponents(editNewMessageButton, editUpdateMessageButton);

	container.addActionRowComponents(messagesRow);

	return container;
}
