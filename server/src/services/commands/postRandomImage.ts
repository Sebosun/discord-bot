import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getFile } from '../../helpers/readImagesFolder';

export const postRandomImage = {
    data: new SlashCommandBuilder().setName('random-image').setDescription('Post random image from folder'),
    async execute(interaction: ChatInputCommandInteraction) {
        const file = getFile();
        await interaction.reply({ files: [file] });
    },
};
