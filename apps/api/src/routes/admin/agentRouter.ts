import { route } from '@backend-template/server';
import { Router } from 'express';

import { AgentController } from '../../controllers';

const router = Router();

router.post('/', route(AgentController, 'create'));

export default router;
