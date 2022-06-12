import { PreferenceType, UserType } from "../dto/types";

export const fixtures: { preferences: PreferenceType[], users: UserType[] } = {
    preferences: [
        {
            theme: "DEFAULT",
            language: "FRENCH"
        }, {
            theme: "DARK",
            language: "FRENCH"
        }, {
            theme: "DEFAULT",
            language: "ENGLISH"
        }],
    users: [
        {
            username: "user0",
            password: "$2b$10$3XdQgbcvMMuopZpiWgJi0.6AZxRxP45vCaRyoSJyv/35YtDM3MUA6",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
            role: "USER",
            preference_id: 1
        },
        {
            username: "admin",
            password: "$2b$10$3XdQgbcvMMuopZpiWgJi0.6AZxRxP45vCaRyoSJyv/35YtDM3MUA6",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
            role: "ADMIN",
            preference_id: 1
        }
    ]
}