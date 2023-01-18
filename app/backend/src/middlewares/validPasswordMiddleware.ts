import { Request, Response, NextFunction } from 'express';
// Importa os tipos Request, Response e NextFunction do pacote express.
import HttpException from '../utils/HttpException';
// Importa a classe HttpException do arquivo '../utils/HttpException'

const validPasswordMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password } = req.body;
    // Destructuring para pegar o valor da propriedade 'password' do corpo da requisição
    if (password.length < 6) {
      // Verifica se a senha tem menos de 6 caracteres
      throw new HttpException(422, 'Password must be 6 characters');
      // Lança um HttpException com código 422 e mensagem 'Password must be 6 characters'
    }
  } catch (error) {
    throw new HttpException(422, 'Password must be 6 characters');
  }
  next();
  // Chama a próxima função middleware
};

export default validPasswordMiddleware;
