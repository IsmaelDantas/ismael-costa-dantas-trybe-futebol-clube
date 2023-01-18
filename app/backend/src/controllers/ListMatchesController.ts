// importa os tipos do express para utilizar no Request, Response e NextFunction
import { NextFunction, Request, Response } from 'express';
// importa o ListMatchesService para utilizar os métodos nele definidos
import ListMatchesService from '../services/ListMatchesService';

export default class ListMatchesController {
  // método que lista as partidas, caso o parâmetro inProgress seja passado, lista somente as partidas em andamento
  public static async listMatches(req: Request, res: Response, next: NextFunction) {
    try {
      // pega o parâmetro inProgress
      const { inProgress } = req.query;
      // caso o parâmetro inProgress esteja definido
      if (inProgress !== undefined) {
        // busca as partidas em andamento
        const inProg = await ListMatchesService.getByInProgressListMatches(
          inProgress as unknown as string,
        );
        // retorna as partidas
        res.status(200).json(inProg);
      } else {
        // busca todas as partidas
        const teams = await ListMatchesService.getListMatches();
        // retorna as partidas
        res.status(200).json(teams);
      }
    } catch (error) {
      // caso ocorra algum erro, passa o erro para o middleware de tratamento de erros
      next(error);
    }
  }

  // método que cria uma nova partida
  public static async saveMatches(req: Request, res: Response, next: NextFunction) {
    try {
      // pega o token do cabeçalho da requisição
      const { authorization } = req.headers;
      // valida o token
      if (authorization) {
        // cria a nova partida passando o corpo da requisição e o token
        const saveteams = await ListMatchesService.setMatches(req.body, authorization);
        // retorna a partida criada
        res.status(201).json(saveteams);
      }
    } catch (error) {
      // caso ocorra algum erro, passa o erro para o middleware de tratamento de erros
      next(error);
    }
  }

  // método que atualiza uma partida existente
  public static async updateMatches(req: Request, res: Response, next: NextFunction) {
    try {
      // chama o método de atualização passando o corpo da requisição e o id da partida
      await ListMatchesService.upMatches(req.body, Number(req.params.id));
      // retorna uma mensagem de sucesso
      res.status(200).json({ message: 'Update realized' });
    } catch (error) {
      // caso ocorra algum erro, passa o erro para o middleware de tratamento de erros
      next(error);
    }
  }

  // método que altera o status de uma partida para finalizada
  public static async statusMatches(req: Request, res: Response, next: NextFunction) {
    try {
      // chama o método que atualiza o status da partida para finalizada
      await ListMatchesService.setStatusMatches(Number(req.params.id));
      // retorna a mensagem de status finalizado
      res.status(200).json({ status: 'Finished' });
    } catch (error) {
      // caso ocorra algum erro, passa o erro para o middleware de tratamento de erros
      next(error);
    }
  }

  // método que busca uma partida pelo id passado na requisição
  public static async listTeamsById(req: Request, res: Response, next: NextFunction) {
    try {
      const teamsId = await ListMatchesService.getListMatchesId(Number(req.params.id));
      // retorna a partida encontrada
      res.status(200).json(teamsId);
    } catch (error) {
      // caso ocorra algum erro, passa o erro para o middleware de tratamento de erros
      next(error);
    }
  }
}
