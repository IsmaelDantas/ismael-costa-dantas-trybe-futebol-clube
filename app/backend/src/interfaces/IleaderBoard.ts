export interface IleaderBoardPromise {
  // Nome do time
  teamName?: string;
  // Nome do jogador
  name?: string,
  // Total de pontos
  totalPoints?: number,
  // Total de jogos
  totalGames?: number,
  // Total de vitórias
  totalVictories?: number,
  // Total de empates
  totalDraws?: number,
  // Total de derrotas
  totalLosses?: number,
  // Gols marcados
  goalsFavor?: number,
  // Gols sofridos
  goalsOwn?: number,
  // Saldo de gols
  goalsBalance?: number,
  // Eficiência
  efficiency?: string,
  // Time do jogador
  team?: string,
}

// tipo para a interface
type IleaderBoard = IleaderBoardPromise;

// exportando a interface
export default IleaderBoard;
