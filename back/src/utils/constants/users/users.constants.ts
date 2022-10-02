import { UserType } from "src/utils/types/users/users.types"
import { defaultPreference, defaultPreferences } from "../preferences/preferences.constants"

export const defaultUser = {
    id: "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
    username: "user0",
    password: "password",
    avatar: "url",
    role: "USER",
    preference_id: defaultPreference.id,
    createdAt: "2022-06-24T11:29:59.619Z",
    updatedAt: "2022-06-24T11:29:59.619Z"
}

export const defaultAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png"


export const defaultUsers = [{
    id: "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
    username: "user0",
    password: "password",
    avatar: "url",
    role: "USER",
    preference_id: defaultPreferences[0].id,
    createdAt: "2022-06-24T11:29:59.619Z",
    updatedAt: "2022-06-24T11:29:59.619Z"
}, {
    id: "d1ba718d-07c4-41e1-b852-232e686e8535",
    username: "user1",
    password: "password",
    avatar: "url",
    role: "USER",
    preference_id: defaultPreferences[1].id,
    createdAt: "2022-06-24T11:29:59.619Z",
    updatedAt: "2022-06-24T11:29:59.619Z"
}]