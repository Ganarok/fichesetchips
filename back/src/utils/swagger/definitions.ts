import { loginRequest, registerRequest, SendReportRequest } from "./defaultValues";

export const definitions = {
    loginRequest: {
        properties: {
            username: {
                type: "string",
                uniqueItems: true,
                required: true,
                default: loginRequest.username
            },
            password: {
                type: "string",
                required: true,
                default: loginRequest.password
            }
        }
    },
    registerRequest: {
        properties: {
            username: {
                type: "string",
                uniqueItems: true,
                required: true,
                default: registerRequest.username
            },
            email: {
                type: "string",
                uniqueItems: true,
                required: true,
                default: registerRequest.email
            },
            password: {
                type: "string",
                required: true,
                default: registerRequest.password
            }
        }
    },
    sendReportRequest: {
        properties: {
            reason: {
                type: "string",
                uniqueItems: true,
                required: true,
                default: SendReportRequest.reason
            },
        }
    },
}