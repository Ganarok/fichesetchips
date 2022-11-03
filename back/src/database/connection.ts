import { AppDataSource } from "./data-source"

export const databaseConnection = async () => {
    // establish database connection
    
    return new Promise((resolve, reject) => {
        
        AppDataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
            resolve(true)
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
            reject(err)
        })
    })
}
