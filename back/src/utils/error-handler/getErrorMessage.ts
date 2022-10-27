export function getErrorMessage(error: unknown, res: any) {
    if (error instanceof Error) {
        if (error.name.includes("NotFound")) {
            return res.status(404).send({ message: error.message, error: error.name })
        } else if (error.name.includes("QueryFailed")) {
            return res.status(409).send({ message: error.message, error: error.name })
        } else {
            return res.status(500).send({ message: error.message, error: error.name })
        }
    } else {
        return res.status(500).send({ message: String(error), error: "ERROR" })
    }
}