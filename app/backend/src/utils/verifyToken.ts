import * as jwt from 'jsonwebtoken';
// Importa todos os módulos do pacote jsonwebtoken
import Ilogin from '../interfaces/Ilogin';
// Importa a interface Ilogin do arquivo '../interfaces/Ilogin'
import HttpException from './HttpException';
// Importa a classe HttpException do arquivo './HttpException'

export default function verifyToken(token: string) {
  // Declara uma função verifyToken que recebe um parâmetro token do tipo string
  try {
    // Tenta executar o código dentro do bloco
    const verifyTokens = jwt.verify(token, 'jwt_secret') as Ilogin;
    // Declara a constante verifyTokens e atribui o resultado da verificação do token utilizando a função verify do pacote jwt e o segredo 'jwt_secret', convertendo o tipo para Ilogin
    return verifyTokens;
    // Retorna o resultado da verificação
  } catch (error) {
    // Executa caso ocorra algum erro dentro do bloco try
    throw new HttpException(401, 'Token must be a valid token');
    // Lança uma exceção HttpException com código de status 401 e a mensagem 'Token must be a valid token'
  }
}
