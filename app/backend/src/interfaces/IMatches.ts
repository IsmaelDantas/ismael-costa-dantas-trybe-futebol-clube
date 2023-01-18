interface IMatches {
  id?: number, // id da partida
  homeTeam: number, // id da equipe mandante
  awayTeam: number, // id da equipe visitante
  homeTeamGoals: number, // gols marcados pela equipe mandante
  awayTeamGoals: number, // gols marcados pela equipe visitante
  inProgress?: boolean, // informa se a partida está em andamento ou não
}

export default IMatches;
