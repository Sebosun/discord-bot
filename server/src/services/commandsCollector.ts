import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { calculateTdee } from './commands/tdee';
import { stealEmoji } from './commands/steal';
import { postRandomImage } from './commands/postRandomImage';
import { parseTwt } from './commands/parseTwt';

type Commands = {
    data: Partial<SlashCommandBuilder>;
    execute: (interaction: ChatInputCommandInteraction, client?: Client) => Promise<void>;
};

const ping = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction: ChatInputCommandInteraction) {
        console.log(interaction);
        await interaction.reply('Pong!');
    },
};

export const commands: Commands[] = [ping, calculateTdee, stealEmoji, postRandomImage, parseTwt];
