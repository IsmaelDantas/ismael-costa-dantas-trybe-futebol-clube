import { Router } from 'express';
import ListMatchesController from '../controllers/ListMatchesController';

const router = Router();

// Rota para listar todos os jogos
router.get('/', ListMatchesController.listMatches);

// Rota para salvar um novo jogo
router.post('/', ListMatchesController.saveMatches);

// Rota para atualizar o status de um jogo para finalizado
router.patch('/:id/finish', ListMatchesController.statusMatches);

// Rota para atualizar informações de um jogo
router.patch('/:id', ListMatchesController.updateMatches);

export default router;
