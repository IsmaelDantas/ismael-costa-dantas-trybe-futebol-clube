const { timeStamp } = require("console");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cria a tabela 'users'
    await queryInterface.createTable('users', {
      // Adiciona uma coluna 'id' como chave primária, auto-incremento, do tipo INTEGER e não nula
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      // Adiciona uma coluna 'username' do tipo STRING e não nula
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Adiciona uma coluna 'role' do tipo STRING e não nula
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Adiciona uma coluna 'email' do tipo STRING e não nula
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // Adiciona uma coluna 'password' do tipo STRING e não nula
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface) => {
    // Remove a tabela 'users'
    await queryInterface.dropTable('users');
  },
};
