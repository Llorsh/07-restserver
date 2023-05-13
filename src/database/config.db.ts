import mongoose from "mongoose"

const dbConnection = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`)

        console.log("Base de datos online")

    } catch (error) {
        console.log({ error })
        throw new Error("Error a la hora de iniciar la base de datos")
    }
}



export { dbConnection }