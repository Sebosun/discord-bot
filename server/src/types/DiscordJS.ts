import { Client, Collection } from 'discord.js';

export interface FixingDiscordJSDocsBadExamplesType extends Client {
    commands: Collection<string, any>;
}
