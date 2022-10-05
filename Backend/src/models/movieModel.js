import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    englishTitle: {
        type: String,
        unique: true,
        required: true
    },
    spanishTitle: {
        type: String,
        unique: true,
        required: true
    },
    characters: {
        type: Array,
        default: []
    },
    category: {
        type: String,
        required: true
    },
    isMovie: {
        type: Boolean,
        default: false
    },
    isSerie: {
        type: Boolean,
        default: false,
    },
    img: {
        type: String,
    }
})

export default new mongoose.model('movies', movieSchema);