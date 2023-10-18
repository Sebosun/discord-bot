import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getRandomCatImage } from '../../helpers/getRandomImage';
import { getURLAsBuffer } from '../../helpers/getURLAsBuffer';

export const postRandomCat = {
    data: new SlashCommandBuilder().setName('random-cat').setDescription('Post random cat image'),
    async execute(interaction: ChatInputCommandInteraction) {
        const img = await getRandomCatImage();
        if (!img.url) {
            await interaction.reply("Couldn't find img");
            return;
        }
        const file = await getURLAsBuffer(img.url);
        await interaction.reply({ files: [file] });
    },
};
