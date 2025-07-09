import { parseVariables } from "@/util/parseVariables";
import { createAddonContainer } from "@/ws/handler";
import type { Command } from "^/discord";
import type { CreateMessage, UpdateMessage } from "^/websocket";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } from "discord.js";
import { eq } from "drizzle-orm";

const newAddon: CreateMessage["data"][0] = {
	platforms: ["modrinth", "curseforge"],
	modData: {
		curseforge: {
			slug: "create",
			authors: [
				{
					name: "simibubi",
					url: "https://www.curseforge.com/members/simibubi",
				},
			],
			downloads: 4160282,
			description: "Aesthetic Technology that empowers the Player",
			icon: "https://cdn.modrinth.com/data/LNytGWDc/61d716699bcf1ec42ed4926a9e1c7311be6087e2_96.webp",
			name: "Create",
			version: "1.21.1",
			versions: ["1.18.2", "1.19.2", "1.20.1", "1.21.1"],
			categories: ["decoration", "technology", "utility"],
			follows: 3327,
			created: "2022-07-07T21:24:43.018879Z",
			modified: "2025-03-19T20:01:47.053628Z",
			color: 6639722,
			license: "MIT",
			clientSide: "required",
			serverSide: "required",
			modloaders: ["forge", "neoforge"],
			id: "aa",
		},
		modrinth: {
			slug: "create",
			authors: [
				{
					name: "simibubi",
					url: "https://modrinth.com/user/simibubi",
				},
			],
			downloads: 4160282,
			description: "Aesthetic Technology that empowers the Player",
			icon: "https://cdn.modrinth.com/data/LNytGWDc/61d716699bcf1ec42ed4926a9e1c7311be6087e2_96.webp",
			name: "Create",
			version: "1.21.1",
			versions: ["1.18.2", "1.19.2", "1.20.1", "1.21.1"],
			categories: ["decoration", "technology", "utility"],
			follows: 3327,
			created: "2022-07-07T21:24:43.018879Z",
			modified: "2025-03-19T20:01:47.053628Z",
			color: 6639722,
			license: "MIT",
			clientSide: "required",
			serverSide: "required",
			modloaders: ["forge", "neoforge"],
			id: "aa",
		},
	},
};

const updatedAddon: UpdateMessage["data"][0] = {
	names: {
		curseforge: "Create",
		modrinth: "Create"
	},
	platforms: ["modrinth", "curseforge"],
	slugs: {
		curseforge: "create",
		modrinth: "create",
	},
    icons: {
        modrinth: "https://cdn.modrinth.com/data/LNytGWDc/61d716699bcf1ec42ed4926a9e1c7311be6087e2_96.webp",
        curseforge: "https://media.forgecdn.net/avatars/1065/184/638598725500886388.png"
    },
	changes: {
		curseforge: {
			name: {
				old: "Create",
				new: "Create Reimagined",
			},
			description: {
				old: "Aesthetic Technology that empowers the Player",
				new: "Aesthetic Technology that empowers the Player with new features",
			},
			versions: {
				old: ["1.18.2", "1.19.2", "1.20.1", "1.21.1"],
				new: ["1.18.2", "1.19.2", "1.20.1", "1.21.1", "1.22.0"],
			},
			categories: {
				old: ["decoration", "technology", "utility"],
				new: ["decoration", "technology", "utility", "performance"],
			},
			follows: {
				old: 3327,
				new: 3500,
			},
			downloads: {
				old: 4160282,
				new: 4200000,
			},
			created: {
				old: "2022-07-07T21:24:43.018879Z",
				new: "2024-12-097T18:37:41.018879Z",
			},
			modloaders: {
				old: ["forge", "neoforge"],
				new: ["forge", "neoforge", "fabric"],
			},
			clientSide: {
				old: "required",
				new: "optional",
			},
			serverSide: {
				old: "required",
				new: "unsupported",
			},
			icon: {
				old: "https://cdn.modrinth.com/data/LNytGWDc/61d716699bcf1ec42ed4926a9e1c7311be6087e2_96.webp",
				new: "https://cdn.modrinth.com/data/LNytGWDc/61d716699bcf1ec42ed4926a9e1c7311be6087e2_128.webp",
			},
			modified: {
				old: "2025-03-19T20:01:47.053628Z",
				new: "2025-03-20T10:00:00.000000Z",
			},
			color: {
				old: 6639722,
				new: 16777215,
			},
			license: {
				old: "MIT",
				new: "Apache-2.0",
			},
		},
		modrinth: {
			name: {
				old: "Create",
				new: "Create Reimagined",
			},
			description: {
				old: "Aesthetic Technology that empowers the Player",
				new: "Aesthetic Technology that empowers the Player with new features",
			},
			versions: {
				old: ["1.18.2", "1.19.2", "1.20.1", "1.21.1"],
				new: ["1.18.2", "1.19.2", "1.20.1", "1.21.1", "1.22.0"],
			},
			categories: {
				old: ["decoration", "technology", "utility"],
				new: ["decoration", "technology", "utility", "performance"],
			},
			follows: {
				old: 3327,
				new: 3500,
			},
			downloads: {
				old: 4160282,
				new: 4200000,
			},
			created: {
				old: "2022-07-07T21:24:43.018879Z",
				new: "2024-12-097T18:37:41.018879Z",
			},
			modloaders: {
				old: ["forge", "neoforge"],
				new: ["forge", "neoforge", "fabric"],
			},
			clientSide: {
				old: "required",
				new: "optional",
			},
			serverSide: {
				old: "required",
				new: "unsupported",
			},
			icon: {
				old: "https://cdn.modrinth.com/data/LNytGWDc/61d716699bcf1ec42ed4926a9e1c7311be6087e2_96.webp",
				new: "https://cdn.modrinth.com/data/LNytGWDc/61d716699bcf1ec42ed4926a9e1c7311be6087e2_128.webp",
			},
			modified: {
				old: "2025-03-19T20:01:47.053628Z",
				new: "2025-03-20T10:00:00.000000Z",
			},
			color: {
				old: 6639722,
				new: 16777215,
			},
			license: {
				old: "MIT",
				new: "Apache-2.0",
			},
		},
	},
};

