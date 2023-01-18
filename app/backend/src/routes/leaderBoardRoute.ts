import { Router } from 'express';
// Puxando router do express
import LeaderBoardController from '../controllers/LeaderBoardController';
// Puxando o Controller de LeaderBoard

const router = Router();

// Rota para listar a tabela de classificação geral
router.get('/', LeaderBoardController.listleaderBoard);

// Rota para listar a tabela de classificação dos jogos em casa
router.get('/home', LeaderBoardController.listHomeleaderBoard);

// Rota para listar a tabela de classificação dos jogos fora de casa
router.get('/away', LeaderBoardController.listAwayleaderBoard);

export default router;
// exportando router
