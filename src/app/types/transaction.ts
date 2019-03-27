export interface Transaction {
	id: string;
	age: number;
	name: string;
	phone: string;
	geoInfo: {
		latitude: number;
		longitude: number;
	};
	childrens: childrensModel;
}

export interface Childrens {
	(x: object): Transaction;
	connectionInfo: {
		type: string;
		confidence: number;
	};
}

interface childrensModel extends Array<Childrens> {}
