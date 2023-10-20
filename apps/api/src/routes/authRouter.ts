import { route } from '@backend-template/server';
import { Router } from 'express';

import { AuthController } from '../controllers/authController';

const router = Router();

router.post('/login', route(AuthController, 'login'));
router.post('/recover-username', route(AuthController, 'recoverUsername'));
router.post('/forgot-password', route(AuthController, 'forgotPassword'));

export default router;
