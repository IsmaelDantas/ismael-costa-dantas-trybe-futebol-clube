import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middlewares/authMiddleware';
import validPasswordMiddleware from '../middlewares/validPasswordMiddleware';

const router = Router();

// middleware de autenticação com verificação de email e senha preenchidos
router.post('/', authMiddleware, validPasswordMiddleware, AuthController.auth);

// rota para validação de token
router.get('/validate', AuthController.loginValid);

export default router;
