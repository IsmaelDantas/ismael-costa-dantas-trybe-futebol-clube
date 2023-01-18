import * as jsonwebtoken from 'jsonwebtoken';
// Importa todos os módulos do pacote jsonwebtoken
import Ilogin from '../interfaces/Ilogin';
// Importa a interface Ilogin do arquivo '../interfaces/Ilogin'

export default function signToken(ilogin: Ilogin) {
  // Declara uma função signToken que recebe um parâmetro ilogin do tipo Ilogin
  const jwt = jsonwebtoken;
  // Declara a constante jwt e atribui o pacote jsonwebtoken
  const passSecret = process.env.JWT_SECRET || 'jwt_secret' as string;
  // Declara a constante passSecret e atribui o valor da variável de ambiente JWT_SECRET, se ela não existir, atribui a string 'jwt_secret'
  const payload = {
    username: ilogin.username,
    email: ilogin.email,
  };
  // Declara a constante payload e atribui um objeto com as propriedades 'username' e 'email' do ilogin
  return jwt.sign(payload, passSecret);
  // Retorna o token gerado a partir do payload e da passSecret, utilizando a função sign do pacote jwt
}
