declare namespace NodeJS {
	interface ProcessEnv extends ProcessEnv {
		TOKEN: string;
		WEBSOCKET_URL: string;
	}
}
