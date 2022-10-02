require("dotenv").config();
import mongoose from "mongoose";

const connectDb = mongoose.connect(process.env.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    async (err) => {

        if (err) throw Error(err);

        else console.log('Connect db');

    });

module.exports = connectDb;