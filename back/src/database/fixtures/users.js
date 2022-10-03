const defaultAvatar = require("./avatar.js")
const { defaultPreference } = require("./preferences")

module.exports = {
    defaultUser: {
        id: "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
        username: "user",
        email: "user@email.com",
        password: "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6", // "password"
        avatar: defaultAvatar,
        role: "USER",
        preference_id: defaultPreference.id,
        last_connection: "2022-06-24T11:29:59.619Z",
        createdAt: "2022-06-24T11:29:59.619Z",
        updatedAt: "2022-06-24T11:29:59.619Z"
    },
    defaultAdmin: {
        id: "d1ba718d-07c4-41e1-b852-232e686e8535",
        username: "admin",
        email: "admin@email.com",
        password: "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6", // "password"
        avatar: defaultAvatar,
        role: "ADMIN",
        preference_id: defaultPreference.id,
        last_connection: "2022-06-24T11:29:59.619Z",
        createdAt: "2022-06-24T11:29:59.619Z",
        updatedAt: "2022-06-24T11:29:59.619Z"
    },
    defaultSuperAdmin: {
        id: "abba718d-07c4-41e1-b852-232e686e8535",
        username: "superadmin",
        email: "superadmin@email.com",
        password: "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6", // "password"
        avatar: defaultAvatar,
        role: "SUPERADMIN",
        preference_id: defaultPreference.id,
        last_connection: "2022-06-24T11:29:59.619Z",
        createdAt: "2022-06-24T11:29:59.619Z",
        updatedAt: "2022-06-24T11:29:59.619Z"
    }
}