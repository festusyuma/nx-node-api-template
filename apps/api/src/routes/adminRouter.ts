import { Router } from 'express';

import AgencyRouter from './admin/agencyRouter';
import AgentRouter from './admin/agentRouter';

const router = Router();

router.use('/agency', AgencyRouter);
router.use('/agent', AgentRouter);

export default router;
