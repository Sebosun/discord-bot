import express from 'express';
import router from './server/router';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const port = 4000;

const app = express();

app.use(express.json()); // Middleware to parse JSON datap
app.use(cors());

app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
