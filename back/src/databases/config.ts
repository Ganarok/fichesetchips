import { Sequelize } from "sequelize";

async function connectToDatabase()
{
    if(!process.env.DB_URI)
    {
        throw new Error("DB_URI is not defined");
    }
    
    const sequelize = new Sequelize(process.env.DB_URI);
    
    try
    {
        await sequelize.authenticate();
        console.log("Connection to database has been established successfully.");
        return sequelize
    }
    catch(err)
    {
        console.error("Unable to connect to the database:", err);
    }
    finally
    {
        sequelize.close();
    }
}

export default connectToDatabase;