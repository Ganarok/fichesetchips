import defaultAvatar from "./avatar"
import defaultPreferences from "./preferences"

const defaultPreference = defaultPreferences.defaultPreference

export default  {
    test: {
        id: "e0676065-f9f2-4f18-8f65-dcecbb8b58dc",
        username: "test",
        email: "test@email.com",
        password: "$2b$10$sXhesAHmGahQZV04rDfSl.4371W/ADZ50tNrSu4N55ybTnTYorABC", // password_hashed
        avatar: defaultAvatar,
        role: "USER",
        preference_id: defaultPreference.id,
        last_connection: "2022-06-24T11:29:59.619Z",
        created_at: "2022-06-24T11:29:59.619Z",
        updated_at: "2022-06-24T11:29:59.619Z"
    },
    defaultUser: {
        id: "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
        username: "user",
        email: "user@email.com",
        password: "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6", // "password"
        avatar: defaultAvatar,
        role: "USER",
        preference_id: defaultPreference.id,
        last_connection: "2022-06-24T11:29:59.619Z",
        created_at: "2022-06-24T11:29:59.619Z",
        updated_at: "2022-06-24T11:29:59.619Z"
    },
    defaultUser1: {
        id: "f329fe99-8da0-421a-84b6-430765b65d97",
        username: "user1",
        email: "user1@email.com",
        password: "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6", // "password"
        avatar: defaultAvatar,
        role: "USER",
        preference_id: defaultPreference.id,
        last_connection: "2022-06-24T11:29:59.619Z",
        created_at: "2022-06-24T11:29:59.619Z",
        updated_at: "2022-06-24T11:29:59.619Z"
    },
    defaultUser2: {
        id: "0e72ef93-286e-489c-8f11-20c45fb84af3",
        username: "user2",
        email: "user2@email.com",
        password: "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6", // "password"
        avatar: defaultAvatar,
        role: "USER",
        preference_id: defaultPreference.id,
        last_connection: "2022-06-24T11:29:59.619Z",
        created_at: "2022-06-24T11:29:59.619Z",
        updated_at: "2022-06-24T11:29:59.619Z"
    },
    defaultUser3: {
        id: "63c397e3-7ac7-425d-b261-7f3381a74540",
        username: "user3",
        email: "user3@email.com",
        password: "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6", // "password"
        avatar: defaultAvatar,
        role: "USER",
        preference_id: defaultPreference.id,
        last_connection: "2022-06-24T11:29:59.619Z",
        created_at: "2022-06-24T11:29:59.619Z",
        updated_at: "2022-06-24T11:29:59.619Z"
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
        created_at: "2022-06-24T11:29:59.619Z",
        updated_at: "2022-06-24T11:29:59.619Z"
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
        created_at: "2022-06-24T11:29:59.619Z",
        updated_at: "2022-06-24T11:29:59.619Z"
    }
}
