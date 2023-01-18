import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';

export default class AuthController {
  // método que autentica o usuário
  public static async auth(req: Request, res: Response, next: NextFunction) {
    try {
      // tenta autenticar o usuário
      const token = await AuthService.authentication(req.body);
      // retorna o token
      res.status(200).json({ token });
    } catch (error) {
      // trata o erro
      next(error);
    }
  }

  public static async loginValid(req: Request, res: Response, next: NextFunction) {
    // método que valida o login do usuário
    try {
      // pega o token do cabeçalho da requisição
      const { authorization } = req.headers;
      if (authorization) {
        // valida o token e retorna a role do usuário
        const validate = await AuthService.validateLogin(authorization);
        res.status(200).json({ role: validate });
      }
    } catch (error) {
      // trata o erro
      next(error);
    }
  }
}
