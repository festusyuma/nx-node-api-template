import { Router } from 'express';

import AuthRouter from './authRouter';

const router = Router();

router.use('/auth', AuthRouter);

export default router;
