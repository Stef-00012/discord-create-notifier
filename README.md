# Discord Create Addons Notifier

Create Addons Notifier is a Discord bot that connects to the [Create Addons](https://create-addons.stefdp.com) website's websocket (`wss://create-addons.stefdp.com/ws`) and notifies all configured guilds whenever a new addon for the Minecraft "Create" mod has been created or updated

### Configuration

1. Clone the repository
2. Rename the `env.example` file to `.env` and add your bot's token in the `TOKEN` variable
4. Add the modrinth and curseforge emojis to your apps emoji and put their emoji ID as `MODRINTH_EMOJI_ID` and `CURSEFORGE_EMOJI_ID` (the images can be found in the [`assets`](/assets) folder)
3. Setup the database (`bun db:setup`)
4. run the bot (`bun start`)

The bot can also be found [here](https://discord.com/oauth2/authorize?client_id=1390937506710683708&permissions=536870912&integration_type=0&scope=bot+applications.commands)

### Other Info

The bot profile picture was generated from ChatGPT using the [Create mod](https://modrinth.com/mod/create) logo as base