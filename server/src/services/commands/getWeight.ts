import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import prisma from '../../db';

export const getWeight = {
    data: new SlashCommandBuilder().setName('get_weight').setDescription('Displays history of your weight inputs'),
    async execute(interaction: ChatInputCommandInteraction) {
        const user_id = interaction.member?.user.id;
        if (!user_id) {
            console.error('User ID not found');
            await interaction.reply("Couldn't find any results");
            return;
        }

        try {
            const items = await prisma.workout.findMany({
                where: {
                    authorID: user_id,
                },
            });

            const mapped_items = items.map((item) => {
                return `Date: ${item.createdAt}.  Weight: ${item.weight} `;
            });

            interaction.reply(mapped_items.join('\n'));
        } catch (e) {
            console.error(e);

            interaction.reply('Couldnt find records');
        }
    },
};
