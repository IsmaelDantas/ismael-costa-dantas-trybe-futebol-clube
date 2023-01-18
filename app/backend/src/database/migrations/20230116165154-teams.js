module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cria uma tabela "teams" com os campos especificados abaixo
    await queryInterface.createTable('teams', {
      id: {
      // Campo ID como primary key, auto incremento e não pode ser nulo
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      team_name: {
        // Campo para armazenar o nome do time, não pode ser nulo
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface) => {
    // Remove a tabela "teams"
    await queryInterface.dropTable('teams');
  },
};
