type Tag = {
    "name": string,
    "description": string
}

export type SwaggerConfig = {
    "swagger": string,
    "info": {
        "version": string,
        "title": string,
        "description": string,
        "license"?: {
            "name": string,
            "url": string
        }
    },
    "components": {},
    "host": string,
    "basePath": string,
    "tags"?: Tag[],
    "schemes": string[],
    "consumes"?: string[],
    "produces"?: string[],
    "paths": {},
    "definitions"?: {}
}