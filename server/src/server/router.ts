import { TextChannel } from 'discord.js';
import { Router } from 'express';
import multer from 'multer';
import client from '../discordjs';

const storage = multer.diskStorage({
    destination: function (_, __, cb) {
        cb(null, '/home/seb/Pictures/Images');
    },
    filename: function (_, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

const router = Router();

router.get('/', (_, res) => {
    console.log('default path');
    res.status(200);
    res.json({ message: 'Test succesful' });
});

router.get('/all-servers', (_, res) => {
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
});

router.post('/message', (req, res) => {
    if (!req.body || !req.body.message) {
        res.status(400);
        res.json({ message: 'No message sent' });
        return;
    }

    const message = req.body.message;
    const channel = client.channels.cache.get('1127931845280026627') as TextChannel | undefined;
    if (!channel) {
        console.error('No channel can be found');
        res.status(400);
        res.json({ message: 'Channel couldnt be found ' });
        return;
    }
    channel.send(message);

    res.status(200);
    res.json({ message: 'Test succesful' });
});

/* TODO: error handling */
/* https://github.com/expressjs/multer#error-handling */
router.post('/upload', upload.single('image'), function (req, res) {
    if (!req.file) {
        res.status(400);
        res.json({ message: 'Missing file' });
        return;
    }

    console.log('req.file', req.file);

    const message = `File ${req.file.filename} has been added to the folder`;
    const channel = client.channels.cache.get('1127931845280026627') as TextChannel | undefined;
    if (!channel) {
        console.error('No channel can be found');
        res.status(400);
        res.json({ message: 'Channel couldnt be found ' });
        return;
    }
    channel.send(message);

    res.status(200);
    res.json();
});

export default router;
