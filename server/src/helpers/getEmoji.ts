export const getEmojiUrl = (id: string) => `https://cdn.discordapp.com/emojis/${id}.png`;
export const getAnimatedEmojiUrl = (id: string) => `https://cdn.discordapp.com/emojis/${id}.gif`;

export const extractEmojiID = (emoji: string) => {
    const emojiRegex = /<(a)?:(\w+):(\d+)>/;
    const emojiStripped = emoji.match(emojiRegex);

    if (!emojiStripped) return;
    const isAnimated = !!emojiStripped[1];
    const id = emojiStripped[3];
    return { id, isAnimated };
};

export const getEmoji = (emoji: string) => {
    const extractedID = extractEmojiID(emoji);
    if (!extractedID) {
        throw new Error('Cant find emojiID');
    }

    const { isAnimated, id } = extractedID;

    if (isAnimated) {
        return getAnimatedEmojiUrl(id);
    }
    return getEmojiUrl(id);
};
