import { route } from '@backend-template/server';
import { Router } from 'express';

import { AgentController } from '../../controllers';

const router = Router();

router.post('/', route(AgentController, 'create'));
router.get('/', route(AgentController, 'findAll'));

export default router;
