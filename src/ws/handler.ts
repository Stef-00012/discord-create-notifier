import { parseVariables } from "@/util/parseVariables";
import type { Client } from "&/DiscordClient";
import WebSocket from "ws";
import {
	WSEvents,
	type CreateMessage,
	type PingMessage,
	type PongMessage,
	type UpdateMessage,
	type WSAddonData,
} from "^/websocket";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	WebhookClient,
} from "discord.js";

export function handleWS(client: Client): void {
	const socket = new WebSocket(process.env.WEBSOCKET_URL);

	socket.on("open", () => {
		console.info("\x1b[32mConnected to the create addons WebSocket\x1b[0m");
	});

	socket.on("close", (code, reason) => {
		console.warn(
			`\x1b[31mDisconnected from the create addons WebSocket:\n - Code: \x1b[0;1m${code}\x1b[0;31m\n - Reason: \x1b[0;1m${reason}\x1b[0;31m\n\nRetrying to connect in 10 seconds\x1b[0m`,
		);

		setTimeout(handleWS, 10000);
	});

	socket.on("error", (error) => {
		console.error("\x1b[31mWebSocket Error:", error, "\x1b[0m");
	});

	socket.on("message", async (data) => {
		const message = JSON.parse(data.toString()) as
			| CreateMessage
			| UpdateMessage
			| PingMessage;

		if (message.type === WSEvents.PING) {
			const pong: PongMessage = {
				type: WSEvents.PONG,
			};

			return socket.send(JSON.stringify(pong));
		}

		const guilds = await client.db.query.guilds.findMany();

		if (message.type === WSEvents.CREATE) {
			const data = message.data;

			for (const guild of guilds) {
				if (!guild.enabled || !guild.events.includes("create")) continue;

				const webhookClient = new WebhookClient({
					url: guild.webhook,
				});

				for (const addon of data) {
					const addonUrlRow = new ActionRowBuilder<ButtonBuilder>();

					if (addon.modData.modrinth) {
						const button = new ButtonBuilder()
							.setLabel("Open on Modrinth")
							.setStyle(ButtonStyle.Link)
							.setEmoji({
								id: process.env.MODRINTH_EMOJI_ID,
								name: "modrinth",
							})
							.setURL(
								`https://modrinth.com/mod/${addon.modData.modrinth.slug}`,
							);

						addonUrlRow.addComponents(button);
					}

					if (addon.modData.curseforge) {
						const button = new ButtonBuilder()
							.setLabel("Open on Cursefrge")
							.setStyle(ButtonStyle.Link)
							.setEmoji({
								id: process.env.CURSEFORGE_EMOJI_ID,
								name: "curseforge",
							})
							.setURL(
								`https://curseforge.com/minecraft/mc-mods/${addon.modData.curseforge.slug}`,
							);

						addonUrlRow.addComponents(button);
					}

					const msg = parseVariables(guild.newAddonMessage, {
						platforms: addon.platforms,
						...addon.modData,
					});

					try {
						await webhookClient.send({
							content: msg,
							components: [addonUrlRow],
							username: client.user?.displayName || client.user?.username,
							avatarURL: client.user?.displayAvatarURL(),
						});
					} catch (e) {
						console.error(
							`Failed to send addon message to guild "${guild.id}":`,
							e,
						);
					}
				}
			}
		}

		if (message.type === WSEvents.UPDATE) {
			const data = message.data;

			for (const guild of guilds) {
				if (!guild.enabled || !guild.events.includes("update")) continue;

				const webhookClient = new WebhookClient({
					url: guild.webhook,
				});

				for (const addon of data) {
					const curseforgeKeys = Object.keys(addon.changes.curseforge ?? {});

					if (
						curseforgeKeys.every(
							(key) => !guild.filteredKeys.includes(key as keyof WSAddonData),
						)
					)
						addon.changes.curseforge = null;

					const modrinthKeys = Object.keys(addon.changes.modrinth ?? {});

					if (
						modrinthKeys.every(
							(key) => !guild.filteredKeys.includes(key as keyof WSAddonData),
						)
					)
						addon.changes.modrinth = null;

					if (!addon.changes.curseforge && !addon.changes.modrinth) continue;

					const addonUrlRow = new ActionRowBuilder<ButtonBuilder>();

					if (addon.changes.modrinth) {
						const button = new ButtonBuilder()
							.setLabel("Open on Modrinth")
							.setStyle(ButtonStyle.Link)
							.setEmoji({
								id: process.env.MODRINTH_EMOJI_ID,
								name: "modrinth",
							})
							.setURL(`https://modrinth.com/mod/${addon.slugs.modrinth}`);

						addonUrlRow.addComponents(button);
					}

					if (addon.changes.curseforge) {
						const button = new ButtonBuilder()
							.setLabel("Open on Cursefrge")
							.setStyle(ButtonStyle.Link)
							.setEmoji({
								id: process.env.CURSEFORGE_EMOJI_ID,
								name: "curseforge",
							})
							.setURL(
								`https://curseforge.com/minecraft/mc-mods/${addon.slugs.curseforge}`,
							);

						addonUrlRow.addComponents(button);
					}

					const msg = parseVariables(guild.updatedAddonMessage, {
						...addon.changes,
						names: addon.names,
					});

					try {
						await webhookClient.send({
							content: msg,
							components: [addonUrlRow],
							username: client.user?.displayName || client.user?.username,
							avatarURL: client.user?.displayAvatarURL(),
						});
					} catch (e) {
						console.error(
							`Failed to send addon message to guild "${guild.id}":`,
							e,
						);
					}
				}
			}
		}
	});
}
