import { route } from '@backend-template/server';
import { Router } from 'express';

import { DefaultController } from '../controllers';
import AuthRouter from './authRouter';

const router = Router();

router.get('/default', route(DefaultController, 'default'));
router.use('/auth', AuthRouter);

export default router;
