import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";

const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { dbName: "test" })
        console.log('Connected to MongoDB')
    } catch (err) {
        throw Error(err);
    }
}

export default connectMongoDb()