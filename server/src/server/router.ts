import { Router } from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import { handlePostMessage } from '../handlers/messages';
import { getServers } from '../handlers/getServers';
import { basePath } from '../handlers/basePath';

const storage = multer.diskStorage({
    destination: function(_, __, cb) {
        cb(null, '/home/seb/Pictures/Images');
    },
    filename: function(_, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

const router = Router();

router.get('/', basePath);

router.get('/all-servers', getServers);

router.post('/message', body('message').isString(), body('serverID').isString().optional(), handlePostMessage);

/* TODO: error handling */
/* https://github.com/expressjs/multer#error-handling */
router.post('/upload', upload.single('image'));

export default router;
