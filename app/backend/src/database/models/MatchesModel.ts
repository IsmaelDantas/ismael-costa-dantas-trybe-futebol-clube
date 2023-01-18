// Importando os módulos necessários
import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

// Criação da classe Matches
class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

// Inicialização do modelo Matches
Matches.init({
  // Definição das colunas e suas configurações
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  // Configurações adicionais
  underscored: true,
  sequelize: db, // instância do sequelize que será usada para criar e gerenciar a tabela
  modelName: 'Matches', // nome do modelo
  tableName: 'matches', // nome da tabela no banco de dados
  timestamps: false, // desativa a criação automática de colunas createdAt e updatedAt
});

// Fazendo a comunicação com as outras tabelas
Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeTeam' }); // time tem muitas partidas (como time mandante)
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayTeam' }); // time tem muitas partidas (como time visitante)
Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' }); // partida tem um time mandante
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' }); // partida tem um time visitante

export default Matches;
