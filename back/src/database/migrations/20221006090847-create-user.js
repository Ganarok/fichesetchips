module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: { type: Sequelize.DataTypes.UUID, defaultValue: Sequelize.DataTypes.UUIDV4, primaryKey: true },
            email: { type: Sequelize.DataTypes.STRING, allowNull: false, unique: true },
            username: { type: Sequelize.DataTypes.STRING, allowNull: false, unique: true },
            password: { type: Sequelize.DataTypes.STRING, allowNull: false },
            avatar: { type: Sequelize.DataTypes.STRING, allowNull: false, defaultValue: "" },
            role: {
                allowNull: false,
                defaultValue: "USER",
                type: Sequelize.DataTypes.ENUM,
                values: ["USER", "ADMIN", "SUPERADMIN"],
            },
            preference_id: { type: Sequelize.DataTypes.UUID, allowNull: false, defaultValue: "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309" },
            last_connection: { type: Sequelize.DataTypes.DATE, allowNull: false, defaultValue: Sequelize.DataTypes.NOW },
            createdAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};