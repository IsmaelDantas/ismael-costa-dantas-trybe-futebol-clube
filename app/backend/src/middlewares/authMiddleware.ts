import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // desestruturando a requisão body para receber o email e a senha
  const { email, password } = req.body;
  try {
    // checa se tanto o email ou a senha estão presentes ou não
    if (!email || !password) {
      throw new HttpException(400, 'All fields must be filled');
    }
  } catch (error) {
    // se houver um erro, lança um erro com status code 400 e a mensagem
    throw new HttpException(400, 'All fields must be filled');
  }
  next();
};

export default authMiddleware;
