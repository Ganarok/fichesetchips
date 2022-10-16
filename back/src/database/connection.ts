import { AppDataSource } from "./data-source"

export const databaseConnection = () => {
    // establish database connection
    AppDataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
        })
}