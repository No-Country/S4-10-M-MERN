import mongoose from "mongoose";

const characterSchema = new mongoose.model({
    name: {
        type: String,
        required: true
    },
    img: String,
    movieID: {
        type: String,
        required: true,
    }
});

export default new mongoose.model('characters', characterSchema); 