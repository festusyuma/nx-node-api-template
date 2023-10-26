import { route } from '@backend-template/server';
import { Router } from 'express';

import { AgencyController } from '../../controllers';

const router = Router();

router.post('/', route(AgencyController, 'create'));
router.get('/', route(AgencyController, 'findAll'));

export default router;
