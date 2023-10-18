import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { TextChannel } from 'discord.js';
import client from '../discordjs';

export function handlePostMessage(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ message: errors.array() });
    }
    console.log('errors', errors);

    const { message, serverID } = req.body;

    const hardCodedServer = '1127931845280026627';

    const channel = client.channels.cache.get(serverID ?? hardCodedServer) as TextChannel | undefined;
    if (!channel) {
        console.error('No channel can be found');
        res.status(400);
        res.json({ message: 'Channel couldnt be found ' });
        return;
    }
    channel.send(message);

    res.status(200);
    res.json({ message: 'Test succesful' });
}
