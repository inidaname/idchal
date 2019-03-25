import { Request, Response } from 'express';
import transaction from '../models/dataModel';

export const indexController = (req: Request, res: Response) => {
    res.status(200).json({message: 'We are fine'});
};

export const setDate = (req: Request, res: Response) => {
    transaction.findById()
}