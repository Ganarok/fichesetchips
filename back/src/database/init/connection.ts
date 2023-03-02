import { CEMDataSource } from "./datasources/cem-data-source"
import { PublicDataSource } from "./datasources/public-data-source"

export const databaseConnection = async () => {
    // establish database connection

    return new Promise((resolve, reject) => {

        PublicDataSource
            .initialize()
            .then(() => {
                console.log("Public Data Source has been initialized!")
                resolve(true)
            })
            .catch((err) => {
                console.error("Error during Public Data Source initialization:", err)
                reject(err)
            })

        CEMDataSource
            .initialize()
            .then(() => {
                console.log("CEM Data Source has been initialized!")
                resolve(true)
            })
            .catch((err) => {
                console.error("Error during CEM Data Source initialization:", err)
                reject(err)
            })
    })
}
