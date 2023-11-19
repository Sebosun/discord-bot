import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import prisma from '../../db';

export const logWeight = {
    data: new SlashCommandBuilder()
        .setName('log_weight')
        .setDescription('Log your wieght into database')
        .addIntegerOption((option) => option.setName('weight').setDescription('Weight in kilograms').setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction) {
        /* @ts-ignore */
        const weight = interaction.options.getInteger('weight');
        const user_id = interaction.member?.user.id;
        if (!user_id) {
            console.error('User ID not found');
            await interaction.reply("Couldn't find any results");
            return;
        }

        try {
            await prisma.logWeight.create({
                data: {
                    authorID: user_id,
                    weight: weight,
                },
            });

            interaction.reply('Succesfuly logged weight');
        } catch (e) {
            console.error(e);
            interaction.reply('Couldnt log weight');
        }
    },
};
