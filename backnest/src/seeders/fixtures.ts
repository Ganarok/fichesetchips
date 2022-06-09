import mongoose from "mongoose";
import { Preference } from "src/schemas/preference.schema";
import { User } from "src/schemas/user.schema";

export const fixtures: { preferences: Preference[], users: User[] } = {
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
            username: "admin",
            password: "FRENCH",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
            role: "ADMIN",
            preference: new Preference
        }
    ]
}