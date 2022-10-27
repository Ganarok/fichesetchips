import { loginRequest, registerRequest, updateRequest } from "./defaultValues";

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
    updateUserRequest: {
        properties: {
            username: {
                type: "string",
                uniqueItems: true,
                required: false,
                default: updateRequest.username
            },
            email: {
                type: "string",
                uniqueItems: true,
                required: false,
                default: updateRequest.email
            },
            password: {
                type: "string",
                required: false,
                default: updateRequest.password
            },
            avatar: {
                type: "string",
                required: false,
                default: updateRequest.avatar
            },
            preference_id: {
                type: "string",
                required: false,
                default: updateRequest.preference_id
            }
        }
    },
    unAuthorizedResponse: {
        properties: {
            message: {
                type: "string",
                default: "Authentification failed: wrong bearer token"
            },
            error: {
                type: "string",
                default: "Unauthorized"
            },
        }
    },
    notFoundResponse: {
        properties: {
            message: {
                type: "string",
                default: "Could not find any entity of type \"User\" matching: {\n    \"username\": \"user\"\n}"
            },
            error: {
                type: "string",
                default: "EntityNotFoundError"
            },
        }
    },
    conflictResponse: {
        properties: {
            message: {
                type: "string",
                default: "duplicate key value violates unique constraint \"UQ_e12875dfb3b1d92d7d7c5377e22\""
            },
            error: {
                type: "string",
                default: "QueryFailedError"
            },
        }
    },
    publicProfileResponse: {
        properties: {
            message: {
                type: "string",
                default: "User public profile successfully found"
            },
            user: {
                type: "object",
                default: {
                    "email": "user@email.com",
                    "username": "user",
                    "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                    "last_connection": "2022-10-27T09:09:43.733Z",
                    "created_at": "2022-06-24T11:29:59.619Z",
                    "updated_at": "2022-10-27T09:09:43.740Z"
                }
            },
        }
    },
    privateProfileResponse: {
        properties: {
            message: {
                type: "string",
                default: "User profile successfully found"
            },
            user: {
                type: "object",
                default: {
                    "id": "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
                    "email": "user@email.com",
                    "username": "user",
                    "password": "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6",
                    "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                    "role": "USER",
                    "preference_id": "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309",
                    "last_connection": "2022-10-27T09:11:50.268Z",
                    "created_at": "2022-06-24T11:29:59.619Z",
                    "updated_at": "2022-10-27T09:11:50.273Z",
                    "preference": {
                        "id": "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309",
                        "theme": "DEFAULT",
                        "language": "FRENCH",
                        "created_at": "2022-06-24T11:29:59.619Z",
                        "updated_at": "2022-06-24T11:29:59.619Z"
                    }
                }
            },
        }
    },
    authResponse: {
        properties: {
            message: {
                type: "string",
                default: "User succesfully authenticate"
            },
            user: {
                type: "object",
                default: {
                    "id": "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
                    "email": "user@email.com",
                    "username": "user",
                    "password": "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6",
                    "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                    "role": "USER",
                    "preference_id": "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309",
                    "last_connection": "2022-10-27T09:13:21.217Z",
                    "created_at": "2022-06-24T11:29:59.619Z",
                    "updated_at": "2022-10-27T09:13:21.225Z",
                    "preference": {
                        "id": "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309",
                        "theme": "DEFAULT",
                        "language": "FRENCH",
                        "created_at": "2022-06-24T11:29:59.619Z",
                        "updated_at": "2022-06-24T11:29:59.619Z"
                    }
                }
            },
            access_token: {
                type: "string",
                default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpZCI6ImVkZjFkYzM0LTM1MzQtNGNkNy04NWNmLWE5NDg4ZjEyNzlmOSIsImVtYWlsIjoidXNlckBlbWFpbC5jb20iLCJpYXQiOjE2NjY4NjIwMDF9.bpzyy5QySn3hZYwybmVioC_WUK8WAkg2DxtrYBudTcc",
            },
            expires_id: {
                type: "string",
                default: "3600"
            }
        }
    },
}