import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getRandomImage } from '../../helpers/getRandomImage';
import { getURLAsBuffer } from '../../helpers/getURLAsBuffer';

export const postRandomImage = {
    data: new SlashCommandBuilder().setName('random-animal-img').setDescription('Post random image from folder'),
    async execute(interaction: ChatInputCommandInteraction) {
        const img = await getRandomImage();
        if (!img.url) {
            await interaction.reply("Couldn't find img");
            return;
        }
        const file = await getURLAsBuffer(img.url);
        await interaction.reply({ files: [file] });
    },
};
