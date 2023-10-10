// transpile to es6 imports
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import { commands } from './services/commandsCollector';
import * as dotenv from 'dotenv';

dotenv.config();

const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

if (!token) throw new Error('Token not set');
if (!clientId) throw new Error('Client id not set');
if (!guildId) throw new Error('Guild id id not set');

const commandsJsonified: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
commands.forEach((command) => {
    if (command.data.toJSON) {
        const commandToJson = command.data?.toJSON();
        commandsJsonified.push(commandToJson);
    } else {
        throw new Error('Command has no to JSON method');
    }
});

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

console.log(commandsJsonified);
// Deploy commands
(async () => {
    try {
        console.log(`Started refreshing ${commandsJsonified.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        /* const body = commandsJsonified; */
        const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsJsonified });
        if (Array.isArray(data)) {
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        }
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
