const { defaultPreference, darkPreference } = require("./fixtures/preferences.js")

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Preferences', [defaultPreference, darkPreference]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Preferences', {});
    }
};