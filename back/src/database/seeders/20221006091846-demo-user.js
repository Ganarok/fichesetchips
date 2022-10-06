module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            id: "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
            username: "user",
            email: "user@email.com",
            password: "password",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
            role: "USER",
            preference_id: "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309",
            last_connection: "2022-06-24T11:29:59.619Z",
            createdAt: "2022-06-24T11:29:59.619Z",
            updatedAt: "2022-06-24T11:29:59.619Z"
        }, {
            id: "d1ba718d-07c4-41e1-b852-232e686e8535",
            username: "admin",
            email: "admin@email.com",
            password: "password",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
            role: "ADMIN",
            preference_id: "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309",
            last_connection: "2022-06-24T11:29:59.619Z",
            createdAt: "2022-06-24T11:29:59.619Z",
            updatedAt: "2022-06-24T11:29:59.619Z"
        }, {
            id: "abba718d-07c4-41e1-b852-232e686e8535",
            username: "superadmin",
            email: "superadmin@email.com",
            password: "password",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
            role: "SUPERADMIN",
            preference_id: "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309",
            last_connection: "2022-06-24T11:29:59.619Z",
            createdAt: "2022-06-24T11:29:59.619Z",
            updatedAt: "2022-06-24T11:29:59.619Z"
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', {});
    }
};