export default {
    info: {
        title: "Fiches&Chips",
        description: "API REST du projet Fiches&Chips",
    },
    definitions: {
        "loginRequest": {
            $status: "ERROR",
            $msg: "some error message",
            error: {
                $message: "Error message caught",
                $name: "Error name",
                stack: "Error stack",
            },
        },
        "calculation": {
            $createdAt: "2020-03-31T00:00:00.000Z",
            $result: 100,
        },
    }
}