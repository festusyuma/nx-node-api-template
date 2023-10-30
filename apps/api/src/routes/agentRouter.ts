import { Router } from 'express';

const router = Router();
import DashboardRouter from './agent/dashboardRouter';

router.use('/dashboard', DashboardRouter);
export default router;
