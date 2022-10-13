const { defaultPreference } = require("../fixtures/preferences")

module.exports = {
    up: async(queryInterface, DataTypes) => {
        await queryInterface.createTable('Preferences', {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            theme: { type: DataTypes.STRING, allowNull: false, defaultValue: defaultPreference.theme },
            language: { type: DataTypes.STRING, allowNull: false, defaultValue: defaultPreference.language },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Preferences');
    }
};