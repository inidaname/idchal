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

interface childrens extends dataModel {
	connectionInfo: {
		type: string,
		confidence: number,
	};
	childrens: childrensModel,
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
	{ 
		_id: false
	}
);

const childrens = dataSchema.clone();
childrens.add({
	connectionInfo: {
		type: { type: String },
		confidence: Number
	},
	childrens: [ childrens ]
});

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const transaction = mongoose.model('transactions', dataSchema, 'transactions');
export default transaction;
