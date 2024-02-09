import { Client, Message, Channel, ChannelType } from 'discord.js';

type SavedMessage = {
    message: string;
    message_id?: string | null;
    channel_name?: string | null;
    channelId?: string | null;
    username?: string | null;
    author_id?: string | null;
    mention_username?: string | null;
    mention_id?: string | null;
    mention_reference?: string | null;
    attachement_types?: string[] | null;
    attachement_urls?: string[] | null;
};

export const handleMessageSave = async (message: Message<boolean>, client: Client<boolean>, guildId: string) => {
    if (message.guildId != guildId) return;

    const channel = client.channels.cache.get(message.channelId);
    const messageObject = prepareMessageData(message, channel);

    const messageUrls: string[] = [];
    const messageContentTypes: string[] = [];

    messageObject.attachement_urls = messageUrls;
    messageObject.attachement_types = messageContentTypes;
};

const prepareMessageData = (message: Message, channel: Channel | undefined): SavedMessage => {
    let messageObj: SavedMessage = {
        message: message.content,
        message_id: message.id,
        channelId: message.channelId,
        username: message.author.username,
        author_id: message.author.id,
    };

    const mentionUser = message.mentions.repliedUser;

    if (channel?.type != ChannelType.DM) {
        messageObj.channel_name = channel?.name;
    }

    if (mentionUser && message.reference) {
        messageObj.mention_username = mentionUser.username;
        messageObj.mention_id = mentionUser.id;
        messageObj.mention_reference = message.reference?.messageId;
    }

    return messageObj;
};
