import { route } from '@backend-template/server';
import { Router } from 'express';

import { DashboardController } from '../../controllers';

const router = Router();

router.post('/createBusiness', route(DashboardController, 'createBusiness'));
router.get(
  '/findRegisteredBusinessCount',
  route(DashboardController, 'findRegisteredBusinessCount')
);

export default router;
