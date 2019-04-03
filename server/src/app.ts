import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { MONGODB_URI } from './util/secrets';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

import { routes } from './routes/routes';

// Create Express server
const app = express();

// // Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose
	.connect(mongoUrl, {  useNewUrlParser: true })
	.then(() => {
		/** ready to use. The `mongoose.connect()` promise resolves to undefined. */
	})
	.catch((err) => {
		console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
		// process.exit();
	});

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../../app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Request-with, Content-Type, Accept');
	next();
})

app.get('/', (req: Request, res: Response) => {
	res.send(__dirname + 'index.html');
});
app.use('/api', routes);

export default app;
