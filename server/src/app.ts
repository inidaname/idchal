import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

import { routes } from './routes/routes';

// Create Express server
const app = express();

// // Connect to MongoDB
// const mongoUrl = MONGODB_URI;
// (<any>mongoose).Promise = global.Promise;
// mongoose.connect(mongoUrl, {useMongoClient: true}).then(
//   () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
// ).catch(err => {
//   console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
//   // process.exit();
// });



app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../../app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
	res.send(__dirname + 'index.html');
});
app.use('/api', routes);

export default app;
