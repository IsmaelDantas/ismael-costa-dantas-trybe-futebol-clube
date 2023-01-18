import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

// Inicializa a classe User com os atributos e configurações necessárias
User.init({
  id: {
    type: INTEGER, // tipo INTEGER para o atributo id
    primaryKey: true, // chave primária
    autoIncrement: true, // auto-incremento
    allowNull: false, // não pode ser nulo
  },
  username: {
    type: STRING, // tipo STRING para o atributo username
    allowNull: false, // não pode ser nulo
  },
  role: {
    type: STRING, // tipo STRING para o atributo role
    allowNull: false, // não pode ser nulo
  },
  email: {
    type: STRING, // tipo STRING para o atributo email
    allowNull: false, // não pode ser nulo
  },
  password: {
    type: STRING, // tipo STRING para o atributo password
    allowNull: false, // não pode ser nulo
  },
}, {
  underscored: true, // utilizar nomes de tabelas e atributos com underline
  sequelize: db, // instância do banco de dados
  modelName: 'User', // nome do modelo
  tableName: 'users', // nome da tabela
  timestamps: false, // não utilizar timestamps
});

export default User;
