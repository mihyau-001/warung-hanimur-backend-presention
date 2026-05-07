import * as express from 'express';
import { login } from '../auth/authController';

const router = express.Router();

router.post('/login', login);

export default router;