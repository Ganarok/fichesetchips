import { LoginRequest, RegisterRequest } from "../types/auth";
import { SendReport } from "../types/reports";
import { UpdateUser } from "../types/users";
import defaultPreferences from "../../database/fixtures/preferences"

export const loginRequest: LoginRequest = {
    username: "user",
    password: "password",
}

export const registerRequest: RegisterRequest = {
    username: "user",
    email: "user@email.com",
    password: "password"
}

export const SendReportRequest: SendReport = {
    reason: "A valid reason to report"
}

export const updateRequest: UpdateUser = {
    username: "user",
    email: "user@email.com",
    password: "password",
    avatar: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
    preference_id: defaultPreferences.darkPreference.id
}