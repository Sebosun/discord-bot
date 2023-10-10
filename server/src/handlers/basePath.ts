import { Request, Response } from 'express';

export const basePath = async (req: Request, res: Response) => {
    console.log(req, res);
    res.status(201);
    res.json({ message: 'Test succesful' });
};
