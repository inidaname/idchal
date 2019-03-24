import express from 'express';

import { routes } from './routes/main'

export const app = express();

app.use('/api', routes);
