import { Request, Response } from 'express';

export const indexController = (req: Request, res: Response) => {
    res.status(200).json({message: 'We are fine'});
};

export const setDate = (req: Request, res: Response) => {
    
}