import { Request, Response } from 'express';
import transaction, { dataModel } from '../models/dataModel';

export const indexController = (req: Request, res: Response) => {
	res.status(200).json({ message: 'We are fine' });
};

export const setDate = (req: Request, res: Response) => {
	transaction.find({}).lean().exec((err, doc: any) => {
		if (!err) {
			const docObj = doc[0];
			const objArr = [];
			for (let key in docObj) {
				objArr.push(docObj[key]);
			}
			res.status(200).json(objArr);
		}
	});
};