export default {
    name: "preview",

    async execute(client, interaction) {
        if (!interaction.guildId) return interaction.reply({
            content: "This command can only be used in a server",
            flags: MessageFlags.Ephemeral
        })
        
        const currentSettings = await client.db.query.guilds.findFirst({
            where: eq(client.dbSchema.guilds.id, interaction.guildId),
        })
        
        if (!currentSettings) {
            await interaction.reply({
                content:
				"No settings found for this server, make sure to set the channel first through `/setchannel`",
                flags: MessageFlags.Ephemeral,
            });
            
            return null;
        }

        const type = interaction.options.getString("type", true) as "create" | "update";

        let msg: string;
        const buttons = new ActionRowBuilder<ButtonBuilder>();
        let iconUrl: string | null | undefined;

        if (type === "create") {
            msg = parseVariables(currentSettings.newAddonMessage, {
                platforms: newAddon.platforms,
                ...newAddon.modData,
            });

            iconUrl =
                newAddon.modData.modrinth?.icon ?? newAddon.modData.curseforge?.icon;

            if (newAddon.modData.modrinth) {
                    const button = new ButtonBuilder()
                        .setLabel("Open on Modrinth")
                        .setStyle(ButtonStyle.Link)
                        .setEmoji({
                            id: process.env.MODRINTH_EMOJI_ID,
                            name: "modrinth",
                        })
                        .setURL(
                            `https://modrinth.com/mod/${newAddon.modData.modrinth.slug}`,
                        );

                    buttons.addComponents(button);
                }

            if (newAddon.modData.curseforge) {
                const button = new ButtonBuilder()
                    .setLabel("Open on Curseforge")
                    .setStyle(ButtonStyle.Link)
                    .setEmoji({
                        id: process.env.CURSEFORGE_EMOJI_ID,
                        name: "curseforge",
                    })
                    .setURL(
                        `https://curseforge.com/minecraft/mc-mods/${newAddon.modData.curseforge.slug}`,
                    );

                buttons.addComponents(button);
            }
        } else {
            msg = parseVariables(currentSettings.updatedAddonMessage, {
                ...updatedAddon.changes,
                names: updatedAddon.names,
            });

            iconUrl =
                updatedAddon.icons.modrinth ?? updatedAddon.icons.curseforge;

            if (updatedAddon.changes.modrinth) {
                const button = new ButtonBuilder()
                    .setLabel("Open on Modrinth")
                    .setStyle(ButtonStyle.Link)
                    .setEmoji({
                        id: process.env.MODRINTH_EMOJI_ID,
                        name: "modrinth",
                    })
                    .setURL(`https://modrinth.com/mod/${updatedAddon.slugs.modrinth}`);

                buttons.addComponents(button);
            }

            if (updatedAddon.changes.curseforge) {
                const button = new ButtonBuilder()
                    .setLabel("Open on Curseforge")
                    .setStyle(ButtonStyle.Link)
                    .setEmoji({
                        id: process.env.CURSEFORGE_EMOJI_ID,
                        name: "curseforge",
                    })
                    .setURL(
                        `https://curseforge.com/minecraft/mc-mods/${updatedAddon.slugs.curseforge}`,
                    );

                buttons.addComponents(button);
            }
        }

        const container = createAddonContainer(msg, buttons, type, iconUrl);

        await interaction.reply({
            components: [container],
            flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
        })
    }
} satisfies Command;