import { type ClientOptions, Client as DiscordClient } from "discord.js";
import type { Command } from "?/discord";
import db from "@/db/db"

export class Client extends DiscordClient {
    commands: Map<string, Command>;
    db: typeof db;

    constructor(options: ClientOptions) {
        super(options);

        this.commands = new Map()
        this.db = db;
    }
}