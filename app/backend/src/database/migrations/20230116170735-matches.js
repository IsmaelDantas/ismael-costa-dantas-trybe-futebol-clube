module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Criando tabela 'matches' no banco de dados
    await queryInterface.createTable('matches', {
      // criando coluna 'id' como chave primaria, auto incrementável, do tipo INTEGER e que não pode ser nula
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      // criando coluna 'home_team' do tipo INTEGER, que não pode ser nula e possui uma referência para a tabela 'teams' com a chave 'id'
      home_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
      },
      // criando coluna 'home_team_goals' do tipo INTEGER, que não pode ser nula
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      // criando coluna 'away_team' do tipo INTEGER, que não pode ser nula e possui uma referência para a tabela 'teams' com a chave 'id'
      away_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
      },
      // criando coluna 'away_team_goals' do tipo INTEGER, que não pode ser nula
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      // criando coluna 'in_progress' do tipo BOOLEAN, que não pode ser nula
      in_progress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    });
  },
  // função para excluir a tabela 'matches' do banco de dados
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};
