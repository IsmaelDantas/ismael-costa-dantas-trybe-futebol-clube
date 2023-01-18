import { Router } from 'express';
import ListTeamsController from '../controllers/ListTeamsController';

const router = Router();

// Rota para listar todos os times
router.get('/', ListTeamsController.listTeams);

// Rota para listar um time específico pelo id
router.get('/:id', ListTeamsController.listTeamsById);

export default router;
