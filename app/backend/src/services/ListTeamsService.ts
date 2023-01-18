import Teams from '../database/models/TeamsModel';
import HttpException from '../utils/HttpException';

export default class AuthService {
  // Método que lista todos os times
  public static async getListTeams() {
    const findTeamsModal = await Teams.findAll();
    // Verifica se há times cadastrados
    if (!findTeamsModal) {
      throw new HttpException(404, 'Not Found');
    }
    return findTeamsModal;
  }

  // Método que lista um time pelo id
  public static async getListTeamsId(id: number) {
    const findTeamsModal = await Teams.findOne({ where: { id } });
    // Verifica se há time com id informado
    if (!findTeamsModal) {
      throw new HttpException(404, 'Not Found');
    }
    return findTeamsModal;
  }
}
