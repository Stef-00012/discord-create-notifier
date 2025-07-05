declare namespace NodeJS {
	interface ProcessEnv extends ProcessEnv {
		TOKEN: string;
		WEBSOCKET_URL: string;
		MODRINTH_EMOJI_ID: string;
		CURSEFORGE_EMOJI_ID: string;
	}
}
