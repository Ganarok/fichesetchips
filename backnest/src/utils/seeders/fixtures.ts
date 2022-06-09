import mongoose from "mongoose";
import { Preference } from "src/schemas/preference.schema";
import { User } from "src/schemas/user.schema";

export const fixtures: { preferences: Preference[], users: User[] } = {
    preferences: [
        {
            _id: new mongoose.Types.ObjectId("62a1bc57f1343ffe0c12ef09"),
            theme: "DEFAULT",
            language: "FRENCH"
        }, {
            _id: new mongoose.Types.ObjectId("62a1bc57f1343ffe0c12ef0a"),
            theme: "DARK",
            language: "FRENCH"
        }, {
            _id: new mongoose.Types.ObjectId("62a1bc57f1343ffe0c12ef0b"),
            theme: "DEFAULT",
            language: "ENGLISH"
        }],
    users: [
        {
            _id: new mongoose.Types.ObjectId("62a1df5eee1a4bea1108ba4d"),
            username: "user0",
            password: "$2b$10$3XdQgbcvMMuopZpiWgJi0.6AZxRxP45vCaRyoSJyv/35YtDM3MUA6",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
            role: "USER",
            preference_id: new mongoose.Types.ObjectId("62a1bc57f1343ffe0c12ef09")
        },
        {
            _id: new mongoose.Types.ObjectId("62a1df5eee1a4bea1108ba4e"),
            username: "admin",
            password: "$2b$10$3XdQgbcvMMuopZpiWgJi0.6AZxRxP45vCaRyoSJyv/35YtDM3MUA6",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
            role: "ADMIN",
            preference_id: new mongoose.Types.ObjectId("62a1bc57f1343ffe0c12ef09")
        }
    ]
}