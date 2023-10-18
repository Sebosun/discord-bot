import { Request, Response } from 'express';
import client from '../discordjs';

export function getServers(_: Request, res: Response) {
    const allGuilds = client.guilds.cache;
    const firstGuild = allGuilds.first();
    const textChannels = firstGuild?.channels.cache.filter((item) => {
        if (item.isTextBased() && !item.isVoiceBased()) {
            return item;
        }
    });
    const textChannelsMapped = textChannels?.map((item) => {
        return {
            name: item.name,
            id: item.id,
        };
    });
    console.log('channel name', textChannelsMapped);
    res.status(200);
    res.json({ message: allGuilds });
}
