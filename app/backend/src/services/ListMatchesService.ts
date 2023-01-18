import Teams from '../database/models/TeamsModel'; // importa o modelo de equipes
import Matches from '../database/models/MatchesModel'; // importa o modelo de partidas
import HttpException from '../utils/HttpException'; // importa a classe de exceção http
import IMatches from '../interfaces/IMatches'; // importa a interface de partida
import verifyToken from '../utils/verifyToken'; // importa a função de verificação de token

export default class ListMatchesService {
  // método que lista todas as partidas
  public static async getListMatches() {
    // busca todas as partidas
    const findMatchesModal = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome' }, // inclui o modelo da equipe mandante
        { model: Teams, as: 'teamAway' }, // inclui o modelo da equipe visitante
      ],
    });
    if (!findMatchesModal) {
      throw new HttpException(404, 'Not Found'); // gera exceção caso não encontre nenhuma partida
    }
    return findMatchesModal; // retorna as partidas encontradas
  }

  // método que lista partidas em andamento
  public static async getByInProgressListMatches(inProgress: string) {
    // busca as partidas em andamento
    const findInProgressMatchesModal = await Matches.findAll({
      // inclui as informações dos times mandante e visitante
      include: [
        { model: Teams, as: 'teamHome' },
        { model: Teams, as: 'teamAway' },
      ],
      // verifica se a partida está em andamento
      where: { inProgress: inProgress === 'true' },
    });
    // caso não encontre partidas em andamento
    if (!findInProgressMatchesModal) {
      throw new HttpException(404, 'Not Found');
    }
    return findInProgressMatchesModal;
  }

  // método que valida se os times são diferentes
  private static async validateTeamsMatches(
    homeTeam: number,
    awayTeam: number,
  ) {
    // caso sejam iguais
    if (homeTeam === awayTeam) {
      throw new HttpException(
        422,
        'It is not possible to create a match with two equal teams',
      );
    }
    // busca os times por id
    const findByPkHomeTeam = await Matches.findByPk(homeTeam);
    const findByPkAwayTeam = await Matches.findByPk(awayTeam);
    // caso não encontre algum dos times
    if (!findByPkHomeTeam || !findByPkAwayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }
  }

  // método que cria uma partida
  public static async setMatches(body: IMatches, authorization: string): Promise<IMatches> {
    // valida se os times são diferentes
    await this.validateTeamsMatches(body.homeTeam, body.awayTeam);
    // valida o token
    verifyToken(authorization);
    // cria a partida
    const setMatchesModal = await Matches.create({
      homeTeam: body.homeTeam,
      awayTeam: body.awayTeam,
      homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: true,
    });
    // caso não tenha criado a partida
    if (!setMatchesModal) {
      throw new HttpException(404, 'Not Found');
    }
    // retorna a partida criada
    return setMatchesModal;
  }

  public static async getListMatchesId(id: number) {
    // busca uma partida específica pelo id
    const findMatchesModal = await Matches.findOne({ where: { id } });
    // caso a partida não seja encontrada, lança exceção
    if (!findMatchesModal) {
      throw new HttpException(404, 'Not Found');
    }
    return findMatchesModal;
  }

  public static async setStatusMatches(id: number) {
    // atualiza o status da partida para finalizada
    const statusMatchesModal = await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
    // caso a atualização falhe, lança exceção
    if (!statusMatchesModal) {
      throw new HttpException(404, 'Update failed');
    }
  }

  public static async upMatches(obj: IMatches, id: number) {
    // desestruturação para pegar apenas os valores de gols
    const { homeTeamGoals, awayTeamGoals } = obj;
    // atualiza a partida com os novos valores de gols
    const statusMatchesModal = await Matches.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    // verifica se a atualização foi bem sucedida
    if (!statusMatchesModal) {
      throw new HttpException(404, 'Update failed');
    }
  }
}
