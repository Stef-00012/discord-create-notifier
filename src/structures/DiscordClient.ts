import { type ClientOptions, Client as DiscordClient } from "discord.js";
import type { Command } from "^/discord";
import db from "@/db/db";
import schema from "@/db/schema";

export class Client extends DiscordClient {
	commands: Map<string, Command>;
	db: typeof db;
	dbSchema: typeof schema;

	constructor(options: ClientOptions) {
		super(options);

		this.commands = new Map();
		this.db = db;
		this.dbSchema = schema;
	}
}
