import { NextFunction, Request, Response } from 'express';
import ListTeamsService from '../services/ListTeamsService';

export default class AuthController {
  // Método que lista todos os times
  public static async listTeams(_req: Request, res: Response, next: NextFunction) {
    try {
      // Chama o método getListTeams da classe ListTeamsService
      const teams = await ListTeamsService.getListTeams();
      // Retorna uma resposta com status 200 e os times
      res.status(200).json(teams);
    } catch (error) {
      // Caso aconteça algum erro, passa para o próximo middleware de tratamento de erro
      next(error);
    }
  }

  // Método que lista um time específico pelo id
  public static async listTeamsById(req: Request, res: Response, next: NextFunction) {
    try {
      // Pega o id do time a partir do parâmetro da requisição e converte para number
      const teamsId = await ListTeamsService.getListTeamsId(Number(req.params.id));
      // Retorna uma resposta com status 200 e o time
      res.status(200).json(teamsId);
    } catch (error) {
      // Caso aconteça algum erro, passa para o próximo middleware de tratamento de erro
      next(error);
    }
  }
}
