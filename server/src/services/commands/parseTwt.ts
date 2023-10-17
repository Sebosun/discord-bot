import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';
import { parseTwitterLink } from '../../helpers/parseTwitterLink';

export const parseTwt = {
    data: new SlashCommandBuilder()
        .setName('twt')
        .setDescription('Replace twitter link with preview')
        .addStringOption((option) => option.setName('link').setDescription('twitter or x.com link').setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {
        /* @ts-ignore */
        const link = interaction.options.getString('link');
        try {
            const vxTwtLink = parseTwitterLink(link);

            await interaction.reply(vxTwtLink);
        } catch (e) {
            await interaction.reply('Not a valid twitter link');
        }
    },
};
