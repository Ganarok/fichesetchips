
export function getErrorMessage(error: unknown, res: any) {
    if (error instanceof Error) {
        if (error.name.includes("NotFound")) {
            return res.status(404).send({ message: error.message, error: error.name })
        } else if (error.name.includes("QueryFailed")) {
            return res.status(409).send({ message: error.message, error: error.name })
        } else if (error.message == "Wrong username or password") {
            return res.status(404).send({ message: error.message, error: "User not found" })
        } else if (error.message == "Unexpected parameters") {
            return res.status(400).send({ message: error.message, error: error.name })
        } else if (error.message == "Unauthorized") {
            return res.status(401).send({ message: error.message, error: error.name })
        } else if (error.message == "Forbidden") {
            return res.status(403).send({ message: error.message, error: error.name })
        } else if (error.message == "Token expired") {
            return res.status(401).send({ message: error.message, error: error.name })
        } else if (error.message == "Invalid token") {
            return res.status(401).send({ message: error.message, error: error.name })
        } else if (error.message == "Invalid signature") {
            return res.status(401).send({ message: error.message, error: error.name })
        } else {
            return res.status(500).send({ message: error.message, error: error.name })
        }
    } else {
        return res.status(500).send({ message: String(error), error: "ERROR" })
    }
}