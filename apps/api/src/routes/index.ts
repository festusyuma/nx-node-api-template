import { Router } from 'express';

import AdminRouter from './adminRouter';
import AgentRouter from './agentRouter';
import AuthRouter from './authRouter';

const router = Router();

router.use('/admin', AdminRouter);
router.use('/auth', AuthRouter);
router.use('/agent', AgentRouter);

export default router;
