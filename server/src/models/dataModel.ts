import mongoose from 'mongoose';

export type dataModel = mongoose.Document & {
    id: string,
    age: number,
    name: string,
    phone: string,
    geoInfo: {
        latitude: number,
        longitude: number
    },
    childrens: childrensModel
}

export type childrens = mongoose.Document & {
    (x: object): dataModel,
    connectionInfo: {
        type: string,
        confidence: number
    }
}

interface childrensModel extends Array<childrens> {}

const data = new mongoose.Schema({
    id: String,
    age: Number,
    name: String,
    phone: String,
    geoInfo: {
        latitude: Number,
        longitude: Number
    }
});

const childrens = data.clone();
childrens.add({
    connectionInfo: {
        type: {type: String},
        confidence: Number
    }
});

data.add({
    childrens: [childrens]
});
