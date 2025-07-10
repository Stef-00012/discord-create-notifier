import { clientServerSideNames } from "@/util/parseVariablePath";
import type { AutocompleteModsResult } from "^/api";
import type { Command } from "^/discord";
import type { Platforms, WSAddon, WSAddonData } from "^/websocket";
import axios from "axios";
import {
	ContainerBuilder,
	MessageFlags,
	SectionBuilder,
	SeparatorBuilder,
	TextDisplayBuilder,
	ThumbnailBuilder,
} from "discord.js";

export default {
	name: "mod",

	async autocomplete(_client, interaction) {
		const autocompleteUrl = `http${process.env.CREATE_ADDONS_SECURE === "true" ? "s" : ""}://${process.env.CREATE_ADDONS_BASE_URL}/api/addons/autocomplete`;

		const platform = interaction.options.getString("platform", true);
		const query = interaction.options.getFocused();

		try {
			const res = await axios.get(
				`${autocompleteUrl}?platform=${platform}&query=${query}`,
			);

			const data = res.data as AutocompleteModsResult[];

			const choices = data
				.map((addon) => ({
					name: addon.name,
					value: addon.slug,
				}))
				.slice(0, 25);

			await interaction.respond(choices);
		} catch (_e) {
			await interaction.respond([]);
		}
	},

	async execute(_client, interaction) {
		const id = interaction.options.getString("id", true);
		const platform = interaction.options.getString(
			"platform",
			true,
		) as Platforms;

		const modUrl = `http${process.env.CREATE_ADDONS_SECURE === "true" ? "s" : ""}://${process.env.CREATE_ADDONS_BASE_URL}/api/addons/${id}`;

		try {
			const res = await axios.get(modUrl);
			const data = res.data as WSAddon;

			const platformData = data.modData[platform] as WSAddonData;

			const container = new ContainerBuilder().setAccentColor(
				platformData.color,
			);

			const title = new TextDisplayBuilder().setContent(
				`## ${platformData.name}`,
			);

			const thumbnail = new ThumbnailBuilder().setURL(platformData.icon);

			const modData = [
				`**Platform**: ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
				`**Description**: ${platformData.description}`,
				`**Authors**: ${platformData.authors.map((author) => `[${author.name}](<${author.url}>)`).join(", ")}`,
				`**Versions**: ${platformData.versions.map((version) => `\`${version}\``).join(", ")}`,
				`**Categories**: ${platformData.categories.join(", ")}`,
				`**Client Side**: ${clientServerSideNames[platformData.clientSide]}`,
				`**Server Side**: ${clientServerSideNames[platformData.serverSide]}`,
				`**Modloaders**: ${platformData.modloaders.map((loader) => loader.charAt(0).toUpperCase() + loader.slice(1)).join(", ")}`,
				`**Downloads**: ${platformData.downloads}`,
				`**Follows**: ${platformData.follows}`,
				`**Creation Date**: <t:${Math.floor(new Date(platformData.created).getTime() / 1000)}> (<t:${Math.floor(new Date(platformData.created).getTime() / 1000)}:R>)`,
				`**Last Updated**: <t:${Math.floor(new Date(platformData.modified).getTime() / 1000)}> (<t:${Math.floor(new Date(platformData.modified).getTime() / 1000)}:R>)`,
				`**Slug**: \`${platformData.slug}\``,
			];

			const dataText = new TextDisplayBuilder().setContent(modData.join("\n"));

			const section = new SectionBuilder()
				.setThumbnailAccessory(thumbnail)
				.addTextDisplayComponents(title, dataText);

			container
				.addSectionComponents(section)
				.addSeparatorComponents(new SeparatorBuilder());

			const idText = new TextDisplayBuilder().setContent(
				`-# **ID**: \`${platformData.id}\``,
			);

			container.addTextDisplayComponents(idText);

			await interaction.reply({
				components: [container],
				flags: MessageFlags.IsComponentsV2,
			});
		} catch (_e) {
			await interaction.reply({
				content: "Something went wrong while getting the mod data",
				flags: MessageFlags.Ephemeral,
			});
			return;
		}
	},
} satisfies Command;
