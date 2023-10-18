import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getRandomDuckImage } from '../../helpers/getRandomImage';
import { getURLAsBuffer } from '../../helpers/getURLAsBuffer';

export const postRandomDuck = {
    data: new SlashCommandBuilder().setName('random-duck').setDescription('Post random duck'),
    async execute(interaction: ChatInputCommandInteraction) {
        const img = await getRandomDuckImage();
        if (!img.url) {
            await interaction.reply("Couldn't find img");
            return;
        }
        const file = await getURLAsBuffer(img.url);
        await interaction.reply({ files: [file] });
    },
};
