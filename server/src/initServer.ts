import express from 'express';
import { basePath } from './handlers/basePath';

const port = 3000;

const app = express();

app.use('/', basePath);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
