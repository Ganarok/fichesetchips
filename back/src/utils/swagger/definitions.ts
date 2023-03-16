import { characterWorkshopCreationResponse, createCharacterRequest, GetCharacterResponse, loginRequest, registerRequest, updateRequest } from "./defaultValues";

import defaultStories from "../../database/fixtures/stories"
import defaultRooms from "../../database/fixtures/rooms"

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
                    "updated_at": "2022-10-27T09:11:50.273Z"
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
                    "updated_at": "2022-10-27T09:13:21.225Z"
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
    friendsResponse: {
        properties: {
            message: {
                type: "string",
                default: "Friends succesfully found"
            },
            friends: {
                type: "array",
                default: [
                    {
                        "id": "569bae7b-288a-40ae-950e-d14be05b12ec",
                        "user_asked_id": "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
                        "user_answered_id": "0e72ef93-286e-489c-8f11-20c45fb84af3",
                        "accepted": true,
                        "nb_games": 0,
                        "created_at": "2022-06-28T11:30:59.619Z",
                        "updated_at": "2022-06-30T11:29:59.619Z",
                        "user_asked": {
                            "username": "user",
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                            "last_connection": "2022-10-28T13:57:03.740Z"
                        },
                        "user_answered": {
                            "username": "user2",
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                            "last_connection": "2022-06-24T11:29:59.619Z"
                        }
                    },
                    {
                        "id": "f34e710f-ac0d-42e5-bebd-797f694c047e",
                        "user_asked_id": "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
                        "user_answered_id": "f329fe99-8da0-421a-84b6-430765b65d97",
                        "accepted": true,
                        "nb_games": 0,
                        "created_at": "2022-06-24T11:29:59.619Z",
                        "updated_at": "2022-06-25T12:29:59.619Z",
                        "user_asked": {
                            "username": "user",
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                            "last_connection": "2022-10-28T13:57:03.740Z"
                        },
                        "user_answered": {
                            "username": "user1",
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                            "last_connection": "2022-06-24T11:29:59.619Z"
                        }
                    }
                ]
            }
        }
    },
    friendsPendingResponse: {
        properties: {
            message: {
                type: "string",
                default: "Friends succesfully found"
            },
            friends: {
                type: "array",
                default: [
                    {
                        "id": "569bae7b-288a-40ae-950e-d14be05b12ec",
                        "user_asked_id": "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
                        "user_answered_id": "0e72ef93-286e-489c-8f11-20c45fb84af3",
                        "accepted": false,
                        "nb_games": 0,
                        "created_at": "2022-06-28T11:30:59.619Z",
                        "updated_at": "2022-06-30T11:29:59.619Z",
                        "user_asked": {
                            "username": "user",
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                            "last_connection": "2022-10-28T13:57:03.740Z"
                        },
                        "user_answered": {
                            "username": "user2",
                            "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                            "last_connection": "2022-06-24T11:29:59.619Z"
                        }
                    }
                ]
            }
        }
    },
    characterWorkshopResponse: {
        properties: {
            message: {
                type: "string",
                default: "Steps successfully found"
            },
            data: {
                type: "object",
                default: characterWorkshopCreationResponse
            },
        }
    },
    getCharactersResponse: {
        properties: {
            message: {
                type: "string",
                default: "Characters successfully found"
            },
            data: {
                type: "array",
                default: [GetCharacterResponse]
            }
        }
    },
    getCharacterResponse: {
        properties: {
            message: {
                type: "string",
                default: "Character successfully created"
            },
            data: {
                type: "object",
                default: GetCharacterResponse
            }
        }
    },
    createCharacterRequest: {
        properties: {
            data: {
                type: "object",
                default: createCharacterRequest
            }
        }
    },
    getUniversesResponse: {
        properties: {
            message: {
                type: "string",
                default: "Universes successfully found"
            },
            data: {
                type: "array",
                default: [{ id: "cem", name: "Caves Et Monstres", image: "https://jolstatic.fr/www/captures/5405/7/148557.jpg", description: "Pas du tout Dungeon et Dragon" }]
            }
        }
    },
    getStoriesResponse: {
        properties: {
            message: {
                type: "string",
                default: "Stories successfully found"
            },
            data: {
                type: "array",
                default: [defaultStories[0]]
            }
        }
    },
    getStoryResponse: {
        properties: {
            message: {
                type: "string",
                default: "Story successfully found"
            },
            data: {
                type: "object",
                default: defaultStories[0]
            }
        }
    },
    createStoryRequest: {
        properties: {
            title: {
                type: "string",
                default: "Story title"
            },
            path: {
                type: "string",
                default: "story/path/file.pdf"
            }
        }
    },
    getRoomsResponse: {
        properties: {
            message: {
                type: "string",
                default: "Rooms successfully found"
            },
            data: {
                type: "array",
                default: [defaultRooms[0]]
            }
        }
    },
    getRoomResponse: {
        properties: {
            message: {
                type: "string",
                default: "Room successfully found"
            },
            data: {
                type: "object",
                default: defaultRooms[0]
            }
        }
    },
    createRoomRequest: {
        properties: {
            title: {
                type: "string",
                default: "Room title"
            },
            description: {
                type: "string",
                default: "Room description"
            },
            requirements: {
                type: "string",
                default: "Room requirements"
            },
            vocal_url: {
                type: "string",
                default: "Room vocal url"
            },
            is_private: {
                type: "boolean",
                default: "Room privacy"
            },
            is_published: {
                type: "boolean",
                default: "Room published"
            },
            password: {
                type: "string",
                default: "Room password"
            },
            players_nb_max: {
                type: "number",
                default: "Room nb_max"
            },
        }
    },
}