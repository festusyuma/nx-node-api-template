import { route } from '@backend-template/server';
import { Router } from 'express';

import { UserController } from '../../controllers';

const router = Router();

router.post('/', route(UserController, 'create'));
router.get('/', route(UserController, 'findAll'));

export default router;
