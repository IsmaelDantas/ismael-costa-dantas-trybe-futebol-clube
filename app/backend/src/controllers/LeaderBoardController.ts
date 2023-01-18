import { NextFunction, Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  // método que retorna a lista de classificação geral
  public static async listleaderBoard(_req: Request, res: Response, next: NextFunction) {
    try {
      // chama o serviço que retorna a lista de classificação geral
      const teams = await LeaderBoardService.getListleaderBoard();
      // retorna status 200 e a lista de classificação
      res.status(200).json(teams);
    } catch (error) {
      // caso ocorra algum erro, chama o next com o erro
      next(error);
    }
  }

  // método que retorna a lista de classificação de jogos em casa
  public static async listHomeleaderBoard(_req: Request, res: Response, next: NextFunction) {
    try {
      // chama o serviço que retorna a lista de classificação de jogos em casa
      const teams = await LeaderBoardService.getListHomeleaderBoard();
      // retorna status 200 e a lista de classificação
      res.status(200).json(teams);
    } catch (error) {
      // caso ocorra algum erro, chama o next com o erro
      next(error);
    }
  }

  // método que retorna a lista de classificação de jogos fora de casa
  public static async listAwayleaderBoard(_req: Request, res: Response, next: NextFunction) {
    try {
      // busca a lista de classificação de jogos fora de casa
      const teams = await LeaderBoardService.getListAwayleaderBoard();
      // retorna a lista com status 200
      res.status(200).json(teams);
    } catch (error) {
      // caso haja erro, chama o próximo middleware de tratamento de erros
      next(error);
    }
  }
}
