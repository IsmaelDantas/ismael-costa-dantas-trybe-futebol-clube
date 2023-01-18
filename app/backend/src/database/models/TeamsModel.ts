import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  // Declara o id como um número
  declare id: number;
  // Declara o nome do time como uma string
  declare teamName: string;
}

// Inicializa o model com as colunas e configurações necessárias
Teams.init({
  id: {
    type: INTEGER, // tipo INTEGER
    primaryKey: true, // chave primária
    autoIncrement: true, // auto incremento
    allowNull: false, // não pode ser nulo
  },
  teamName: {
    type: STRING, // tipo string
    allowNull: false, // não pode ser nulo
  },
}, {
  underscored: true, // configura underscore na nomenclatura das colunas
  sequelize: db, // passa a conexão com o banco de dados
  modelName: 'Teams', // nome do model
  tableName: 'teams', // nome da tabela
  timestamps: false, // desabilita os timestamps
});

export default Teams;
