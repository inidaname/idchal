import { Router } from 'express';

import { Index } from './controllers';


export const routes = Router();

routes
    .get('/', Index.indexController)
    .post('/', Index.setDate);