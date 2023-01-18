import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import IleaderBoard from '../interfaces/IleaderBoard';

export default class LeaderBoardService {
  private static _objValor(value: string) { return Object.values(value); }
  private static _objKey(value: string) { return Object.keys(value); }

  private static _objctComparationHomeAway(value: string): number {
    if (this._objKey(value)[2] === 'homeTeam') {
      return Object(this._objValor(value)[2])
        .filter((ma: any) => ma.homeTeamGoals > ma.awayTeamGoals)
        .length;
    }
    if (this._objKey(value)[2] === 'awayTeam') {
      return Object(this._objValor(value)[2])
        .filter((ma: any) => ma.homeTeamGoals < ma.awayTeamGoals)
        .length;
    }
    return 0;
  }

  private static _objctHomeAwayGoals(value: string): number {
    if (this._objKey(value)[2] === 'homeTeam'
      && this._objKey(value)[3] === 'awayTeam') {
      const v2 = Object(this._objValor(value)[2])
        .filter((ma: any) => ma.homeTeamGoals > ma.awayTeamGoals);
      const v3 = Object(this._objValor(value)[3])
        .filter((ma: any) => ma.homeTeamGoals < ma.awayTeamGoals);
      return v2.length + v3.length;
    }
    return 0;
  }

  private static _empateHomeAway(value: string): number {
    if (this._objKey(value)[2] === 'homeTeam'
      && this._objKey(value)[3] === 'awayTeam') {
      const v2 = Object(this._objValor(value)[2])
        .filter((ma: any) => ma.homeTeamGoals === ma.awayTeamGoals);
      const v3 = Object(this._objValor(value)[3])
        .filter((ma: any) => ma.homeTeamGoals === ma.awayTeamGoals);
      return v2.length + v3.length;
    }
    return Object(this._objValor(value)[2])
      .filter((ma: any) => ma.homeTeamGoals === ma.awayTeamGoals)
      .length;
  }

  private static _sumGoals(value: any): number {
    if (this._objKey(value)[2] === 'homeTeam') {
      return Object(this._objValor(value)[2])
        .reduce((add: any, acc: any) => add + acc.homeTeamGoals, 0);
    }
    if (this._objKey(value)[2] === 'awayTeam') {
      return Object(this._objValor(value)[2])
        .reduce((add: any, acc: any) => add + acc.awayTeamGoals, 0);
    }
    return 0;
  }

  private static _sumGoalsHomeAway(value: any): number {
    if (this._objKey(value)[2] === 'homeTeam'
      && this._objKey(value)[3] === 'awayTeam') {
      return Object(this._objValor(value)[2])
        .reduce((add: any, acc: any) => add + acc.homeTeamGoals, 0)
        + Object(this._objValor(value)[3])
          .reduce((add: any, acc: any) => add + acc.awayTeamGoals, 0);
    }
    return 0;
  }

  private static _subGoals(value: any): number {
    if (this._objKey(value)[2] === 'homeTeam') {
      return Object(this._objValor(value)[2])
        .reduce((add: any, acc: any) => add + acc.awayTeamGoals, 0);
    }
    if (this._objKey(value)[2] === 'awayTeam') {
      return Object(this._objValor(value)[2])
        .reduce((add: any, acc: any) => add + acc.homeTeamGoals, 0);
    }
    return 0;
  }

  private static _subGoalsHomeAway(value: any): number {
    if (this._objKey(value)[2] === 'homeTeam'
      && this._objKey(value)[3] === 'awayTeam') {
      return Object(this._objValor(value)[2])
        .reduce((add: any, acc: any) => add + acc.awayTeamGoals, 0)
        + Object(this._objValor(value)[3])
          .reduce((add: any, acc: any) => add + acc.homeTeamGoals, 0);
    }
    return 0;
  }

  private static _totalPoints(valor: string): number {
    return this._totalVictories(valor) * 3 + this._totalDraws(valor) * 1;
  }

  private static _totalGames(valor: string): number {
    if (this._objKey(valor)[2] === 'homeTeam'
      && this._objKey(valor)[3] === 'awayTeam') {
      return Object.values(valor)[2].length + Object.values(valor)[3].length;
    }
    return Object.values(valor)[2].length;
  }

  private static _totalVictories(valor: string): number {
    if (this._objKey(valor)[2] === 'homeTeam'
      && this._objKey(valor)[3] === 'awayTeam') {
      return this._objctHomeAwayGoals(valor);
    }
    return this._objctComparationHomeAway(valor);
  }

  private static _totalDraws(valor: string): number {
    return this._empateHomeAway(valor);
  }

  private static _totalLosses(valor: string): number {
    return this._totalGames(valor) - (this._totalVictories(valor)
    + this._totalDraws(valor));
  }

  private static _goalsFavor(valor: string): number {
    if (this._objKey(valor)[2] === 'homeTeam'
      && this._objKey(valor)[3] === 'awayTeam') {
      return this._sumGoalsHomeAway(valor);
    }
    return this._sumGoals(valor);
  }

  private static _goalsOwn(valor: string): number {
    if (this._objKey(valor)[2] === 'homeTeam'
      && this._objKey(valor)[3] === 'awayTeam') {
      return this._subGoalsHomeAway(valor);
    }
    return this._subGoals(valor);
  }

  private static _goalsBalance(valor: string): number {
    return this._goalsFavor(valor) - this._goalsOwn(valor);
  }

  private static _efficiency(valor: any): string {
    return (((this._totalPoints(valor)
    / (this._totalGames(valor) * 3)) * 100)).toFixed(2);
  }

  private static _listReturn(listReturn: any[]) {
    return listReturn.map((ma) => ({
      name: ma.teamName,
      totalPoints: this._totalPoints(ma.dataValues),
      totalGames: this._totalGames(ma.dataValues),
      totalVictories: this._totalVictories(ma.dataValues),
      totalDraws: this._totalDraws(ma.dataValues),
      totalLosses: this._totalLosses(ma.dataValues),
      goalsFavor: this._goalsFavor(ma.dataValues),
      goalsOwn: this._goalsOwn(ma.dataValues),
      goalsBalance: this._goalsBalance(ma.dataValues),
      efficiency: this._efficiency(ma.dataValues),
    }));
  }

  private static _orderReturn(listReturn: IleaderBoard[]): IleaderBoard[] {
    return this._listReturn(listReturn).sort((x, y) =>
      y.totalPoints - x.totalPoints || y.goalsBalance - x.goalsBalance
      || y.goalsFavor - x.goalsFavor || x.goalsOwn - y.goalsOwn);
  }

  public static async getListleaderBoard(): Promise<IleaderBoard[]> {
    const listReturn = await Teams.findAll({
      include: [
        { model: Matches, as: 'homeTeam', where: { inProgress: false } },
        { model: Matches, as: 'awayTeam', where: { inProgress: false } },
      ],
    });
    return this._orderReturn(listReturn);
  }

  public static async getListHomeleaderBoard(): Promise<IleaderBoard[]> {
    const listReturnHome = await Teams.findAll({
      include: [
        { model: Matches, as: 'homeTeam', where: { inProgress: false } },
      ],
    });
    return this._orderReturn(listReturnHome);
  }

  public static async getListAwayleaderBoard(): Promise<IleaderBoard[]> {
    const listReturnAway = await Teams.findAll({
      include: [
        { model: Matches, as: 'awayTeam', where: { inProgress: false } },
      ],
    });
    return this._orderReturn(listReturnAway);
  }
}
