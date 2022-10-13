import { loginRequest } from "./defaultValues";

export const definitions = {
    "loginRequest": {
        "properties": {
            "username": {
                "type": "string",
                "uniqueItems": true,
                "required": true,
                "default": loginRequest.username
            },
            "password": {
                "type": "string",
                "required": true,
                "default": loginRequest.password
            }
        }
    }
}