// Require the necessary discord.js classes
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { commands } from './services/commandsCollector';
import * as dotenv from 'dotenv';

dotenv.config();

interface FixingDiscordJSDocsBadExamplesType extends Client {
    commands: Collection<string, any>;
}
// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
}) as FixingDiscordJSDocsBadExamplesType;

/* const publicKey = process.env.PUBLIC_KEY; */
const appId = process.env.APP_ID;
const token = process.env.TOKEN;

const link = `https://discord.com/api/oauth2/authorize?client_id=${appId}&permissions=8&scope=bot%20applications.commands`;

console.log(`[Startup] You can add bot at ${link}`);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.commands = new Collection();

commands.forEach((command) => {
    if (!command.data.name) {
        throw new Error('Missing command name');
    }

    client.commands.set(command.data.name, command);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // doing this since discord.js devs are too lazy to do typescript properly
    const client = interaction.client as FixingDiscordJSDocsBadExamplesType;
    const command = client.commands.get(interaction.commandName);

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        if (!interaction.replied || !interaction.deferred) {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            return;
        }

        await interaction.followUp({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        });
    }
});

client.login(token);
