import { Router } from 'express';

import AgencyRouter from './admin/agencyRouter';
import AgentRouter from './admin/agentRouter';
import UserRouter from './admin/userRouter';

const router = Router();

router.use('/agency', AgencyRouter);
router.use('/agent', AgentRouter);
router.use('/user', UserRouter);

export default router;
