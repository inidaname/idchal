import { Request, Response } from 'express';
import transaction, { dataModel } from '../models/dataModel';

export const indexController = (req: Request, res: Response) => {
	res.status(200).json({ message: 'We are fine' });
};

export const setDate = (req: Request, res: Response) => {
	transaction.find({}).lean().exec((err, doc: any) => {
		if (!err) {
			const arrs: any = doc.map((v: any, i: any) => Object.keys(doc[i]).map((k) => [ doc[i][k] ][i]));
			res.status(200).json(arrs[0]);
		}
	});
};
