import { defaultPreference } from "./preferences.constants"

export const defaultAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png"

export const defaultUser = {
    id: "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
    username: "user",
    email: "user@email.com",
    password: "password",
    avatar: defaultAvatar,
    role: "USER",
    preference_id: defaultPreference.id,
    createdAt: "2022-06-24T11:29:59.619Z",
    updatedAt: "2022-06-24T11:29:59.619Z"
}

export const defaultAdmin = {
    id: "d1ba718d-07c4-41e1-b852-232e686e8535",
    username: "admin",
    email: "admin@email.com",
    password: "password",
    avatar: defaultAvatar,
    role: "ADMIN",
    preference_id: defaultPreference.id,
    createdAt: "2022-06-24T11:29:59.619Z",
    updatedAt: "2022-06-24T11:29:59.619Z"
}

export const defaultSuperAdmin = {
    id: "abba718d-07c4-41e1-b852-232e686e8535",
    username: "superadmin",
    email: "superadmin@email.com",
    password: "password",
    avatar: defaultAvatar,
    role: "SUPERADMIN",
    preference_id: defaultPreference.id,
    createdAt: "2022-06-24T11:29:59.619Z",
    updatedAt: "2022-06-24T11:29:59.619Z"
}

export const defaultUsers = [defaultUser, defaultAdmin, defaultSuperAdmin]