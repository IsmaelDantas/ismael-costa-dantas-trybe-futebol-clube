import { Request, Response, NextFunction } from 'express';
// Importa os tipos Request, Response e NextFunction do pacote express.
import HttpException from '../utils/HttpException';
// Importa a classe HttpException do arquivo '../utils/HttpException'

const httpErrorMiddleware = (
  erro: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { status, message } = erro as HttpException;
  // Desestruturação para pegar as propriedades 'status' e 'message' do objeto erro e faz um type-casting para HttpException
  res.status(status || 500).json({ message });
  // Define o status HTTP da resposta como o valor da propriedade 'status' do objeto erro, ou 500 se não existir e retorna uma resposta JSON com a propriedade 'message'
};

export default httpErrorMiddleware;
// Exporta a função httpErrorMiddleware como default.
