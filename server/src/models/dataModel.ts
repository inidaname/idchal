import mongoose from 'mongoose';

export type dataModel = mongoose.Document & {
	id: string;
	age: number;
	name: string;
	phone: string;
	geoInfo: {
		latitude: number;
		longitude: number;
	};
	childrens: childrensModel;
};

export type childrens = mongoose.Document & {
	(x: object): dataModel;
	connectionInfo: {
		type: string;
		confidence: number;
	};
};

interface childrensModel extends Array<childrens> {}

const dataSchema = new mongoose.Schema(
	{
		id: String,
		age: Number,
		name: String,
		phone: String,
		geoInfo: {
			latitude: Number,
			longitude: Number
		}
	},
	{ _id: false }
);

const childrens = dataSchema.clone();
childrens.add({
	connectionInfo: {
		type: { type: String },
		confidence: Number
	}
});

dataSchema.add({
	childrens: [ childrens ]
});

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const transaction = mongoose.model('transaction', dataSchema, 'transaction');
export default transaction;
