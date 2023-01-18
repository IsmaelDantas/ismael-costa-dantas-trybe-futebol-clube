// importa bcryptjs para criptografar a senha
import * as bcrypt from 'bcryptjs';
// importa a função de criação de token
import signToken from '../utils/signToken';
// importa a função de validação de token
import verifyToken from '../utils/verifyToken';
// importa a classe HttpException para lançar exceções personalizadas
import HttpException from '../utils/HttpException';
// importa a interface Ilogin para validar o login
import Ilogin from '../interfaces/Ilogin';
// importa o modelo de usuário para realizar operações no banco de dados
import User from '../database/models/AuthModel';

export default class AuthService {
  // método para autenticação do usuário, comparando se o email e a senha estão corretos
  public static async authentication(ilogin: Ilogin) {
    // busca o usuário pelo email
    const findUserModal = await User.findOne({ where: { email: ilogin.email } });
    // se não encontrar o usuário ou a senha estiver incorreta, lança exceção
    if (!findUserModal
      || !bcrypt.compareSync(ilogin.password, findUserModal.password)) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    // se autenticar, retorna o token gerado
    return signToken(ilogin);
  }

  // método para validar o login do usuário, verificando se o token é válido e se o email existe no banco de dados
  public static async validateLogin(authorization: string) {
    // valida o token
    const tokenVerify = verifyToken(authorization);
    // pega o email do usuário
    const { email } = tokenVerify;
    // busca o usuário pelo email
    const user = await User.findOne({ where: { email } });
    // se não encontrou o usuário, retorna erro
    if (!user) throw new HttpException(401, 'Incorrect email or password');
    // retorna o papel do usuário
    return user.dataValues.role;
  }
}
