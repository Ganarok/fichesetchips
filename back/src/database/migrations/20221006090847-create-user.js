const { defaultPreference } = require("../seeders/fixtures/preferences")
const { defaultUser } = require("../seeders/fixtures/users")

module.exports = {
    up: async(queryInterface, DataTypes) => {
        await queryInterface.createTable('Users', {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            username: { type: DataTypes.STRING, allowNull: false, unique: true },
            password: { type: DataTypes.STRING, allowNull: false },
            avatar: { type: DataTypes.STRING, allowNull: false, defaultValue: defaultUser.avatar },
            role: {
                allowNull: false,
                defaultValue: defaultUser.role,
                type: DataTypes.ENUM,
                values: ["USER", "ADMIN", "SUPERADMIN"],
            },
            preference_id: { type: DataTypes.UUID, allowNull: false, defaultValue: defaultPreference.id },
            last_connection: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
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
        await queryInterface.dropTable('Users');
    }
};