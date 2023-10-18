import { route } from '@backend-template/server';
import { Router } from 'express';

import { DefaultController } from '../controllers';

const router = Router();

router.get('/default', route(DefaultController, 'default'));

export default router;
