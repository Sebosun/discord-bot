import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getEmoji } from '../../helpers/getEmoji';

export const stealEmoji = {
    data: new SlashCommandBuilder()
        .setName('steal')
        .setDescription('Steal an emoji from another server')
        .addStringOption((option) => option.setName('emoji').setDescription('emoji u want to steal').setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {
        /* @ts-ignore */
        const emoji = interaction.options.getString('emoji');
        console.log(interaction.options);
        const emojiURL = getEmoji(emoji);
        if (!emojiURL) {
            await interaction.reply(`Couldn't find emoji`);
            return;
        }
        await interaction.reply(emojiURL);
    },
};
