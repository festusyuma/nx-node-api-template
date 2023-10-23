import { Router } from 'express';

import AdminRouter from './adminRouter';
import AuthRouter from './authRouter';

const router = Router();

router.use('/admin', AdminRouter);
router.use('/auth', AuthRouter);

export default router;
