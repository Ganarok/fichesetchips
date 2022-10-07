'use strict';

module.exports = {
    up: async(queryInterface) => {
        await queryInterface.sequelize.query(`ALTER TABLE "Users" ADD FOREIGN KEY (preference_id) REFERENCES "Preferences"(id);`)
    },

    down: async(queryInterface) => {
        await queryInterface.sequelize.query(`ALTER TABLE "Users" DROP FOREIGN KEY (preference_id);`)
    }
};