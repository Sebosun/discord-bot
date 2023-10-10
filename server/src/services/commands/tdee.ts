import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const NAME = 'tdee';
const DESCRIPTION = 'Calculates tdee based on user input';

function calculateBmr(mass: number, height: number, age: number, sex: string) {
    if (sex === 'male') {
        const maleBmr = 10 * mass + 6.25 * height - 5 * age + 5;
        return maleBmr;
    } else if (sex === 'female') {
        const femoidBmr = 10 * mass + 6.25 * height - 5 * age - 161;
        return femoidBmr;
    }
}

function getBmi(mass: number, height: number) {
    const floatHeight = (height / 100) ** 2;
    const bmi = mass / floatHeight;
    return bmi;
}

export const calculateTdee = {
    data: new SlashCommandBuilder()
        .setName(NAME)
        .setDescription(DESCRIPTION)
        .addIntegerOption((option) => option.setName('weight').setDescription('Weight in kilograms').setRequired(true))
        .addIntegerOption((option) => option.setName('height').setDescription('Height in cms').setRequired(true))
        .addIntegerOption((option) => option.setName('age').setDescription('Your age').setRequired(true))
        .addStringOption((option) =>
            option
                .setName('sex')
                .setDescription('If ur a maleoid or femoid')
                .setRequired(true)
                .addChoices({ name: 'Male', value: 'male' }, { name: 'Femoid', value: 'female' }),
        )
        .addStringOption((option) =>
            option
                .setName('exercise')
                .setDescription('Exercise level')
                .setRequired(true)
                .addChoices(
                    { name: 'Sedentary - no exercise', value: 'sedentary' },
                    { name: 'Light Exercise - 1-2 times a week', value: 'light' },
                    { name: 'Moderate Exercise - 3-5 times a week', value: 'moderate' },
                    { name: 'Heavily Exercise - 6-7 times a week', value: 'heavily' },
                    { name: 'Athlete - 2x per day', value: 'athlete' },
                ),
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        console.log(interaction.options);
        /* @ts-ignore */
        const weight = interaction.options.getInteger('weight');
        /* @ts-ignore */
        const height = interaction.options.getInteger('height');
        /* @ts-ignore */
        const age = interaction.options.getInteger('age');
        /* @ts-ignore */
        const sex = interaction.options.getString('sex');
        /* @ts-ignore */
        const exercise = interaction.options.getString('exercise');
        if (!(weight && height && age && sex && exercise)) {
            return;
        }

        const bmr = calculateBmr(weight, height, age, sex);
        if (!bmr) {
            interaction.reply('Something went wrong');
            return;
        }

        let tdee: number;

        if (exercise === 'sedentary') {
            tdee = bmr * 1.2;
        } else if (exercise === 'light') {
            tdee = bmr * 1.375;
        } else if (exercise === 'moderate') {
            tdee = bmr * 1.55;
        } else if (exercise === 'heavily') {
            tdee = bmr * 1.725;
        } else if (exercise === 'athlete') {
            tdee = bmr * 1.9;
        }

        const bmi = getBmi(weight, height);

        await interaction.reply(`Your TDEE is ${Math.round(tdee)}kcal. Your BMI is ${bmi}`);
    },
};
