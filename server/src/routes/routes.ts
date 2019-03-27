import { Router } from 'express';

import { Index } from './controllers';


export const routes = Router();

routes.route('/')
    .get(Index.indexController);

routes.route('/search')
    .get(Index.setDate);