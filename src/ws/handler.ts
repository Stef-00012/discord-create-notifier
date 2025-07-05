import type { Client } from "&/DiscordClient";
import WebSocket from "ws";

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
}