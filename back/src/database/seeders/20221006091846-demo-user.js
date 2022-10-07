const { defaultUser, defaultAdmin, defaultSuperAdmin } = require("./fixtures/users.js")

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [defaultUser, defaultAdmin, defaultSuperAdmin]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', {});
    }
};