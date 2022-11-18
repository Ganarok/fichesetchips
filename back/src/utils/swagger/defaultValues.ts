import { LoginRequest, RegisterRequest } from "../types/auth";
import { SendReport } from "../types/reports";

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