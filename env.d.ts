declare namespace NodeJS {
	interface ProcessEnv extends ProcessEnv {
		TOKEN: string;
		CREATE_ADDONS_BASE_URL: string;
		CREATE_ADDONS_SECURE: string;
		MODRINTH_EMOJI_ID: string;
		CURSEFORGE_EMOJI_ID: string;
	}
}
