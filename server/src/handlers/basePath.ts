import { Request, Response } from 'express';

export const basePath = async (_: Request, res: Response) => {
    res.status(201);
    res.json({ message: 'Test succesful' });
};
