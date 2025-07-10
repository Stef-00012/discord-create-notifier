import { GatewayIntentBits } from "discord.js";
import fs from "node:fs";
import { Client } from "&/DiscordClient";
import type { Command } from "^/discord";
import { handleWS } from "@/ws/handler";

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildWebhooks],
});

const events = fs
	.readdirSync(`${__dirname}/events`)
	.filter((file) => file.endsWith(".ts"));

const commands = fs
	.readdirSync(`${__dirname}/commands`)
	.filter((file) => file.endsWith(".ts"));

for (const event of events) {
	const eventData = (await import(`${__dirname}/events/${event}`)).default;

	const eventName = event.split(".")[0];

	client.on(eventName, eventData.bind(null, client));
}

for (const command of commands) {
	const commandData = (await import(`${__dirname}/commands/${command}`))
		.default as Command;

	client.commands.set(commandData.name, commandData);
}

handleWS(client);

client.login(process.env.TOKEN);
